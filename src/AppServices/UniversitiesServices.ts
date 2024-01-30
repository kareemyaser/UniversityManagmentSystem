import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  apiUrl = 'https://localhost:7163/api';
  constructor(private http: HttpClient) {}

  getAllUniversities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Universities`);
  }

  deleteUniversityByID(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/Universities/${id}`);
  }

  viewUniversityByID(id :string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Universities/${id}`);
  }

  addUniversity(
    UniversityName: any,
    UniverrsityLocation: any
  ): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/Universities`, {
      UniversityName: UniversityName,
      Location: UniverrsityLocation,
    });
  }
}
