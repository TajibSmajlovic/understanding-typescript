export default interface ITodoList {
  todos: { id: string; text: string }[];
  deleteTodoHandler: (id: string) => void;
}
