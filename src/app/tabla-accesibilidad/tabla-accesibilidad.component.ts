import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Municipios } from 'src/model/municipios';
import { Observable } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-tabla-accesibilidad',
  templateUrl: './tabla-accesibilidad.component.html',
  styleUrls: ['./tabla-accesibilidad.component.css']
})
export class TablaAccesibilidadComponent implements OnInit {

  @ViewChild('pag', {static: false}) pagElement: any;

  spinner: HTMLElement = document.getElementsByClassName('spinner-container')[0] as HTMLElement;
  url = "http://localhost:5000/";
  documentos = [];
  totalDocumentos = 0;

  //paginatorOptions:any;

  rowsSkip = 0;
  pageSize = 50;

  currentPage = 0;
  totalPages = 0;

  sortActive = '';
  sortDirection = '';
  municipios: any[] = Municipios.listadoMunicipios;

  categorias= [
    {name: 'RED MOVIL', code: 'RED MOVIL'},
    {name: 'RED FIJA', code: 'RED FIJA'}
  ];


  calidades= [
    {name: '1 - Muy Baja', code: '1 - Muy Baja'},
    {name: '2 - Baja', code: '2 - Baja'},
    {name: '3 - Media', code: '3 - Media'},
    {name: '4 - Alta', code: '4 - Alta'}
  ];


  //selectedMunicipio = new Array();
  selectedMunicipio: any = undefined;
  selectedCategoria: any = {name: 'RED MOVIL', code: 'RED MOVIL'};
  selectedCalidad = new Array();

  esMapa:string = "false";

  //urlMapa = "https://desopendataei2a.aragon.es/cobertura/kibana/dash_cobertura/";

