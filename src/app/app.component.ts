import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cobertura';
  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'indeterminate';
  spinnerValue = 50;

}
