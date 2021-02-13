import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  public employeeForm: FormGroup;

  public employee: Employee;

  public routeId: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute) {
    this.employeeForm = this.buildForm();
  }

  ngOnInit(): void {
    this.checkEditOrAdd()
  }

  private checkEditOrAdd(): void {
    this.route.paramMap.subscribe(param => {
      if (param.has('id')) {
        this.routeId = Number(param.get('id'));
        this.employee = this.employeeService.getEmployeeById(this.routeId);
        this.employeeForm.patchValue(this.employee);
      }
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      address: this.fb.group({
        city: [''],
        address_line1: [''],
        address_line2: [''],
        postal_code: ['']
      })
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  public submitDetails(): void {
    console.log(this.employeeForm.getRawValue());
    (this.routeId) ? this.employeeService.updateEmployee(this.routeId, this.employeeForm.getRawValue()) :
      this.employeeService.addEmployee(this.employeeForm.getRawValue());
  }

}

