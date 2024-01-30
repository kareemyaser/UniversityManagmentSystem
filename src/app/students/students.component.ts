import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddUniversityComponent } from '../add-university/add-university.component';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../../AppServices/StudentsServices';
import { ViewStudentDetailsComponent } from '../view-student-details/view-student-details.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    RouterLink,
    AddUniversityComponent,
    RouterOutlet,
    CommonModule,
    ViewStudentDetailsComponent,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  StudentList: any[] = [];

  constructor(private studentService: StudentsService) {}
  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(
      (data: any[]) => {
        this.StudentList = data;
        this.StudentList.sort((a, b) =>
          a.studentName.localeCompare(b.studentName)
        );
        // this.StudentList.sort((a, b) =>
        //   a.studentName.localeCompare(b.studentName)
        // );
        console.log(this.StudentList);
      },
      (error: any) => {}
    );
  }

  deleteStudent(index: number, id: string): void {
    // Log the index to the console
    console.log('Clicked delete for item at index:', index);

    this.studentService.deleteStudentByID(id).subscribe(
      (data: any[]) => {
        this.StudentList.splice(index, 1);
        console.log('StudentList after deletion:', this.StudentList);
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
      this.deleteStudent(index, id);
    } else {
      // User clicked "Cancel" in the confirmation dialog, do nothing or provide feedback
    }
  }
}
