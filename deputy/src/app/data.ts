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

export class TableData {
  RowId: number;
  DisplayName: string;
  RoleName: string;
  LocationName: string;
  Action: string;
}
