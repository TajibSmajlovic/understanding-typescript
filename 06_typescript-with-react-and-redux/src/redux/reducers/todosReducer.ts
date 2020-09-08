import { ITodoModel, IStoreState } from 'interfaces/models';
import { TAction } from 'redux/types/todosTypes';
import { todosTypes } from 'redux/types';

export const todosReducer = (state: ITodoModel[] = [], action: TAction) => {
  const { type, payload } = action;

  switch (type) {
    case todosTypes.FETCH_TODOS:
      return payload;
    case todosTypes.DELETE_TODO:
      return state.filter(t => t.id !== payload);

    default:
      return state;
  }
};

export const getTodos = (state: IStoreState) => state.todos;
