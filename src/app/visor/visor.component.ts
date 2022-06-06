import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent implements OnInit {
  municipio:String="";
  filtros=[
    {name: 'Todos', code: 'todos'},
    {name: 'Algunos', code: 'algunos'}
  ];
  estados=[
    {name: 'Velocidad de bajada', code: 'Bajada'},
    {name: 'Velocidad de subida', code: 'Subida'}
  ];
  selectedFiltro="todos";
  selectedEstado="Bajada";
  constructor() { }
  ngOnInit(): void {
  }

}
