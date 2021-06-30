const AsciiUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Latitude/longitude regex, pattern is: [D]DDMMSS[.s[s[s]]]H
const DmsRe = new RegExp(
  "([0-9]{2}|[01][0-9]{2})" +
  "([0-5][0-9])" +
  "([0-5][0-9](\.[0-9]{1,3})?)" +
  "([NESW])");

const NM_TO_DEGREES = 1 / 60;

// Returns the airspace file
export function convert(yaixm: any, opts: any): string {
  // Deep copy airspace and LOAs
  let airspace = JSON.parse(JSON.stringify(yaixm.airspace));
  let loas = JSON.parse(JSON.stringify(yaixm.loa));

  // Merge LOAs
  loas = loas.filter((loa: any) => opts.loas.includes(loa.name));
  mergeLoas(airspace, loas);

  // Append RATs
  airspace = airspace.concat(
    yaixm.rat.filter((rat: any) => opts.rats.includes(rat.name)));

  // Remove wave boxes
  airspace = airspace.filter((feature: any) =>
    !(opts.waves.includes(feature.name) && (feature.type === "D_OTHER"))
  );

  // Merge frequencies
  if (opts.options.radioFreqs === 'append')
    mergeServices(airspace, yaixm.service);

  // Airspace filter function
  let airfilter = makeAirfilter(opts);

  // Airspace name function
  const namer = makeNameFuction(opts);

  // Create the output data
  let lines: string[] = [];
  airspace.forEach( (feature: any) => {
    feature.geometry.forEach( (volume: any) => {
      if (airfilter(feature, volume)) {
        lines.push(...doVolume(feature, volume, namer));
      }
    });
  });

  return lines.join("\n");
}

// Factory to create airspace filtering function
function makeAirfilter(opts: any) {
  const max_level = parseInt(opts.options.maxLevel);
  const north = parseFloat(opts.options.north);
  const south = parseFloat(opts.options.south);

  function airfilter(feature: any, volume: any): boolean {
    const rules = (feature.rules || []).concat(volume.rules || []);

    // Unlicensed airfields
    if (opts.airspace.unlicensedAirfield === 'exclude' &&
        feature.localtype === "NOATZ")
      return false;

    // Microlight strips
    if (opts.airspace.microlightAirfield === 'exclude' &&
        feature.localtype == "UL")
      return false;

    // HIRTA, GVS and LASER
    if (opts.airspace.hirtaGvs === 'exclude' &&
        ["HIRTA", "GVS", "LASER"].includes(feature.localtype))
      return false;

    // Gliding sites
    if (opts.airspace.glidingAirfield === 'exclude' &&
        feature.type === "OTHER" &&
        feature.localtype === "GLIDER" &&
        !rules.includes("LOA"))
      return false;

    // Maximum level
    if (level(volume.lower) >= max_level)
      return false;

    // Min/max latitude
    const [minLat, maxLat] = minMaxLat(volume);
    if ((minLat > north) || (maxLat < south))
      return false;

    return true;
  }

  return airfilter;
}

// Factory to create airspace naming function
function makeNameFuction(opts: any) {
  const addSeqno = opts.options.format === 'competition';

  function airspaceNamer(volume: any, feature: any): string {
    let name = volume.name || feature.name;
    if (!volume.name) {
      const rules = (feature.rules || []).concat(volume.rules || []);

      // Base type name
      if (["NOATZ", "UL"].includes(feature.localtype)) {
        name += " A/F"
      } else if (["MATZ", "DZ", "GVS", "HIRTA", "ILS", "LASER"].includes(feature.localtype)) {
        name += " " + feature.localtype;
      } else if (feature.type === "ATZ") {
        name += " ATZ";
      } else if (rules.includes("RAZ")) {
        name += " RAZ";
      }

      // Optional sequence number
      if (addSeqno && feature.geometry.length > 1) {
        const seqno = volume.seqno ||
                String.fromCharCode("A".charCodeAt(0) +
                                    feature.geometry.indexOf(volume))
        name += `-${seqno}`;
      }

      // SI & NOTAM qualifiers
      const qualifiers = rules.filter((x: any) => ["SI", "NOTAM"].includes(x))
      if (qualifiers.length > 0) {
        name += ` (${qualifiers.sort().reverse().join("/")})`;
      }

      if (volume.frequency) {
        name += ` ${volume.frequency.toFixed(3)}`
      }
    }
    return name
  }

  return airspaceNamer;
}

