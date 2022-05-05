import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';
import { Login } from 'src/app/models/Login';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logon = {} as Login;

  constructor(public formBuilder: FormBuilder, public serverService: ServerService, private router: Router,) { }

  ngOnInit(): void {
  }

  
  login(): void{
    this.serverService.postLogin(this.logon).subscribe(
      (res) => {if(res.logged){
        this.router.navigateByUrl('/home');
      }} 
     
    )
  }


}
