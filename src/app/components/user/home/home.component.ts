import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMach('senha', 'confirmarSenha')
    };

    this.form = this.fb.group({
      razaoSocial: ['', Validators.required],
      CNPJ: ['', Validators.required],
      naturezaPJ: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      telefone: ['', Validators.required],
      email: ['', Validators.email],
      dataAssociacao: ['', Validators.required],
      dataEncerramento: ['', Validators.required],
      presidente: ['', Validators.required],
      CPF: ['', Validators.required],
      celular: ['', Validators.required],
      missao: ['', Validators.required],
      destaquePrioritarias: ['', Validators.required],
      profissionaisCLT: ['', Validators.required],
      voluntarios: ['', Validators.required],
      trueOrFalse: ['', Validators.required],

      
      senha: ['', [Validators.minLength(6), Validators.nullValidator]],
      confirmarSenha: ['', Validators.nullValidator]
    }, formOptions);
  }

  // Conveniente para pegar um FormField apenas com a letra F
  get f(): any { return this.form.controls; }

  onSubmit(): void {

    // Vai parar aqui se o form estiver inválido
    if (this.form.invalid) {
      return;
    }
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
