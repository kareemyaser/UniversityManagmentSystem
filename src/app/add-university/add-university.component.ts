import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UniversitiesComponent } from '../universities/universities.component';
import { Validators } from '@angular/forms';
import { UniversityService } from '../../AppServices/UniversitiesServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-university',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    UniversitiesComponent,
  ],

  templateUrl: './add-university.component.html',
  styleUrl: './add-university.component.css',
})
export class AddUniversityComponent {
  // UniversityList: any[] = [];

  constructor(
    private universityService: UniversityService,
    private router: Router
  ) {}

  // ngOnInit() {
  //   this.universityService.getAllUniversities().subscribe(
  //     (data: any[]) => {
  //       this.UniversityList = data;
  //       this.UniversityList.sort((a, b) =>
  //         a.universityName.localeCompare(b.universityName)
  //       );
  //       console.log(this.UniversityList);
  //     },
  //     (error: any) => {}
  //   );
  // }

  UniversityForm = new FormGroup({
    UniversityName: new FormControl('', Validators.required), // Set up validation for required
    UniversityLocation: new FormControl('', Validators.required),
  });

  // universityform.get(
  //   "UniversityName"
  // ).value

  addUniversity(): void {
    this.universityService
      .addUniversity(
        this.UniversityForm.get('UniversityName')?.value,
        this.UniversityForm.get('UniversityLocation')?.value
      )
      .subscribe(
        (data: any[]) => {
          this.router.navigate(['/Universities']);
          // console.log('UniversityList after addition:', this.UniversityList);
        },
        (error: any) => {}
      );
  }
}
