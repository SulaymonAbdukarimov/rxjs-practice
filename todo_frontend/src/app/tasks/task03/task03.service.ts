import { Injectable } from '@angular/core';



export interface IStore {
  randomNumbers: number[],
  isHttpLoading: boolean
}

@Injectable()
export class Task03Service {

  // private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
  //   randomNumbers: [],
  //   isHttpLoading: false
  // });


  // public addRandomNumber$2(): Observable<void> {
  //
  // }


  // private _updateStore(data: Partial<IStore>): void {
  //   this._store.next({ ...this._store.getValue(), ...data });
  // }


}
