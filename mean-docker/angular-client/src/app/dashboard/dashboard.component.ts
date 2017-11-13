import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

declare var crossfilter:any;
declare var dc:any;
declare var d3:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	private ordinalScaleColors:any;
	// Link to our api, pointing to localhost
  private API = 'http://localhost:3000';
  // Declare empty list of people
  private employees: any[] = [];
  constructor(private http: Http) { }

  ngOnInit() {
  	this.ordinalScaleColors = [
		 '#1f77b4',
		 '#ff7f0e',
		 '#2ca02c',
		 '#d62728',
		 '#9467bd',
		 '#8c564b',
		 '#e377c2',
		 '#7f7f7f',
		 '#bcbd22',
		 '#17becf'
		];
		this.getAllPeople();
  };

  initialiseProcustlocationCharts(experiments) {  
	  let locationChart = dc.pieChart("#locationPieChart");      
	  let crossFilterData = new crossfilter(experiments);
	  let all = crossFilterData.groupAll();
	  
	  //Dimension on level and DC joined
	  let locationChartDimension = crossFilterData.dimension(function(data){ return data["location"]});

	  //Group data based on dimensions
	  let locationChartDimensionGroup = locationChartDimension.group().reduceSum(function(d) {return +d.pickup;});

	  locationChart
		  .width(500)
		  .height(350)
		  .cx(260)
      .dimension(locationChartDimension)
      .group(locationChartDimensionGroup)
      .innerRadius(30)                          
      .ordinalColors(this.ordinalScaleColors)
      .legend(dc.legend())
      .controlsUseVisibility(true)
      .slicesCap(4);	  
	   
	  dc.renderAll();
	};

	getAllPeople() {
    this.http.get(`${this.API}/employees`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people)
        this.initialiseProcustlocationCharts(people);
        this.employees = people
      }, error => console.log(error))
  };
}
