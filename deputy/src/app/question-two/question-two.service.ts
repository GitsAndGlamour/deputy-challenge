import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocationData, RoleData, UserData} from "../data";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>('/api/users');
  }

  getAllRoles(): Observable<RoleData[]> {
    return this.http.get<RoleData[]>('/api/roles');
  }

  getAllLocations(): Observable<LocationData[]> {
    return this.http.get<LocationData[]>('/api/locations');
  }

  getUsersForProperty(property: string, value: string): Observable<UserData[]> {
    return this.http.get<UserData[]>('/api/users/'+property+'/'+value);
  }

  getRolesForProperty(property: string, value: string): Observable<RoleData[]> {
    return this.http.get<RoleData[]>('/api/roles/'+property+'/'+value);
  }

  getLocationsForProperty(property: string, value: string): Observable<LocationData[]> {
    return this.http.get<LocationData[]>('/api/locations/'+property+'/'+value);
  }

  getUserById(id: number): Observable<UserData> {
    return this.http.get<UserData>('/api/users/'+id);
  }

  getRoleById(id: number): Observable<RoleData> {
    return this.http.get<RoleData>('/api/roles/'+id);
  }

  getLocationById(id: number): Observable<LocationData> {
    return this.http.get<LocationData>('/api/locations/'+id);
  }
}
