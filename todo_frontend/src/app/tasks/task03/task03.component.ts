import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task03Service } from './task03.service';


@Component({
  selector: 'app-task03',
  templateUrl: './task03.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task03Service]
})
export class Task03Component {



  // onClick(): void {
  //   //   this.store.addRandomNumber$().subscribe();
  //   // }
}
