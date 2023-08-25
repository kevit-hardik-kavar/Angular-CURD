import { Component, OnInit } from '@angular/core';
import { employeeService } from '../employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  employeeData = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile: new FormControl(null, Validators.required),
    select: new FormControl('intern', Validators.required),
    address: new FormControl(null, Validators.required),
  });
  loading:boolean = false
  queryParams!: any;
  preValue: any;

  constructor(
    private empls: employeeService,
    private route: Router,
    private params: ActivatedRoute
  ) {}
  ngOnInit() {
    this.onGetting();
    this.getEmployeeData();

  }
  getEmployeeData() {
    this.loading = true
    this.params.queryParams.subscribe((params) => (this.queryParams = params));
    if (this.queryParams.action == 'edit') {
      this.empls.getRequest().subscribe((res: any) => {
        this.loading = false
        this.employeeData.patchValue(res[this.queryParams.i]);
      });
    }
  }

  onPost() {
    if (this.employeeData.invalid) {
      this.employeeData.markAllAsTouched();
    }
    if (this.employeeData.valid) {
      this.loading = true
      if (this.queryParams.action == 'edit') {
        this.empls.getRequest().subscribe((res: any) => {});
        this.empls
          .putRequest(this.employeeData.value, this.queryParams.id)
          .subscribe((res) => {
            this.loading = false
            this.route.navigate([''])
          })
      } else {
        this.empls
          .postRequest(this.employeeData.value)
          .subscribe(() => this.route.navigate(['']));
      }
    }
  }
  onGetting() {
    this.empls.getRequest().subscribe(()=> this.loading = false);
  }
  onCancel() {
    this.route.navigate(['']);
  }
}
