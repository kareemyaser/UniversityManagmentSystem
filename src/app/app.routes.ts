import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { UniversitiesComponent } from './universities/universities.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { AddUniversityComponent } from './add-university/add-university.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ViewStudentDetailsComponent } from './view-student-details/view-student-details.component';
import { ViewCourseDetailsComponent } from './view-course-details/view-course-details.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { TableTestComponent } from './table-test/table-test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Students', component: StudentsComponent },
  {
    path: 'Universities',
    component: UniversitiesComponent,
    children: [],
  },
  { path: 'Courses', component: CoursesComponent },
  { path: 'Universities/AddUniversity', component: AddUniversityComponent },
  { path: 'Universities/Viewdetails/:id', component: ViewDetailsComponent },
  { path: 'Students/AddStudent', component: AddStudentComponent },
  { path: 'Students/Viewdetails/:id', component: ViewStudentDetailsComponent },
  { path: 'Courses/Viewdetails/:id', component: ViewCourseDetailsComponent },
  { path: 'Courses/AddCourse', component: AddCourseComponent },
  { path: 'Test', component: TableTestComponent },
];
