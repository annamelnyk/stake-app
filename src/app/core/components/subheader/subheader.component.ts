import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonCol, IonLabel, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-subheader',
  imports: [IonLabel, IonRow, IonCol],
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubheaderComponent {
  title = input('');
}
