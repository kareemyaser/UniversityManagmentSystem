import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { CourseService } from '../../AppServices/CoursesServices';
import { CommonModule } from '@angular/common';
import { ViewCourseDetailsComponent } from '../view-course-details/view-course-details.component';

// const Icon = { houses };
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    RouterLink,
    NgxBootstrapIconsModule,
    CommonModule,
    ViewCourseDetailsComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  CoursesList: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (data: any[]) => {
        this.CoursesList = data;
        // this.CoursesList.sort((a, b) =>
        //   a.universityName.localeCompare(b.universityName)
        // );
        console.log(this.CoursesList);
      },
      (error: any) => {}
    );
  }

  deleteItem(index: number, id: string): void {
    // Log the index to the console
    console.log('Clicked delete for item at index:', index);

    this.courseService.deleteCourseByID(id).subscribe(
      (data: any[]) => {
        this.CoursesList.splice(index, 1);
        console.log('UniversityList after deletion:', this.CoursesList);
      },
      (error: any) => {}
    );
  }

  confirmDelete(index: number, id: string): void {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this University?'
    );

    if (isConfirmed) {
      // User clicked "OK" in the confirmation dialog, proceed with delete
      this.deleteItem(index, id);
    } else {
      // User clicked "Cancel" in the confirmation dialog, do nothing or provide feedback
    }
  }
}
