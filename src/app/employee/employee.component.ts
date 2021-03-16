import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns = [];
  displayedColumnsTwoYrExp = [];
  displayedColumnsRemoveDevelopmentDept= [];
  dataSource :any;
  candidate_data: any;
  columnsToDisplay: any[];
  @ViewChild(MatSort) sort: MatSort;
  moreThanTwoYrExp :any;
  uniqueDepartment: any;
  dataSourceTwoYrExp :any;
  columnsToDisplayTwoYrExp : any;
  dataSourceRemoveDevelopmentDept: any;
  columnsToDisplayRemoveDevelopmentDept: any;
 

  constructor() { 
    this.candidate_data=[
      {"id": 11,"name": "Ash","department": "Finance","joining_date": "8/10/2016"},
      {"id": 12,"name": "John","department": "HR","joining_date": "18/1/2011"},
      { "id": 13, "name": "Zuri", "department": "Operations", "joining_date": "28/11/2019"},
      {"id": 14,  "name": "Vish",  "department": "Development",   "joining_date": "7/7/2017"},
      { "id": 15, "name": "Barry",  "department": "Operations", "joining_date": "19/8/2014"},
      {"id": 16,"name": "Ady",  "department": "Finance",  "joining_date": "5/10/2014"}, 
      { "id": 17,"name": "Gare","department": "Development",  "joining_date": "6/4/2014"},
      { "id": 18,  "name": "Hola",  "department": "Development",  "joining_date": "8/12/2010"}, 
      {"id": 19,  "name": "Ola",  "department": "HR",  "joining_date": "7/5/2011"},
      { "id": 20,  "name": "Kim",  "department": "Finance",  "joining_date": "20/10/2010"}
    ];
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.candidate_data);
    this.columnsToDisplay = [];
    for ( const v in this.dataSource.filteredData[0]) {
      this.displayedColumns.push(v);
      this.columnsToDisplay.push(v);
      this.dataSource.sort = this.sort;
    }

    this.getEmpWithExperienceMoreThan2();
    this.getDistinct();
    this.removeDevelopementDept();
  }

  getEmpWithExperienceMoreThan2(){
    this.moreThanTwoYrExp = [];

    this.dataSource.filteredData.forEach(element => {

      var joiningDate = element.joining_date;
      var datearray = joiningDate.split("/");

      element.joining_date = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
      element.experience_in_years = this.calculateYearOfExperience(new Date(element.joining_date));
       if(element.experience_in_years >=2){
        this.moreThanTwoYrExp.push(element);
       }
    });

    this.dataSourceTwoYrExp = new MatTableDataSource(this.moreThanTwoYrExp);
    this.columnsToDisplayTwoYrExp = [];
    for ( const v in this.dataSourceTwoYrExp.filteredData[0]) {
      this.displayedColumnsTwoYrExp.push(v);
      this.columnsToDisplayTwoYrExp.push(v);
      this.dataSourceTwoYrExp.sort = this.sort;
    }
  }
 
calculateYearOfExperience(joiningDate) { 
  var ageDifMs = Date.now() - joiningDate;
  var ageDate = new Date(ageDifMs); 
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

getDistinct(){
  this.uniqueDepartment = [];
  
  this.dataSource.filteredData.forEach(element => {
    let isElemExist = this.uniqueDepartment.findIndex(function(item) {
      return item.department === element.department;
    })

    if(isElemExist === -1){
      let obj = {'department':'', 'count':0};
        obj.department = element.department;
        obj.count = 1;
        this.uniqueDepartment.push(obj)
  } else {
    this.uniqueDepartment[isElemExist].count += 1
  
    }
  });
  
}

removeDevelopementDept(){
  const departmentToRemove = "Development";
  const filteredCandidates = this.dataSource.filteredData.filter((item) => item.department !== departmentToRemove);
  this.dataSourceRemoveDevelopmentDept = new MatTableDataSource(filteredCandidates);
  this.columnsToDisplayRemoveDevelopmentDept = [];
  for ( const v in this.dataSourceRemoveDevelopmentDept.filteredData[0]) {
    this.displayedColumnsRemoveDevelopmentDept.push(v);
    this.columnsToDisplayRemoveDevelopmentDept.push(v);
    this.dataSourceRemoveDevelopmentDept.sort = this.sort;
  }
 
}
  searchByParam(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
}

}

