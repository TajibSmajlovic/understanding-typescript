"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const TODOS = [];
exports.createTodo = (req, response, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.default(Math.random().toString(), text);
    TODOS.push(newTodo);
    response.status(200).json({ message: "created!" });
};
exports.getTodos = (req, response, next) => {
    response.status(200).json({ todos: TODOS });
};
exports.updateTodo = (req, response, next) => {
    const todoId = req.params.id;
    const text = req.body.text;
    const todoIndex = TODOS.findIndex((t) => t.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Unable to find todo!");
    }
    else {
        TODOS[todoIndex].text = text;
        response.status(200).json({ todo: TODOS[todoIndex] });
    }
};
exports.deleteTodo = (req, response, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((t) => t.id === todoId);
    TODOS.splice(todoIndex, 1);
    response.status(200).json({ message: "Todo deleted" });
};
