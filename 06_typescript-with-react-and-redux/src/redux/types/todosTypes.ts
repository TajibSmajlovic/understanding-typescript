import { IFetchTodosActionModel, IDeleteTodoActionModel } from 'interfaces/models';

export enum todosTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  DELETE_TODO = 'DELETE_TODO',
}

export type TAction = IFetchTodosActionModel | IDeleteTodoActionModel;
