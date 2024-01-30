import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { UniversitiesComponent } from './universities/universities.component';
import { AddUniversityComponent } from './add-university/add-university.component';
import { UniversityService } from '../AppServices/UniversitiesServices';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    StudentsComponent,
    CoursesComponent,
    UniversitiesComponent,
    AddUniversityComponent,
    HttpClientModule,
  ],
  providers: [UniversityService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'University Managment System';
  // public UniversityList: any[] = [];
}
