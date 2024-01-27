import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  constructor(public _todoService: TodoService) {
  }
}
