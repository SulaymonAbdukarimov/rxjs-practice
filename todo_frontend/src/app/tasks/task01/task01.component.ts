import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IUser, Task01Service } from './task01.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-task01',
  templateUrl: './task01.component.html',
  styleUrls: ['./task01.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task01Service]
})
export class Task01Component {
  public counter$$: Observable<number> = this.task01Service.counter$$;
  public user$$: Observable<IUser | null> = this.task01Service.user$$;
  constructor(private task01Service: Task01Service) {
  }

  incrementCounter(): void {
    this.task01Service.incrementCounter();
  }

  decrementCounter(): void {
    this.task01Service.decrementCounter();
  }


}

