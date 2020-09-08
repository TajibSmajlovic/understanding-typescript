import { ITodoModel } from 'interfaces/models';
import { todosTypes } from 'redux/types';

export interface IFetchTodosActionModel {
  type: todosTypes.FETCH_TODOS;
  payload: ITodoModel[];
}
