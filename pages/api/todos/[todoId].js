import todos from "../../../database/todos";

export default function handler(req, res) {
  const { todoId } = req.query;
  console.log(req.query);

  const todo = todos.find((todo) => todo.id === parseInt(todoId));

  if (todo) {
    if (req.method === "GET") {
      res.status(200).json(todo);
    } else if (req.method === "DELETE") {
      const index = todos.findIndex((todo) => todo.id === parseInt(todoId));
      todos.splice(index, 1);
      res.status(200).json(todo);
    }
  } else {
    res.status(404).json("not found todo");
  }
}
