import { RequestHandler } from "express";

import Todo from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, response, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  response.status(200).json({ message: "created!" });
};

export const getTodos: RequestHandler = (req, response, next) => {
  response.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (
  req,
  response,
  next
) => {
  const todoId = req.params.id;
  const text = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((t) => t.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Unable to find todo!");
  } else {
    TODOS[todoIndex].text = text;

    response.status(200).json({ todo: TODOS[todoIndex] });
  }
};

export const deleteTodo: RequestHandler<{ id: string }> = (
  req,
  response,
  next
) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((t) => t.id === todoId);

  TODOS.splice(todoIndex, 1);

  response.status(200).json({ message: "Todo deleted" });
};
