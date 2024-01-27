import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';

export interface ITodoStorageItem {
  id: string,
  text: string,
  isDone: boolean,
  createdOn: string,
  selected?: boolean
}


export interface IAddTodo {
  text: string;
  isDone: boolean;
}

export interface IUpdateTodo {
  id: string;
  text: string;
  isDone: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  todoLists$ = new BehaviorSubject<ITodoStorageItem[]>([])
  editingTodo$: BehaviorSubject<IUpdateTodo | null> = new BehaviorSubject<IUpdateTodo | null>(null)

  constructor(private _http: HttpClient) { }

  getTodoList(): Observable<void> {
    return this._http.get<ITodoStorageItem[]>('http://localhost:3000/todos').pipe(
      tap((todoList: ITodoStorageItem[]) => this.todoLists$.next(todoList)),
      map(() => void 0)
    )
  }


  getTodoById(id: string) {
    this.todoLists$
      .pipe(
        map(todoLists => todoLists.find(item => item.id === id)),
      )
      .subscribe(editingTodo => {
        let updateTodo: IUpdateTodo | null = editingTodo ? { id: editingTodo.id, text: editingTodo.text, isDone: editingTodo.isDone } : null
        this.editingTodo$.next(updateTodo)
      });
  }


  addTodoList(todo: IAddTodo): Observable<void> {
    return this._http.post<IAddTodo>('http://localhost:3000/add', todo).pipe(
      switchMap(() => {
        return this.getTodoList()
      })
    )
  }


  deleteTodoList(id: string) {
    this._http.delete('http://localhost:3000/delete/' + id).pipe(
      switchMap(() => {
        return this.getTodoList()
      })
    ).subscribe()
  }

  updateTodoList(obj: IUpdateTodo): Observable<void> {
    return this._http.post('http://localhost:3000/update', obj).pipe(
      switchMap(() => {
        return this.getTodoList()
      })
    )
  }

  // updateEditingTodo(data: IUpdateTodo): void {
  //   this.editingTodo$.next({ ...this.editingTodo$.getValue(), ...data })
  // }
}
