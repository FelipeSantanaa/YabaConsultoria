import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    form!: FormGroup;



  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }
  get f(): any{
    return this.form.controls;
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
        username:['', Validators.required],
        senha:['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha:['', Validators.required],

      },
      formOptions
    )
  }
}
