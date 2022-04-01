import { Component, OnInit } from '@angular/core';
import { AppconfigService } from '../services/appconfig.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  municipio:String="";
  filtros=[
    {name: 'Todos', code: 'todos'},
    {name: 'Algunosxd', code: 'algunos'}
  ];
  estados=[
    {name: 'Velocidad de bajada', code: 'Bajada'},
    {name: 'Velocidad de subida', code: 'Subida'}
  ];
  selectedFiltro="todos";
  selectedEstado="Bajada";
  iframeUrlSaniticed:any=null;
  constructor(private appConfig:AppconfigService ,public sanitizer:DomSanitizer) { 

  }
  async ngOnInit() {
    await this.appConfig.loadConfig().toPromise().then((res:any)=>{
      console.log("CONFIG",res);
      this.iframeUrlSaniticed=this.sanitizer.bypassSecurityTrustResourceUrl(res.urlIframe); 

    })
  }

}
