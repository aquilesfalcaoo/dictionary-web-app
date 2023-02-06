import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dictionary } from '../models/dictionary';

const baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  constructor(private http: HttpClient) {}

  search = (value: string): Observable<Dictionary> => {
    const params = value;
    return this.http.get(`${baseURL}/${params}`);
  };
}
