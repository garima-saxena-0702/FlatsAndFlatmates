import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public newUser: boolean = false;
  public userName: string;
  public email: string;
  public password: string;
  public confPassword: string;

  constructor() { }
  
  ngOnInit() {
  }
  
  togglePasswordType(elementId, iconId) {
    (<HTMLInputElement>document.getElementById(elementId)).type = (<HTMLInputElement>document.getElementById(elementId)).type == "text" ? "password": "text";
    let classFa = document.getElementById(iconId).classList.contains("fa-eye");
    document.getElementById(iconId).classList.remove(!classFa ? "fa-eye-slash" : "fa-eye");
    document.getElementById(iconId).classList.add(classFa ? "fa-eye-slash" : "fa-eye");
  }

  signupToggle() {
    this.newUser = !this.newUser;
    this.resetValues()
  }

  login() {
    console.log("in login");
    console.log(this.email);
    console.log(this.password);
  }

  signup() {

  }

  resetValues() {
    this.password = "";
    this.email = "";
    this.confPassword="";
    this.userName = "";
  }

}