import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddUniversityComponent } from '../add-university/add-university.component';
import { UniversityService } from '../../AppServices/UniversitiesServices';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-universities',
  standalone: true,
  imports: [RouterLink, AddUniversityComponent, RouterOutlet, CommonModule],
  templateUrl: './universities.component.html',
  styleUrl: './universities.component.css',
})
export class UniversitiesComponent implements OnInit {
  UniversityList: any[] = [];

  constructor(private universityService: UniversityService) {}

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

  deleteItem(index: number, id: string): void {
    // Log the index to the console
    console.log('Clicked delete for item at index:', index);

    this.universityService.deleteUniversityByID(id).subscribe(
      (data: any[]) => {
        this.UniversityList.splice(index, 1);
        console.log('UniversityList after deletion:', this.UniversityList);
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

  // viewID(id:any){

  // }
}
