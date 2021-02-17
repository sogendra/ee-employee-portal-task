import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../model/employee';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  public employeeList: Employee[];

  public searchFormGroup: FormGroup;

  private destroy: Subject<void>;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeList = [...this.employeeService.employeeList];
    this.searchFormGroup = this.fb.group({
      search: [''],
    });
    this.destroy = new Subject();
  }

  ngOnInit() {
    this.searchFormGroup.get('search').valueChanges.pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroy)).subscribe(res => {
      console.log('search', res);
      this.searchEmployees(res);
    })
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  private searchEmployees(res: string): void {
    (res) ? this.employeeList = [...this.employeeService.employeeList].filter(emp => emp.name.toUpperCase().includes(res.toUpperCase()) || emp.address.city.toUpperCase().includes(res.toUpperCase()))
      : this.employeeList = [...this.employeeService.employeeList];
  }

}
