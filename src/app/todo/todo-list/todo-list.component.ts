import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  showAll = false;
  todos$: Observable<Todo[]>;
  uncompletedTodos$: Observable<Todo[]>;
  constructor(private readonly todoService: TodoService) {
    this.todos$ = this.todoService.GetTodos();
    this.uncompletedTodos$ = this.todoService.GetUncompletedTodos(this.todos$);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).then(() => {
      this.refreshTodos();
    });
  }

  async newTodo(title: string) {
    await this.todoService.AddTodo(title);
    this.refreshTodos();
  }

  private refreshTodos() {
    this.todos$ = this.todoService.GetTodos();
    this.uncompletedTodos$ = this.todoService.GetUncompletedTodos(this.todos$);
  }
}
