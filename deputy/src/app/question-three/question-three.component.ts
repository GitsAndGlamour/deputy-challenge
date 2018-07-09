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
  rows: number = 0;
  employee: number;
  department: number;
  dateStart: FormControl;
  dateEnd: FormControl;
  startDate: string;
  endDate: string;
  isFormDataValid: boolean;
  isScheduleAddValid: boolean;
  snackbar: MatSnackBar;

  tableData: ScheduleTableData[] = [];
  displayedColumns: string[] = ['employee', 'department', 'start', 'end', 'actions'];
  dataSource: MatTableDataSource<ScheduleTableData>;

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

  onSubmit(f: NgForm) {
    if (this.validateForm(f)) {
      this.dataExists(f.value);
      const startTime = new Date (f.value.startDate.toString().substring(0, 15) + ' ' + f.value.startTime);
      const endTime = new Date (f.value.endDate.toString().substring(0, 15) + ' ' + f.value.endTime);
      f.value.StartTime = startTime;
      f.value.EndTime = endTime;
      f.value.Id = ++this.rows;
      let data = new ScheduleTableData();
      data.serialize(f.value);
      this.compareExistingTimes(data);
      if (this.isFormDataValid && this.isScheduleAddValid) {
          let postSuccess = false;
          this.dataservice.addEntity('schedules', data).subscribe(isSuccess => {
            postSuccess = isSuccess;
          });
        this.tableData.unshift(data);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
      } else {
          if (!this.isScheduleAddValid) {
            this.snackbar.open('Invalid scheduling. This schedule conflicts with another schedule already set.', 'OK');
          }
          if (!this.isFormDataValid) {
            this.snackbar.open('Invalid Employee/Department.', 'OK');
          }
      }
    }
  }

  compareExistingTimes(form: ScheduleTableData) {
    this.isScheduleAddValid = true;
    this.tableData.forEach((row: ScheduleTableData) => {
      if (row.Employee == form.Employee) {
        if (form.StartTime.getTime() >= row.StartTime.getTime() && form.StartTime.getTime() <= row.EndTime.getTime()) {
          this.isScheduleAddValid = false;
        } else if (row.StartTime.getTime() >= form.StartTime.getTime() && row.EndTime.getTime() <= form.EndTime.getTime()) {
          this.isScheduleAddValid = false;
        }
      }
    });
  }

  dataExists(form: ScheduleTableData) {
    this.isFormDataValid = false;
    this.dataservice.getEntityById('users', form.Employee).subscribe((employee: UserData) => {
      if (employee) {
        form.EmployeeName = employee.DisplayName;
      } else {
        this.isFormDataValid = false;
      }
      this.dataservice.getEntityById('departments', form.Department).subscribe((department: DepartmentData) => {
        if (department) {
          form.DepartmentName = department.Name;
        } else {
          this.isFormDataValid = false;
        }
      });
    });
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

  delete(schedule: ScheduleTableData) {
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
