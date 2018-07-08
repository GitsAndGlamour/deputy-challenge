export interface Data {
  Id: number;
}

export class UserData implements Data {
  Id: number;
  DisplayName: string;
  Location: number;
  Role: number;
  PhotoUrl: string;
}

export class LocationData implements Data {
  Id: number;
  Name: string;
}

export class RoleData implements Data {
  Id: number;
  Name: string;
  ParentRole: number;
}

export class DepartmentData implements Data{
  Id: number;
  Name: string;
}

export class UserTableData implements Data {
  RowId: number;
  Id: number;
  DisplayName: string;
  Role: number;
  RoleName: string;
  Location: number;
  LocationName: string;
  Schedules: ScheduleTableData[];
  Action: string;
}

export class ScheduleTableData implements Data {
  Id: number;
  Employee: number;
  EmployeeName: string;
  Department: number;
  DepartmentName: string;
  StartTime: Date;
  EndTime: Date;
  constructor() {}
  serialize(input: Object) {
    this.Id = input['Id'];
    this.Employee = input['Employee'];
    this.EmployeeName = input['EmployeeName'];
    this.Department = input['Department'];
    this.DepartmentName = input['DepartmentName'];
    this.StartTime = input['StartTime'];
    this.EndTime = input['EndTime'];
  }
}
