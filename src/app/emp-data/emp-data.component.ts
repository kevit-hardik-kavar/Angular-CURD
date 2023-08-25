import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { employeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-data',
  templateUrl: './emp-data.component.html',
  styleUrls: ['./emp-data.component.css'],
})
export class EmpDataComponent implements OnInit {
  empdata: any;
  data : any
  uniqueId:any
  loading:boolean = false
  constructor(private employeeData: employeeService, private route: Router) {}

  ngOnInit(): void {
    this.loading = true
    this.employeeData.getRequest().subscribe((res) => {
      this.loading = false
      this.empdata = res
    });

  }
  addEmployee() {
    this.route.navigate(['form']);
  }
  onEdit(emp: any,index:number) {
    this.route.navigate(['form'],{queryParams: {action:'edit',id:emp.id,i:index}})
  }
  onDelete(emp:object) {
    this.employeeData
      .deleteRequest(emp)
      .subscribe(()=> window.location.reload());
    }
}
