import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../AppServices/CoursesServices';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UniversitiesComponent } from '../universities/universities.component';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    UniversitiesComponent,
    CoursesComponent,
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent {
  constructor(private courseService: CourseService, private router: Router) {}

  CourseForm = new FormGroup({
    CourseName: new FormControl('', Validators.required), // Set up validation for required
    CourseAbbriviation: new FormControl('', Validators.required),
  });

  // universityform.get(
  //   "UniversityName"
  // ).value

  addCourse(): void {
    this.courseService
      .addCourse(
        this.CourseForm.get('CourseName')?.value,
        this.CourseForm.get('CourseAbbriviation')?.value
      )
      .subscribe(
        (data: any[]) => {
          this.router.navigate(['/Courses']);
          // console.log('UniversityList after addition:', this.UniversityList);
        },
        (error: any) => {}
      );
  }
}
