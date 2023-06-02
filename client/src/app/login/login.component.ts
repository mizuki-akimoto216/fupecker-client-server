import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';

  loginSuccess:any;
  hideLoginStatus = true;

  constructor(private http: HttpClient, private router:Router){

  }

  login(){
    console.log(this.email, this.password);
    this.http.post("http://localhost:4400/users", { email:this.email, password:this.password}).subscribe(res => {
      if(res){
          this.router.navigate(['/admin'])
      } else {
          this.hideLoginStatus = false;
          this.loginSuccess = res;
      }
    })
  }

  ngOnInit(): void {
    
  }
}
