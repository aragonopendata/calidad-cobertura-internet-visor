import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisorComponent } from './visor/visor.component';
import { TablaAccesibilidadComponent } from './tabla-accesibilidad/tabla-accesibilidad.component';

import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {MultiSelectModule} from 'primeng/multiselect';
//import { MatPaginatorIntl } from '@angular/material/paginator';
import {PaginatorModule} from 'primeng/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    TablaAccesibilidadComponent,
    VisorComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    PaginatorModule,
    MatTableModule,
    MultiSelectModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ButtonModule,
    MatIconModule,
    HttpClientModule,
    //MatPaginatorModule,
    MatSortModule
  ],
  //providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
