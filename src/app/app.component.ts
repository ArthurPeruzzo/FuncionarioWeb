import { FuncionarioService } from './funcionario/service/funcionario-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    FuncionarioService
  ]
})
export class AppComponent {
  title = 'FuncionarioWeb';
}
