import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { NgModel } from '@angular/forms';

// Import rxjs map operator
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Link to our api, pointing to localhost
  private API = 'http://localhost:3000';
  // Declare empty list of people
  private employees: any[] = [];
  public selectedEmp:any={};

  constructor(private http: Http,private ref: ChangeDetectorRef) {}

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllPeople();
  };

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/employees`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people)
        this.employees = people
      }, error => console.log(error))
  };

  onEdit(index){
    let emp = this.employees[index];
    this.selectedEmp = emp;
    this.ref.detectChanges();
    /*this.http.put(`${this.API}/employees/${emp.id}`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people)
        this.employees = people
      }, error => console.log(error))*/
  };

  onUpdate(name, id, location,pickup,drop){
    this.http.put(`${this.API}/employee/${id}`,{name, id, location,pickup,drop})
      .map(res => res.json())
      .subscribe(people => {
        console.log(people);
        this.employees = people;
      }, error => console.log(error))
  };

  onDelete(index){
    let id = this.employees[index].id;
    this.http.delete(`${this.API}/employees/${id}`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people)
        this.employees = people
      }, error => console.log(error))
  };

}
