import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {DepartmentData, ScheduleTableData, UserData} from "../data";
import {MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {DataService} from "../data.service";
// import {Moment} from "moment";


@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.component.html',
  styleUrls: ['./question-three.component.css']
})
export class QuestionThreeComponent implements OnInit {
  dateStart: FormControl;
  dateEnd: FormControl;

  tableData: ScheduleTableData[] = [];
  displayedColumns: string[] = ['employee', 'department', 'start', 'end', 'actions'];
  dataSource: MatTableDataSource<ScheduleTableData>;
  rows: number = 0;
  schedules: ScheduleTableData[] = [];
  employee: number;
  department: number;
  startDate: string;
  endDate: string;
  snackbar: MatSnackBar;
  @ViewChild(MatSort) sort: MatSort;
  constructor(snackbar: MatSnackBar, private dataservice: DataService) {
    this.snackbar = snackbar;
  }

  ngOnInit() {
    this.dateStart = new FormControl(new Date());
    this.dateEnd = new FormControl(new Date());
    this.refreshDataSource(this.tableData);
    this.dataservice.getAllEntities('schedules').subscribe((schedules: ScheduleTableData[]) => {
      schedules.forEach(schedule => {
        schedule.StartTime = new Date(schedule.StartTime);
        schedule.EndTime = new Date(schedule.EndTime);
      });

    this.rows = schedules.length;
    this.tableData = schedules;
    this.refreshDataSource(this.tableData);
    });
  }

  onSubmit(f: NgForm, event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.validateForm(f)) {
      const startTime = new Date (f.value.startDate.toString().substring(0, 15) + ' ' + f.value.startTime);
      const endTime = new Date (f.value.endDate.toString().substring(0, 15) + ' ' + f.value.endTime);
      f.value.StartTime = startTime;
      f.value.EndTime = endTime;
      f.value.Id = ++this.rows;
      let data = new ScheduleTableData();
      data.serialize(f.value);
      if (this.compareExistingTimes(data)) {
        this.dataservice.getEntityById('users', data.Id).subscribe((user: UserData) => {
          data.EmployeeName = user.DisplayName;
          this.dataservice.getEntityById('departments', data.Department).subscribe((department: DepartmentData) => {
            data.DepartmentName = department.Name;
            let postSuccess = false;
            this.dataservice.addEntity('schedules', data).subscribe(value => {
              postSuccess = value;
            });
          });
        });
        this.tableData.unshift(data);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
      } else {
        this.snackbar.open('Invalid scheduling. This schedule conflicts with another schedule already set.', 'OK');
      }
    }
  }

  compareExistingTimes(form: ScheduleTableData): boolean {
    let isValid = true;
    this.tableData.forEach((row: ScheduleTableData) => {
      if (row.Employee == form.Employee) {
        if (form.StartTime.getTime() >= row.StartTime.getTime() && form.StartTime.getTime() <= row.EndTime.getTime()) {
          isValid = false;
        } else if (row.StartTime.getTime() >= form.StartTime.getTime() && row.EndTime.getTime() <= form.EndTime.getTime()) {
          isValid = false;
        }
      }
    });
    return isValid;
  }
  validateForm(form: NgForm) {
    const startTime = new Date (form.value.startDate.toString().substring(0, 15) + ' ' + form.value.startTime).getTime();
    const endTime = new Date (form.value.endDate.toString().substring(0, 15) + ' ' + form.value.endTime).getTime();
    const isValidEmployee = Number.isInteger(form.value.Employee);
    !isValidEmployee ? this.snackbar.open('Invalid Employee. Please enter a valid number.', 'OK') : null;
    const isValidDepartment = Number.isInteger(form.value.Department);
    !isValidDepartment ? this.snackbar.open('Invalid Department. Please enter a valid number.', 'OK') : null;
    const isValidStartDate = startTime >= Date.now();
    !isValidStartDate ? this.snackbar.open('Invalid Start Date. The Start Date provided cannot occur in the past.', 'OK') : null;
    const isValidEndDate = endTime >= startTime;
    !isValidEndDate ? this.snackbar.open('Invalid End Date. The End Date provided cannot occur before the Start Date.', 'OK') : null;
    const validTimeRegEx =  /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    const isValidStartTime = validTimeRegEx.test(form.value.startTime);
    !isValidStartTime ? this.snackbar.open('Invalid Start Time. The Start Time is not in the correct format (HH:MM or HH:MM:SS).', 'OK') : null;
    const isValidEndTime = validTimeRegEx.test(form.value.endTime);
    !isValidEndTime ? this.snackbar.open('Invalid End Time. The Start Time is not in the correct format (HH:MM or HH:MM:SS).', 'OK') : null;
    return isValidEmployee && isValidDepartment && isValidStartDate && isValidEndDate && isValidStartTime && isValidEndTime;
  }

  delete(schedule: ScheduleTableData, event) {
    event.preventDefault();
    event.stopPropagation();
    const index = this.tableData.indexOf(schedule);
    console.log(index);
    this.tableData.splice(index, 1);
    let postSuccess = false;
    this.dataservice.removeEntity('schedules', schedule).subscribe(value => {
      postSuccess = value;
    });
    this.refreshDataSource(this.tableData);
  }

  refreshDataSource(source: ScheduleTableData[]) {
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.sort = this.sort;
  }

}
