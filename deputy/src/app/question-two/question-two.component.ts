import {Component, OnInit, ViewChild} from '@angular/core';
import {TableData, UserData} from "../data";
import {DataService} from "./question-two.service";
import {MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.css'],
  providers: [DataService]
})
export class QuestionTwoComponent implements OnInit {

  tableData: TableData[] = [];
  displayedColumns: string[] = ['DisplayName', 'LocationName', 'Action'];
  dataSource: MatTableDataSource<TableData>;
  _dataservice: DataService;
  rows: number = 0;

  @ViewChild(MatSort) sort: MatSort;


constructor(private dataservice: DataService) { this._dataservice = dataservice}

  ngOnInit() {
    this.generateData();
  }

  generateData() {
    this._dataservice.getAllUsers().subscribe(users => {
      users.forEach(user => {
        this.populateTableData(user);
      });
    });
  }

  populateTableData(user: UserData) {
    let tableDataRow = new TableData();
    tableDataRow.RowId = ++this.rows;
    tableDataRow.DisplayName = user.DisplayName;
    this._dataservice.getLocationById(user.Location)
      .subscribe(data => {
        tableDataRow.LocationName = data.Name;
    });
    this._dataservice.getRoleById(user.Role)
      .subscribe(data => {
        tableDataRow.RoleName = data.Name;
        tableDataRow.Action = 'View';
        this.tableData.push(tableDataRow);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
      });
  }

}
