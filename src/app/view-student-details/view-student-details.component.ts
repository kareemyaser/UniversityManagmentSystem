import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../AppServices/StudentsServices';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AddUniversityComponent } from '../add-university/add-university.component';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from '../students/students.component';

@Component({
  selector: 'app-view-student-details',
  standalone: true,
  imports: [
    RouterLink,
    AddUniversityComponent,
    RouterOutlet,
    CommonModule,
    StudentsComponent,
  ],
  templateUrl: './view-student-details.component.html',
  styleUrl: './view-student-details.component.css',
})
export class ViewStudentDetailsComponent implements OnInit {
  StudentData: any = '';
  id: any;

  constructor(
    private route: ActivatedRoute,
    private StudentService: StudentsService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.StudentService.viewStudentByID(this.id).subscribe(
      (data: any[]) => {
        this.StudentData = data;
        console.log(data);
      },
      (error: any) => {}
    );
  }
}
