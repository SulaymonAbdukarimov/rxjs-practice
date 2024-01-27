import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';


export interface IStore {
  randomNumbers: number[]
}

@Injectable()
export class Task02Service {

  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: []
  });

  public randomNumbers$$: Observable<number[]> = this._store.pipe(
    map((store) => store.randomNumbers)
  );

  public arrayLength$$: Observable<number> = this._store.pipe(
    map((store) => store.randomNumbers.length)
  );

  public minNumber$$:Observable<number> = this._store.pipe(
    map((store) => {
      if(!store.randomNumbers.length){
        return 0
      }else {
       return Math.min(...store.randomNumbers)
      }
    })
  )

  public maxNumber$$:Observable<number> = this._store.pipe(
    map((store) => {
      if(!store.randomNumbers.length){
        return 0
      }else {
        return Math.max(...store.randomNumbers)
      }
    })
  )

  public averageNumber$$:Observable<number> = this._store.pipe(
    map((store) => {
      if(!store.randomNumbers.length){
        return 0
      }else {
        return store.randomNumbers.reduce((acc, curr) => acc + curr, 0) / store.randomNumbers.length
      }
    })
  )


  public addRandomNumber(): void {
    const randomNumber = this._getRandomNumber();
    const randomNumbers = this._store.getValue().randomNumbers;
    const newStore:[] = [];
    // @ts-ignore
    randomNumbers.forEach((item) => newStore.push(item));
    const store = [...newStore, randomNumber ]
    this._store.next({ randomNumbers: store })

  }

  private _getRandomNumber(max: number = 101): number {
    return Math.floor(Math.random() * max);
  }

  // private _updateStore(data: Partial<IStore>): void {
  //   this._store.next({ ...this._store.getValue(), ...data });
  // }

}
