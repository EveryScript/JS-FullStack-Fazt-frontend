import { Component, OnInit } from '@angular/core';

// imports necesarios
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService, ]
})
export class ProfileComponent implements OnInit {
  
  // Propiedades generales
  public page_title: any;
  public user: any;
  public topics: any;
  public url: string;

  constructor(
    // Propiedades de servicios
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var idUser =  params['id'];
  
      this.getOneUser(idUser);
      this.getTopics(idUser);
    });
  }

  getOneUser(idUser: any) {
    this._userService.getUser(idUser).subscribe(
      response => {
        if(response.oneUser) {
          this.user = response.oneUser;
        } else {
          this._router.navigate(['inicio']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getTopics(idUser: any) {
    this._topicService.getTopicsByUser(idUser).subscribe(
      response => {
        if(response.topics) {
          this.topics = response.topics;
          console.log(this.topics);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
