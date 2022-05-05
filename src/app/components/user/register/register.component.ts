import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from 'src/app/helpers/ValidatorField';
import { User } from 'src/app/models/User';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    user = {} as User;
    form!: FormGroup;

  constructor(public formBuilder: FormBuilder, public serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.validation();
  }
  get f(): any{
    return this.form.controls;
  }

  register(): void {
    this.user = { ...this.form.value };
    console.log(this.user)
    this.serverService.postRegister(this.user).subscribe(
      () => {
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
       console.log(error)
      }
    );
  }

  private validation(): void{

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMach('senha','confirmarSenha')
    }

    this.form = this.formBuilder.group(
      {
        primeiroNome: ['', Validators.required],
        ultimoNome:['', Validators.required],
        email:['', [Validators.required, Validators.email]],
        userName:['', Validators.required],
        senha:['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha:['', Validators.required],

      },
      formOptions
    )
  }
}
