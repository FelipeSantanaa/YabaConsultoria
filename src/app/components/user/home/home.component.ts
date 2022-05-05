import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Excel } from 'src/app/models/Excel';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  csv = {} as Excel;
  user = {} as User;
  form!: FormGroup;
  username: string = "munizera";

  constructor(public fb: FormBuilder, public serverService: ServerService, private router: Router) { }
  

  ngOnInit(): void {
    this.validation();
  }

  excel(): void {
    this.csv = { ...this.form.value };
    this.serverService.formExcel(this.csv).subscribe(
      (res)=>{
        console.log(res)
        this.getFormExcel();
      }
    );
  }

  getFormExcel(): void{
    this.serverService.getformExcel(this.username).subscribe((res)=> console.log("enviei"));
  }

  

  private validation(): void {
    
     
    

    this.form = this.fb.group({
      razaoSocial: ['', Validators.required],
      CNPJ: ['', Validators.required],
      naturezaPJ: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      Telefone: ['', Validators.required],
      email: ['', Validators.required],
      emailInstitucional: ['', Validators.required],
      dataAssociacao: ['', Validators.required],
      dataEncerramento: ['', Validators.required],
      presidente: ['', Validators.required],
      CPF: ['', Validators.required],
      celular: ['', Validators.required],
      missao: ['', Validators.required],
      destaquePrioritarias: ['', Validators.required],
      profissionaisCLT: ['', Validators.required],
      voluntarios: ['', Validators.required],
      possuiConselho: ['', Validators.required],
      ajudaPaciente: ['', Validators.required],
      possuiAssentoConselhoOuInstancia: ['', Validators.required],
      temClarezaProposito: ['', Validators.required],
      conhecimentoTecnicoEntidade: ['', Validators.required],
      relacionamentoDiferente: ['', Validators.required],
      discursoPautado: ['', Validators.required],
      defendeIdeiasEProjetos: ['', Validators.required],
      projetosEstruturados: ['', Validators.required],
      sistematizacaoEstruturada: ['', Validators.required],
      discursoPlanejamentoPrazos: ['', Validators.required],
      TelefoneFixo: ['', Validators.required]
    });
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
