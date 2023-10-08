import { Status } from './modelo/status';
import { Departamento } from './modelo/departamento';
import { Funcionario } from './modelo/funcionario';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FuncionarioService } from './service/funcionario-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  departamento: Departamento[] = [];
  status: Status[] = [];
  display = false;
  funcionario: Funcionario = {};

  formPesquisa = this.formBuilder.group({
    campoPesquisa: ['']
  });

  formFuncionario = this.formBuilder.group({
    funcionarioId: [''],
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    telefone: [''],
    email: ['', Validators.required],
    dataAdmissao: ['', Validators.required],
    departamento: ['', Validators.required],
    salario: ['', Validators.required],
    status: ['', Validators.required],
  })

  constructor(
    private funcionarioService: FuncionarioService,
    private formBuilder: FormBuilder
    ){
    this.departamento = [
        {nome: 'Recursos Humanos', codigo: 'RH'},
        {nome: 'Desenvolvimento', codigo: 'DESENVOLVIMENTO'}
    ];
    this.status = [
      {nome: 'Ativo', codigo: 'ATIVO'},
      {nome: 'Inativo', codigo: 'INATIVO'}
    ];
    }
  
  ngOnInit() {
    this.funcionarioService.buscarTodosFuncionarios().subscribe(resp => {
      this.funcionarios = resp;
    });
  }

  salvar(){
    if(this.formFuncionario.valid){
    const funcionario = this.montaFuncionarioParaSalvar();
    if(funcionario.id){
      this.funcionarioService.atualizarFuncionario(funcionario).subscribe();
    }else{
      this.funcionarioService.inserirFuncionario(funcionario).subscribe();
    }
    
    this.display = false;
    }
  }

  cancelar(){
    this.formFuncionario.reset();
    this.display = false;
  }

  excluir(){
    this.funcionarioService.deletarFuncionario(this.funcionario.id).subscribe();
    this.display = false;
  }

  editar(funcionarioId: any){
    this.funcionarioService.buscarFuncionario(funcionarioId).subscribe(funcionario => {
      this.funcionario = funcionario;
      this.montaFuncionarioParaEditar(funcionario);
      this.showDialog();
    })
  }

  adicionar(){
    this.funcionario = {};
    this.formFuncionario.reset();
    this.showDialog();
  }

  showDialog(){
    this.display = true;
  }

  montaFuncionarioParaSalvar(): Funcionario{    
      return {
        id: this.funcionario.id,
        nome: this.formFuncionario.get('nome')?.value,
        cpf: this.formFuncionario.get('cpf')?.value,
        telefone: this.formFuncionario.get('telefone')?.value,
        email: this.formFuncionario.get('email')?.value,
        dataAdmissao: this.formFuncionario.get('dataAdmissao')?.value,
        departamento: this.formFuncionario.get('departamento')?.value,
        salario: this.formFuncionario.get('salario')?.value,
        status: this.formFuncionario.get('status')?.value
      } 
  }

  montaFuncionarioParaEditar(funcionario: Funcionario){
    if(funcionario){
      this.formFuncionario.get('funcionarioId')?.setValue(funcionario.id);
      this.formFuncionario.get('nome')?.setValue(funcionario.nome);
      this.formFuncionario.get('cpf')?.setValue(funcionario.cpf);
      this.formFuncionario.get('telefone')?.setValue(funcionario.telefone);
      this.formFuncionario.get('email')?.setValue(funcionario.email); 
      this.formFuncionario.get('dataAdmissao')?.setValue(funcionario.dataAdmissao);
      this.formFuncionario.get('departamento')?.setValue(funcionario.departamento);
      this.formFuncionario.get('salario')?.setValue(funcionario.salario);
      this.formFuncionario.get('status')?.setValue(funcionario.status);
    }
}


  pesquisar(){
    this.funcionarioService.buscarFuncionarioPorNomeOuCpf(this.formPesquisa.get('campoPesquisa')?.value).subscribe(resp =>{
      if(resp){
        this.funcionarios = resp;
      }
    })
  }

}
