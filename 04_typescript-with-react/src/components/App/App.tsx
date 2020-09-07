import React, { useState } from "react";

import AddTodo from "components/Todos/AddTodo";
import TodoList from "components/Todos/TodoList";
import ITodoModel from "interfaces/models/ITodoModel";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodoModel[]>([]);

  const addTodoHandler = (text: string) => {
    setTodos((prevState) => [
      ...prevState,
      { id: Math.random().toString(), text },
    ]);
  };

  const deleteTodoHandler = (id: string) =>
    setTodos((prevState) => prevState.filter((t) => t.id !== id));

  return (
    <div>
      <AddTodo addTodoHandler={addTodoHandler} />
      <TodoList todos={todos} deleteTodoHandler={deleteTodoHandler} />
    </div>
  );
};

export default App;
