import { Component } from '@angular/core';
import { IonCol, IonRow, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loader',
  imports: [IonSpinner, IonRow, IonCol],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {}
