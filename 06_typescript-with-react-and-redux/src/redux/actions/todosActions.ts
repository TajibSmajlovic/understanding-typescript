import axios from 'axios';
import { Dispatch } from 'redux';

import { todosTypes } from 'redux/types';
import { ITodoModel, IFetchTodosActionModel, IDeleteTodoActionModel } from 'interfaces/models';
import { API_ENDPOINTS } from 'utils/constants';

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<ITodoModel[]>(API_ENDPOINTS.GET_TODOS);

    dispatch<IFetchTodosActionModel>({
      type: todosTypes.FETCH_TODOS,
      payload: response.data,
    });
  };
};

export const deleteTodo = (todoId: number): IDeleteTodoActionModel => {
  return {
    type: todosTypes.DELETE_TODO,
    payload: todoId,
  };
};
