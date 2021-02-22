import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/assets/person.types';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'angular-dynamic-table';
  public data: Array<Person> = [];
  public parsedData = [];
  public rows = 5; //default value, can be changed

  public columns = {
    enabled: [],
    disabled: [],
    all: [
      {
        name: "First Name",
        key: "firstName",
        avalible: true,
      },
      {
        name: "Last Name",
        key: "lastName",
        avalible: true,
      },
      {
        name: "Gender",
        key: "gender",
        avalible: true,
      },
      {
        name: "Age",
        key: "age",
        avalible: false,
      },
      {
        name: "Email",
        key: "email",
        avalible: false,
      },
      {
        name: "Experience Years",
        key: "experienceYears",
        avalible: false,
      },
      {
        name: "Salary",
        key: "salary",
        avalible: false,
      }
    ]
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe(res => {
      this.data = res;

      this.prepareData();
    });
  };

  prepareData() {
    this.manageColumns();
    this.filterDataDependingOnColumns();
  };

  manageColumns(): void {
    this.columns.all.forEach(col => {
      if (col.avalible) {
        this.columns.enabled.push(col);
      } else {
        this.columns.disabled.push(col);
      }
    });
  };

  filterDataDependingOnColumns() {
    this.parsedData = [];
    for (let person of this.data) {
      let personEntries = Object.entries(person);
      let newEntry = [];

      for (let i = 0; i < this.columns.enabled.length; i++) {
        newEntry.push(personEntries[i]);
      }
      this.parsedData.push(newEntry);
    }
  };

  addColumn() {
    if (this.columns.disabled.length > 0) {
      this.columns.disabled[0].avalible = true;
      this.columns.enabled.push(this.columns.disabled.shift());
      this.filterDataDependingOnColumns();
    }
  };

  addRow() {
    if (this.rows < this.data.length - 1) {
      this.rows++;
    }
  };

  swapColumns(current: number, swapWith: number) {
    [this.columns.enabled[current], this.columns.enabled[swapWith]] = [this.columns.enabled[swapWith], this.columns.enabled[current]];
    this.parsedData.forEach(person => {
      [person[current], person[swapWith]] = [person[swapWith], person[current]];
    });
  };
}
