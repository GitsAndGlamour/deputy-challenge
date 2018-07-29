import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Data} from '@angular/router';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  /* Get All */
  getAllEntities(route: string): Observable<Data[]> {
    return this.http.get<Data[]>(environment.api + '/api/' + route);
  }

  /* Get Some - Uses comparator to get data either containing the given text (like) OR gets the exact text (=).
  *  Comparator values: 'like' or '='
  */
  getEntitiesForProperty(route: string, property: string, value: any, comparator?: string): Observable<Data[]> {
    return this.http.get<Data[]>(environment.api + '/api/' + route + '/' + property + '/' + value + '/' + comparator);
  }

  /* Get One */
  getEntityById(route: string, id: number): Observable<Data> {
    return this.http.get<Data>(environment.api + '/api/' + route + '/' + id);
  }

  addEntity(route: string, data: Data) {
    return this.http.post<boolean>(environment.api + '/api/' + route, {isAdd: true, data: data, json: true});
  }

  removeEntity(route: string, data: Data) {
    return this.http.post<boolean>(environment.api + '/api/' + route, {isAdd: false, data: data, json: true});
  }
}
