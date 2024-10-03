import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getAllTodos(): Promise<Array<Todo>> {
    return this.todosRepository.find();
  }

  async getTodoById(id: string): Promise<Todo> {
    return this.todosRepository.findOne({ where: { id } });
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(todo);
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');
    Object.assign(todo, updateTodoDto);
    return this.todosRepository.save(todo);
  }

  async deleteTodo(id: string): Promise<void> {
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Todo not found');
  }
}
