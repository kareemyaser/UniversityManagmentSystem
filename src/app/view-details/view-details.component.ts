import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AddUniversityComponent } from '../add-university/add-university.component';
import { CommonModule } from '@angular/common';
import { UniversitiesComponent } from '../universities/universities.component';
import { UniversityService } from '../../AppServices/UniversitiesServices';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [
    RouterLink,
    AddUniversityComponent,
    RouterOutlet,
    CommonModule,
    UniversitiesComponent,
  ],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css',
})
export class ViewDetailsComponent implements OnInit {
  University: any = '';
  id: any;
  constructor(
    private route: ActivatedRoute,
    private universityService: UniversityService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.universityService.viewUniversityByID(this.id).subscribe(
      (data: any[]) => {
        this.University = data;
        console.log(data);
      },
      (error: any) => {}
    );
  }

  // viewItem(id: any): void {
  //   // Log the index to the console
  //   console.log('Clicked delete for item at index:', id);

  //   this.universityService.viewUniversityByID(id).subscribe(
  //     (data: any[]) => {},
  //     (error: any) => {}
  //   );
  // }
}
