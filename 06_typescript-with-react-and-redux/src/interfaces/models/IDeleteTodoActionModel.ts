import { todosTypes } from 'redux/types';

export interface IDeleteTodoActionModel {
  type: todosTypes.DELETE_TODO;
  payload: number;
}
