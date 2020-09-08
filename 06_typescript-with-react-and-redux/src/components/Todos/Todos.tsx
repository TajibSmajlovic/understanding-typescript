import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTodos } from 'redux/reducers';
import { todosActions } from 'redux/actions';

const Todos: React.FC = () => {
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todosActions.fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => dispatch(todosActions.fetchTodos())}>GET TODOS</button>

      <hr />

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.title}
            <span style={{ marginLeft: 15, fontWeight: 'bold' }}>{t.completed}</span>
            <span
              style={{ marginLeft: 25, fontWeight: 'bold' }}
              onClick={() => dispatch(todosActions.deleteTodo(t.id))}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
