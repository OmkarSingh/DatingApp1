import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/_model/member';
import { environment } from 'src/environments/environment';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private htpp:HttpClient) { }

  getMembers() {
    if (this.members.length > 0)
      return of(this.members);
    
    return this.htpp.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if (member != undefined)
      return of(member);

    return this.htpp.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    //this.members = [];
    return this.htpp.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index =  this.members.indexOf(member);
        this.members[index] = member;
      })
    )

  }
}
