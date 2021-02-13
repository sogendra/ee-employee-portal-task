import { Injectable } from '@angular/core';
import { Employee } from './model/employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public employeeList: Employee[] = [
    {
      "id": 1,
      "name": "Jhon",
      "phone": "9999999999",
      "address": {
        "city": "Pune",
        "address_line1": "ABC road",
        "address_line2": "XYZ building",
        "postal_code": "12455"
      }
    },
    {
      "id": 2,
      "name": "Jacob",
      "phone": "AZ99A99PQ9",
      "address": {
        "city": "Pune",
        "address_line1": "PQR road",
        "address_line2": "ABC building",
        "postal_code": "13455"
      }
    },
    {
      "id": 3,
      "name": "Ari",
      "phone": "145458522",
      "address": {
        "city": "Mumbai",
        "address_line1": "ABC road",
        "address_line2": "XYZ building",
        "postal_code": "12455"
      }
    }
  ];

  constructor(private router: Router) { }

  public addEmployee(emp: Employee): void {
    emp.id = this.employeeList.length + 1;
    this.employeeList.push(emp);
    this.router.navigate(['/employees']);
  }

  public updateEmployee(id: number, employee: Employee): void {
    employee.id = id;
    this.employeeList.forEach((emp, i) => {
      if (emp.id === id) {
        this.employeeList.splice(i, 1, employee);
      }
    });
    this.router.navigate(['/employees']);
  }

  public getEmployeeById(id: number): Employee {
    return this.employeeList.find(emp => emp.id === id);
  }

}
