import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

declare global {
  interface Window {
    _env:{
      API_URL:string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private  readonly baseUrl: string;

  constructor(private http: HttpClient) {
    if (!window._env?.API_URL) {
      throw new Error("Missing environment variable for Url api");
    }
    this.baseUrl = window._env.API_URL;
  }
  get<T>(path: string, options = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, options);
  }

  post<T>(path: string, body: unknown, options = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, options);
  }

  put<T>(path: string, body: unknown, options = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, options);
  }

  delete<T>(path: string, options = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, options);
  }

}
