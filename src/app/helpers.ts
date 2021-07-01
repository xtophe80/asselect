export const Header = [
  "UK Airspace",
  "Alan Sparrow (airspace@asselect.uk)",
  "",
  "I have tried to make this data as accurate as possible, however",
  "there will still be errors. Good airmanship is your responsibility,",
  "not mine - Don't blame me if you go somewhere you shouldn't have",
  "gone while using this data.",
  "",
  "To the extent possible under law, Alan Sparrow has waived all",
  "copyright and related or neighbouring rights to this file. The data",
  "in this file is based on the work of others including: George Knight,",
  "Geoff Brown, Peter Desmond and Rory O'Connor.  The data is originally",
  "sourced from the UK Aeronautical Information Package (AIP).",
  ""
];

// Latitude/longitude regex, pattern is: [D]DDMMSS[.s[s[s]]]H
const DmsRe = new RegExp(
  "([0-9]{2}|[01][0-9]{2})" +
  "([0-5][0-9])" +
  "([0-5][0-9](?:\.[0-9]{1,3})?)" +
  "([NESW])"
);

const wrap = (s: string) => s.replace(
    /(?![^\n]{1,65}$)([^\n]{1,65}),/g, '$1,\n'
);

export function formatHeader(note: string, airac: string,
                             commit: string, settings: string): string[] {
  let hdr = Header;
  hdr.push(...note.split("\n"));
  hdr.push("AIRAC: " + airac);
  hdr.push("Produced by asselect.uk: " + new Date().toISOString());
  hdr.push("Commit: " + commit);
  hdr.push(...wrap(settings).split("\n").map(x => "  " + x));

  return Header.map(x => (x === "") ? "*" : "* " + x);
}

// Convert lat/lon string to pair of floats
export function parseLatLon(latlonStr: string): number[] {
  return latlonStr.split(" ").map(x => parseDeg(x));
}

// Format lat/lon for OpenAir
export function formatLatLon(latlon: string): string {
  const [latfloat, lonfloat] = parseLatLon(latlon);
  const x = dms(lonfloat);
  const y = dms(latfloat);

  const latStr = `${pad(y.d, 2)}:${pad(y.m, 2)}:${pad(y.s, 2)} ${y.ns}`;
  const lonStr = `${pad(x.d, 3)}:${pad(x.m, 2)}:${pad(x.s, 2)} ${x.ew}`;

  return latStr + " " + lonStr;
}

// Format distance for OpenAir
export function formatDistance(distance: string): string {
  let [dist, unit] = distance.split(" ");
  if (unit === "km")
    dist = (parseFloat(distance) / 1.852).toFixed(3);

  return dist;
}

// Format level for OpenAir
export function formatLevel(level: string): string {
  if (level.endsWith('ft'))
    return level.slice(0, -3) + "ALT";
  else
    return level;
}

// Format centre for OpenAir
export function formatCentre(latlon: string): string {
  return "V X=" + formatLatLon(latlon);
}

// Return "normalised" level from SFC, altitude or flight level
export function normLevel(value: string): number {
  if (value.startsWith("FL"))
    return parseInt(value.slice(2)) * 100;
  else if (value.endsWith("ft"))
    return parseInt(value.split(" ")[0]);
  else
    return 0;
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

// Pad with leading zeroes
function pad(val: number, len: number) {
  let out: string = val.toFixed(0);
  while (out.length < len)
    out = "0" + out;

  return out;
}

// Return integer DMS values for floating point degrees
function dms(deg: number):
  {d: number, m: number, s: number, ns: string, ew: string} {

  let ns: string;;
  let ew: string;
  let min: number;
  let sec:number;

  if (deg < 0) {
    ns = "S";
    ew = "W";
    deg = -deg;
  }
  else {
    ns = "N";
    ew = "E";
  }

  sec = Math.round(deg * 3600)

  min = Math.floor(sec / 60);
  sec = sec % 60;

  deg = Math.floor(min / 60);
  min = min % 60;

  return {d: deg, m: min, s: sec, ns: ns, ew: ew};
}
