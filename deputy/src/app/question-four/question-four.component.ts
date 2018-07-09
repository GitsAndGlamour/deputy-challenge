import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import {UserTableData, UserData} from "../data";
import {MatSort, MatTableDataSource} from "@angular/material";

class Role {
  Id: number;
  Name: string;
  Employees: UserTableData[];
}
@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.component.html',
  styleUrls: ['./question-four.component.css'],
  providers: [DataService]
})
export class QuestionFourComponent implements OnInit {
  location;
  form;
  roles: Role[] = [];
  dataservice: DataService;
  dataSource: MatTableDataSource<UserTableData>;
  displayedColumns: string[] = ['DisplayName', 'LocationName'];
  employeeData;

  @ViewChild(MatSort) sort: MatSort;

  constructor(dataservice: DataService, private changeDetectorRefs: ChangeDetectorRef) {
    this.dataservice = dataservice;
  }

  ngOnInit() {
    this.location = false;
    this.dataSource = new MatTableDataSource([]);
  }

  searchEmployees(form) {
    this.form = form;
    this.dataservice.getEntityById('users', this.form.Employee).subscribe(value => {
      this.employeeData = value;
      this.roles = [];
      this.getSubordinates(value.Role, this.roles);
    });
  }
  getSubordinates(roleId: number, roles: Role[]) {
    const role = new Role();
    this.dataservice.getEntitiesForProperty('roles', 'ParentRole', roleId, '=').subscribe(subordinate => {
      if (subordinate.length > 0) {
        role.Id = subordinate[0].Id;
        role.Name = subordinate[0].Name;
        this.employeeData.RoleName = role.Name;
        role.Employees = [];
        this.dataservice.getEntitiesForProperty('users', 'Role', role.Id, '=').subscribe(users =>{
          const restricted = [];
          if (this.form.Location) {
            users.forEach(obj => {
              if (obj.Location == this.employeeData.Location) {
                restricted.push(obj);
              }
            });
          }
          users.forEach(user => {
            if (!this.form.Location || user.Location == this.employeeData.Location) {
              const tableData = new UserTableData();
              tableData.DisplayName = user.DisplayName;
              tableData.RoleName = role.Name;
              this.dataservice.getEntityById('locations', user.Location).subscribe(location => {
                tableData.LocationName = location.Name;
                role.Employees.push(tableData);
                if (this.employeeData.Location == user.Location) {
                  this.employeeData.LocationName = location.Name;
                }
                if ((!this.form.Location && users.indexOf(user) == users.length - 1) ||
                (this.form.Location && restricted.indexOf(user) == restricted.length -1)) {
                  roles.push(role);
                  console.log(roles);
                }
              });
            }
          });
          this.getSubordinates(users[0].Role, roles);
        });
      } else {
        this.dataservice.getEntityById('locations', this.employeeData.Location).subscribe(location => {
          this.employeeData.LocationName = location.Name;
        });
        this.dataservice.getEntityById('roles', this.employeeData.Role).subscribe(role => {
          this.employeeData.RoleName = role.Name;
        })
      }
    });
  }

  refresh(role) {
    console.log(role);
    this.dataSource = new MatTableDataSource(role.Employees);
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();

  }

}
