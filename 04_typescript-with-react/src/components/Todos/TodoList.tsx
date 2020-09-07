import React from "react";

import "./TodoList.css";
import ITodoListProps from "interfaces/props/ITodoListProps";

const TodoList: React.FC<ITodoListProps> = ({ todos, deleteTodoHandler }) => {
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>
          <span>{t.text}</span>
          <span
            style={{ fontWeight: "bold", marginLeft: 25 }}
            onClick={deleteTodoHandler.bind(null, t.id)}
          >
            X
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
