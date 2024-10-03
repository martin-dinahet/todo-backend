import { Controller, Get, Param } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAllTodos(): Promise<Array<Todo>> {
    return this.todosService.getAllTodos();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todosService.getTodoById(id);
  }
}