  //constructor(private aroute: ActivatedRoute, public http: HttpClient, private sanitizer: DomSanitizer) { 
    constructor(public http: HttpClient) { 
    this.getJSON().subscribe(config => {
        this.url = config.api.url;
        //this.urlMapa = config.mapa.url;
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/config.json");
  }

  ngOnInit(): void {
    this.spinner.style.display = 'none';

    /*try {
      this.aroute
        .queryParams
        .subscribe(params => {
          this.esMapa = params['map'] || "false";
      });
    } catch (err) {

    }*/
  }  

   buscar(eventBuscar:any, eventPaginator: any, eventSort: any) {


    this.spinner.style.display = 'inherit';
    
    try {


      /*if (this.esMapa == "true") {

        let arrCategorias: any[] = [];
        let arrMunicipios: any[] = [];

        if (this.selectedCategoria != null && this.selectedCategoria.name != null && this.selectedCategoria.name.trim().length > 0 ) {
          arrCategorias.push(this.selectedCategoria.name);
        }
  
        if (this.selectedMunicipio != null && this.selectedMunicipio.name != null && this.selectedMunicipio.name.trim().length > 0 ) {
          arrMunicipios.push(this.selectedMunicipio.name);
        }
  
        if (arrMunicipios.length <= 0) {
          this.spinner.style.display = 'none';
          return false;
        }

        let sMunicipio = arrMunicipios[0];
        let sCategoria = arrCategorias[0];


        let eIframe = (<HTMLIFrameElement> document.getElementById("iframe"));

        if (eIframe != undefined && eIframe.contentWindow) {
          // combo municipio
          (<HTMLInputElement> eIframe.contentWindow.document.getElementsByClassName("euiFormControlLayoutCustomIcon euiFormControlLayoutCustomIcon--clickable")[0]).click();

          (<HTMLInputElement> eIframe.contentWindow.document.querySelector('[title="' + sMunicipio + '"]')).click();
       
          // combo categoria
          (<HTMLInputElement> eIframe.contentWindow.document.getElementsByClassName("euiFormControlLayoutCustomIcon euiFormControlLayoutCustomIcon--clickable")[1]).click();
  
          (<HTMLInputElement> eIframe.contentWindow.document.querySelector('[title="' + sCategoria + '"]')).click();
  
          // centrar
          (<HTMLInputElement> eIframe.contentWindow.document.getElementsByClassName("euiButtonIcon euiButtonIcon--primary euiButtonIcon--empty euiButtonIcon--small")[0]).click();
        }

        this.spinner.style.display = 'none';
      } else {*/
        let take = 50;
        let skip = 0;
    
        let sortBy = "";
        let sortOrder = "";
    
        if (this.sortActive != null) {
          sortBy = this.sortActive;
        }
    
        if (this.sortDirection != null) {
          sortOrder = this.sortDirection;
        }
    
        if (this.pageSize != null && this.pageSize > 0) {
          take = this.pageSize;
        }
  
        if (this.rowsSkip != null && this.rowsSkip > 0) {
          skip = this.rowsSkip;
        }
    
        if (eventSort != null) {
          this.sortDirection = eventSort.direction;
          sortOrder = eventSort.direction;
    
          if (this.sortDirection.length == 0) {
            this.sortActive = "";
            sortBy = "";
          } else {
            this.sortActive = eventSort.active;
            sortBy = eventSort.active;
          }      
        }
    
        if (eventPaginator != null) {
          this.pageSize = eventPaginator.rows;
          take = eventPaginator.rows;
    
          skip = eventPaginator.page * eventPaginator.rows;
          this.rowsSkip = eventPaginator.page * eventPaginator.rows;
        }
    
        let arrCategorias: any[] = [];
        let arrMunicipios: any[] = [];
        let arrCalidades: any[] = [];
    
        /*if (this.selectedCategoria != null && this.selectedCategoria.length > 0) {
          this.selectedCategoria.forEach(function (element) {
            arrCategorias.push(element.name);
          });
        }
    
        if (this.selectedMunicipio != null && this.selectedMunicipio.length > 0) {
          this.selectedMunicipio.forEach(function (element) {
            arrMunicipios.push(element.name);
          });
        }
    
        if (this.selectedCalidad != null && this.selectedCalidad.length > 0) {
          this.selectedCalidad.forEach(function (element) {
            arrCalidades.push(element.name);
          });
        }*/
  
        if (this.selectedCategoria != null && this.selectedCategoria.name != null && this.selectedCategoria.name.trim().length > 0 ) {
          arrCategorias.push(this.selectedCategoria.name);
        }
  
        if (this.selectedMunicipio != null && this.selectedMunicipio.name != null && this.selectedMunicipio.name.trim().length > 0 ) {
          arrMunicipios.push(this.selectedMunicipio.name);
        }
  
        if (arrMunicipios.length <= 0) {
          this.spinner.style.display = 'none';
          return false;
        }
  
        //let paginatorOptions:any;
  
        if (eventBuscar != undefined) {
          //this.paginatorOptions = undefined;
          skip = 0;
          this.pagElement.changePageToFirst(eventBuscar);
        }
        //paginatorOptions = this.paginatorOptions;
                
        const body = {
          tipo: 0,
          take: take,
          skip: skip,
          sortBy: sortBy,
          sortOrder: sortOrder,
          fmunicipios: arrMunicipios,
          fcategorias: arrCategorias,
          fcalidades: arrCalidades/*,
          paginator: paginatorOptions*/
        };
  
        this.http.post<any>(this.url + 'api/obtenerReportesAccesibilidad', body).subscribe(oResult => {
          this.totalDocumentos = oResult.total;
          //this.paginatorOptions = oResult.paginator;
          this.documentos = oResult.documents;
          this.spinner.style.display = 'none';  
        },
        error => {
          this.spinner.style.display = 'none';
        } );
      //}
    } catch (err) {
      this.spinner.style.display = 'none';
    }

    return true;
  }

  /*obtenerURLIframe() {
    if (this.urlMapa != undefined) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlMapa);
    } else {
      return '';
    }
  }*/
}

