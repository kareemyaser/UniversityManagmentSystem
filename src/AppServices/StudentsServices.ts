import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  splice(index: number, arg1: number) {
    throw new Error('Method not implemented.');
  }
  apiUrl = 'https://localhost:7163/api';
  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Students`);
  }

  viewStudentByID(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Students/${id}`);
  }

  deleteStudentByID(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/Students/${id}`);
  }

  addStudent(
    studentName: any,
    email: any,
    universityID: any
  ): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/Students`, {
      studentName: studentName,
      email: email,
      universityID: universityID,
    });
  }
}
