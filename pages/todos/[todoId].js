import axios from "axios";
import React from "react";
import todos from "../../database/todos";
const Todo = ({ todo }) => {
  return (
    <div>
      {todo.id}-{todo.title}
    </div>
  );
};

export default Todo;

export const getServerSideProps = async (ctx) => {
  const { params } = ctx;
  
  // const { data } = await axios.get(
  //   `http://localhost:3000/api/todos/${params.todoId}`
  // );

  const data = todos.find((todo) => todo.id === parseInt(params.todoId));

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      todo: data,
    },
  };
};
