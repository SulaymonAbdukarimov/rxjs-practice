import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Subject, takeUntil, tap } from 'rxjs';


@Component({
  selector: 'app-todo-add',
  templateUrl: 'todo-add.component.html',
  styleUrls: ['todo-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoAddComponent implements OnInit, OnDestroy {
  todoForm!: FormGroup;
  destroy$ = new Subject<void>()

  constructor(public _todoService: TodoService) {
  }


  ngOnInit(): void {
    this.todoForm = new FormGroup({
      text: new FormControl('', Validators.required),
      isDone: new FormControl('', Validators.required)
    });

    this._todoService.editingTodo$.
      pipe(
        takeUntil(
          this.destroy$
        ),
        tap(value => {
          if (value !== null) {
            this.todoForm.addControl('id', new FormControl(''))
            this.todoForm.patchValue(value)
          }
        })
      ).
      subscribe()
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }


  addTodo() {
    this._todoService.addTodoList(this.todoForm.value).pipe(
      tap(() => this.todoForm.reset())
    ).subscribe()
  }

  getAllTodos() {
    this._todoService.getTodoList().subscribe()
  }

  updateTodo() {
    this._todoService.updateTodoList(this.todoForm.value).pipe(tap(() => {
      this.todoForm.reset()
      this._todoService.editingTodo$.next(null)
    })).subscribe()
  }


}
