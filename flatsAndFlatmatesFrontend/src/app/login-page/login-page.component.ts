import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public newUser: boolean = false;

  constructor() { }
  
  ngOnInit() {
  }
  
  togglePasswordType() {
    (<HTMLInputElement> document.getElementById("sighInPassword")).type = (<HTMLInputElement>document.getElementById("sighInPassword")).type == "text" ? "password": "text";
    let classFa = document.getElementById("eyeIcon").classList.contains("fa-eye");
    document.getElementById("eyeIcon").classList.remove(!classFa ? "fa-eye-slash" : "fa-eye");
    document.getElementById("eyeIcon").classList.add(classFa ? "fa-eye-slash" : "fa-eye");
  }

}