import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YaixmService {

  constructor(private http: HttpClient) { }

  getYaixm(): Observable<any> {
    return this.http.get<any>('assets/yaixm.json');
  }
}