// Merge LOAs into airspace
function mergeLoas(airspace: any, loas: any) {
  let replacementVolumes = [];

  // Add new features
  for (let loa of loas) {
    for (let area of loa.areas) {

      // Add LOA rule
      for (let feature of area.add) {
        let rules = (feature.rules || []);
        rules.push("LOA");
        feature.rules = rules;
      }

      // Append new features
      airspace.push(...area['add']);

      // Add to list of replacement volumes
      replacementVolumes.push(...(area.replace || []));
    }
  }

  // Replace volumes
  for (let replace of replacementVolumes) {
    if (replace.geometry.length === 0)
      continue;

    // Find volume to be replaced
    const [volume, feature] = findVolume(airspace, replace.id);
    if (!feature)
      continue;

    // Update seqno, e.g 12 -> 12A, 12B, etc.
    if (volume.seqno) {
      if (replace.geometry.length) {
        replace.geometry.forEach(
          (g: any, n: number) => g.seqno = volume.seqno + AsciiUppercase[n]);
      } else {
        replace.geometry[0].seqno = volume.seqno;
      }
    }

    // Delete old volume
    feature.geometry.splice(feature.geometry.indexOf(volume), 1);

    // Append new volmes (maybe null)
    feature.geometry.push(...replace.geometry);

    // Remove feature if no geometry remaining
    if (!feature.geometry.length) {
      airspace.splice(feature.geometry.indexOf(feature), 1);
    }
  }
}

// Merge radio frequencies into airspace
function mergeServices(airspace: any, services: any) {
  // Create frequency map
  let freqs = new Map();
  for (const service of services) {
    for (const id of service.controls) {
      freqs.set(id, service.frequency);
    }
  }

  // Add frequency properties
  for (let feature of airspace) {
    for (let volume of feature.geometry) {
      let freq = freqs.get(volume.id) || freqs.get(feature.id);
      if (freq)
        volume.frequency = freq;
    }
  }
}

// Find volume for LOA merge
function findVolume(airspace: any[], vid: string): any[] {
  for (let feature of airspace) {
    for (let volume of feature['geometry']) {
      if (volume.id === vid) {
        return [volume, feature];
      }
    }
  }

  return [undefined, undefined];
}

// Return "normalised" level from SFC, altitude or flight level
function level(value: string): number {
  if (value.startsWith("FL"))
    return parseInt(value.slice(2)) * 100;
  else if (value.endsWith("ft"))
    return parseInt(value.split(" ")[0]);
  else
    return 0;
}

function doVolume(feature: any, volume: any, namer: (f: any, v: any)=>string): string[] {
  return ["*", "AN " + namer(volume, feature)];
}

// Convert latitude or longitude string to floating point degrees
function parseDeg(degStr: string): number {
  const m = degStr.match(DmsRe);

  let deg = 0;
  if (m !== null) {
    deg = parseInt(m[1]) + parseInt(m[2]) / 60 + parseFloat(m[3]) / 3600
    if ("SW".includes(m[4]))
      deg = -deg
  }

  return deg
}

// Convert lat/lon string to pair of floats
function parseLatLon(latlonStr: string): number[] {
  return latlonStr.split(" ").map(x => parseDeg(x));
}

// Get (approximate) minimum and maximum latitude for volume
function minMaxLat(volume: any): number[] {
  let latArr = [];
  for (const bdry of volume.boundary) {
    if (bdry.circle) {
      const radius = parseFloat(bdry.circle.radius.split(" ")[0]);
      const [clat, clon] = parseLatLon(bdry.circle.centre);
      latArr.push(clat + radius * NM_TO_DEGREES);
      latArr.push(clat - radius * NM_TO_DEGREES);
    }
    else if (bdry.arc) {
      latArr.push(parseLatLon(bdry.arc.to)[0]);
    }
    else if (bdry.line) {
      latArr.push(...bdry.line.map((b: string) => parseLatLon(b)[0]));
    }
  }

  return [Math.min(...latArr), Math.max(...latArr)];
}
