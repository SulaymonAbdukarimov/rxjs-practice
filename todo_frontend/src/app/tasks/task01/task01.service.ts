import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IUser {
  id: number,
  name: string
}

interface IStore {
  counter: number,
  users: IUser[]
}

@Injectable()
export class Task01Service {

  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    counter: 1,
    users: [
      { id: 2, name: 'John' },
      { id: 3, name: 'Mike' },
      { id: 4, name: 'Alex' },
      { id: 6, name: 'Eugene' },
      { id: 9, name: 'Angela' },
      { id: 10, name: 'Casey' },
    ],
  })

   counter$$:Observable<number>= this._store.pipe(
     map((store) => store.counter)
   )

  user$$:Observable<IUser | null > = this._store.pipe(
    map((store) => store.users.find((item) => item.id === store.counter) ?? null)
  )


  incrementCounter(): void {
    const newValue = this._store.getValue().counter + 1;
    if(newValue > 10) {
      return;
    }else {
      this._updateStore({ counter: newValue });
    }
  }

  decrementCounter(): void {
    const newValue = this._store.getValue().counter - 1;
    if( newValue < 1) {
      return;
    }else {
      this._updateStore({ counter: newValue })
    }
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }
}


