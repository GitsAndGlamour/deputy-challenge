import {Component, OnInit, ViewChild} from '@angular/core';
import {UserTableData, UserData, LocationData, RoleData, Data} from '../data';
import {MatSort, MatTableDataSource} from '@angular/material';
import {DataService} from '../data.service';

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.css'],
  providers: [DataService]
})
export class QuestionTwoComponent implements OnInit {

  input;
  rows: number = 0;
  tableData: UserTableData[] = [];
  dataSource: MatTableDataSource<UserTableData>;
  displayedColumns: string[] = ['user', 'location', 'action'];
  _dataservice: DataService;
  filterMenuText = 'Filter';

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataservice: DataService) {
    this._dataservice = dataservice
  }

  ngOnInit() {
    this.generateData();
  }

  generateData() {
    this._dataservice.getAllEntities('users').subscribe((users: UserData[]) => {
      users.forEach(user => {
        this.populateTableData(user);
      });
    });
  }

  populateTableData(user: UserData) {
    let tableDataRow = new UserTableData();
    tableDataRow.RowId = ++this.rows;
    tableDataRow.Id = user.Id;
    tableDataRow.DisplayName = user.DisplayName;
    // populate Location Data...
    this._dataservice.getEntityById('locations', user.Location)
      .subscribe((data: LocationData) => {
        tableDataRow.Location = user.Location;
        tableDataRow.LocationName = data.Name;
    });
    // populate Role Data...
    this._dataservice.getEntityById('roles', user.Role)
      .subscribe((data: RoleData) => {
        tableDataRow.Role = user.Role;
        tableDataRow.RoleName = data.Name;
        tableDataRow.Action = 'View';

        this.tableData.push(tableDataRow);
        this.refreshDataSource(this.tableData);
      });
  }

  setFilterMenuText(text: string) {
    this.filterMenuText = text;
  }

  filterContents(input: string) {
    if (input.length == 0) {
      this.refreshDataSource(this.tableData);
    }
    const results: UserTableData[] = [];
    this.tableData.forEach(row => {
      let validRow = false;
      const userMatch = this.isRowValid(row.Id, row.DisplayName, input);
      const locationMatch = this.isRowValid(row.Location, row.LocationName, input);
      const roleMatch = this.isRowValid(row.Role, row.RoleName, input);

      switch(this.filterMenuText) {
        case 'User': validRow = userMatch; break;
        case 'Location': validRow = locationMatch; break;
        case 'Role': validRow = roleMatch; break;
        default: validRow = userMatch || locationMatch || roleMatch;
      }

      results.indexOf(row) == -1 && validRow ? results.push(row) : null;
      this.refreshDataSource(results);
    });
  }

  refreshDataSource(source: UserTableData[]) {
    this.dataSource = new MatTableDataSource(source);
    this.dataSource.sort = this.sort;
  }

  isRowValid(id: number, name: string, input: string): boolean {
    return (id.toString() == input) || (name.toLowerCase().indexOf(input.toLowerCase()) > -1);
  }

  showScheduling() {
    console.log("Show Scheduling");
  }
}
