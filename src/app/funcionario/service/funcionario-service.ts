import { Funcionario } from './../modelo/funcionario';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  url = `${environment.apiUrl}/funcionario`;

  configUrl = '/funcionario';

  constructor(private http: HttpClient) { }

  buscarFuncionario(funcionarioId: any): Observable<Funcionario>{
    return this.http.get<Funcionario>(`${this.url}/buscar/${funcionarioId}`);
  }

  buscarTodosFuncionarios(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(`${this.url}/buscar-todos`);
  }

  buscarFuncionarioPorNomeOuCpf(filtro: any): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(`${this.url}/buscar-todos/${filtro}`);
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.put<Funcionario>(`${this.url}/atualizar`, funcionario);
  }

  deletarFuncionario(funcionarioId: any){
    return this.http.delete(`${this.url}/deletar/${funcionarioId}`);
  }

  inserirFuncionario(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>(`${this.url}/inserir`, funcionario);
  }

}
