import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_model/member';
import { MembersService } from '_services/members.service';
import { MemberDetailComponent } from '../member-detail/member-detail.component';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input()
  member!: Member;

  constructor() { }

  ngOnInit(): void {
  }

}
