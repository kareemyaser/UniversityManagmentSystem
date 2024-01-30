import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-test',
  standalone: true,
  imports: [],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.css',
})
export class TableTestComponent implements OnInit {
  ngOnInit(): void {
    const YearGrid = [
      { Month: 'Nov', Year: 2020 },
      { Month: 'Dec', Year: 2020 },
      { Month: 'Jan', Year: 2021 },
      { Month: 'Feb', Year: 2021 },
      { Month: 'Mar', Year: 2021 },
    ];
  }
}
