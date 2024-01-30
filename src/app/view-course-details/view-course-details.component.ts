import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../AppServices/CoursesServices';

@Component({
  selector: 'app-view-course-details',
  standalone: true,
  imports: [RouterLink, CoursesComponent, RouterOutlet, CommonModule],
  templateUrl: './view-course-details.component.html',
  styleUrl: './view-course-details.component.css',
})
export class ViewCourseDetailsComponent implements OnInit {
  Course: any = '';
  id: any;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.courseService.viewCourseByID(this.id).subscribe(
      (data: any[]) => {
        this.Course = data;
        console.log(this.Course);
      },
      (error: any) => {}
    );
  }
  
}
