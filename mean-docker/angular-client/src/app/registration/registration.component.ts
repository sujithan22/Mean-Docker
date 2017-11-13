import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // Link to our api, pointing to localhost
  private API = 'http://localhost:3000';
  // Declare empty list of people
  public employees: any[] = [];
  constructor(private http: Http) {}

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllPeople();
  };

  // Add one person to the API
  addPerson(name, id, location,pickup,drop) {
    this.http.post(`${this.API}/employee`, {name, id, location,pickup,drop})
      .map(res => res.json())
      .subscribe(() => {
        this.getAllPeople();
      }, error => console.log(error))
  };

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/employees`)
      .map(res => res.json())
      .subscribe(employees => {
        console.log(employees)
        this.employees = employees
      }, error => console.log(error))
  };

}
