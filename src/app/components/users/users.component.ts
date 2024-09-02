import { Component, OnInit } from '@angular/core';
// Import necesarios
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  // Propiedades
  public users: any;
  public url: any;
  public page_title: string;

  constructor(
    // Propiedades de servicios
    private _userService: UserService
  ){
    this.page_title = "Compañeros";
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if(response.allUsers) {
          this.users = response.allUsers;
          console.log(this.users);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
