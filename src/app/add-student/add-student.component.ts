import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentsService } from '../../AppServices/StudentsServices';
import { CommonModule } from '@angular/common';
import { UniversitiesComponent } from '../universities/universities.component';
import { UniversityService } from '../../AppServices/UniversitiesServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    UniversitiesComponent,
  ],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css',
})
export class AddStudentComponent implements OnInit {
  UniversityList: any[] = [];
  selectedUniversity: any | undefined;
  // selectedUniversityID: string | undefined;

  constructor(
    private studentService: StudentsService,
    private universityService: UniversityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.universityService.getAllUniversities().subscribe(
      (data: any[]) => {
        this.UniversityList = data;
        this.UniversityList.sort((a, b) =>
          a.universityName.localeCompare(b.universityName)
        );
        console.log(this.UniversityList);
      },
      (error: any) => {}
    );
  }

  StudentForm = new FormGroup({
    StudentName: new FormControl('', Validators.required), // Set up validation for required
    Email: new FormControl('', Validators.required),
    UniversityID: new FormControl('', Validators.required),
  });

  addStudent(): void {
    this.studentService
      .addStudent(
        this.StudentForm.get('StudentName')?.value,
        this.StudentForm.get('Email')?.value,
        this.StudentForm.get('UniversityID')?.value
      )
      .subscribe(
        (data: any[]) => {
          this.router.navigate(['/Students']);
        },
        (error: any) => {}
      );
  }

  selectUniversity(university: any): void {
    this.selectedUniversity = university.universityName;
    console.log('University Name:', university.universityName);
    console.log('University ID:', university.id);

    this.StudentForm.patchValue({
      UniversityID: university.id,
    });
  }
}
