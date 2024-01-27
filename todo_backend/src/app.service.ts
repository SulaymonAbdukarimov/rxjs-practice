import { Injectable } from '@nestjs/common';
import { TodoStorage } from './todo.storage';


@Injectable()
export class AppService {

  constructor(public todoStore: TodoStorage) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  checkCode(obj: { code: string }): { result: 'ok' | 'error' } {
    console.log(obj);
    if (obj == null) {
      return { result: 'error' };
    }
    if (obj.code !== '2145') {
      return { result: 'error' };
    }
    return { result: 'ok' };
  }
}
