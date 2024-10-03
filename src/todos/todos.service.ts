import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  getAllTodos(): Promise<Array<Todo>> {
    return this.todosRepository.find();
  }

  getTodoById(id: string): Promise<Todo> {
    return this.todosRepository.findOneBy({ id });
  }
}
