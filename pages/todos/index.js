import axios from "axios";
import { useState } from "react";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const fetchTodos = async () => {
    const { data } = await axios.get("/api/todos");
    setTodos(data);
  };

  const handleAddTodo = async () => {
    const { data } = await axios.post(
      "/api/todos",
      { todo },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(data);
    fetchTodos();
  };
  const handleRemove = async (id) => {
    const { data } = await axios.delete(`/api/todos/${id}`);
    console.log(data);
    fetchTodos();
  };

  return (
    <>
      <input
        type={"text"}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit" onClick={handleAddTodo}>
        todo
      </button>
      <hr />
      <button onClick={fetchTodos}>Load Todos</button>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.id} - {todo.title}
            <button onClick={() => handleRemove(todo.id)}>remove</button>
          </div>
        );
      })}
    </>
  );
};

export default TodosPage;
