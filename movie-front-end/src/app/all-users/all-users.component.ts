import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {
  userslist!: any[];
  dataSource:any;
  user: User={
    userId: '',
    userEmailId: '',
    password: '',
    isVerified: false,
    registeredDate: new Date,
    userName: '',
    isSubscribed: false
  };
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  displayedColumns:string[]=["userId","userEmailId","password","isVerified","userName","registerDate"]
  ngOnInit(): void {
  this.fetchAllUsers();
  }
  constructor(private userservice:UserService,private route:Router){}
  fetchAllUsers() {
    this.userservice.getAllUsers().subscribe(
      (response: any[]) => {
        console.log("fetching worked", response);
        if (response) {
          
          this.userslist = response;
          
          console.log("all users component")
          console.log(this.userslist);
          this.dataSource = new MatTableDataSource<User>(this.userslist);
          this.dataSource.paginator = this.paginatior;
          console.log("Displayed Columns:", this.displayedColumns);
          //this.route.navigate(['/all-users'])
        } else {
          console.log("API response is null or undefined");
        }
      },
      (error: any) => {
        console.log("error while fetching the data", error);
      }
    );
  }
  

}
