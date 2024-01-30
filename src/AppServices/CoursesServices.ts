import { HttpClientModule } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiUrl = 'https://localhost:7163/api';
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Courses`);
  }

  viewCourseByID(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Courses/${id}`);
  }
  deleteCourseByID(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/Courses/${id}`);
  }

  addCourse(CourseName: any, CourseAbbriviation: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/Courses`, {
      CourseName: CourseName,
      CourseAbbriviation: CourseAbbriviation,
    });
  }
}
