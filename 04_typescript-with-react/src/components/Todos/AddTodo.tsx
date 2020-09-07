import React, { useRef } from "react";

import "./AddTodo.css";
import IAddTodoProps from "interfaces/props/IAddTodoProps";

const AddTodo: React.FC<IAddTodoProps> = ({ addTodoHandler }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredValue = inputRef.current!.value;

    addTodoHandler(enteredValue);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={inputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};

export default AddTodo;
