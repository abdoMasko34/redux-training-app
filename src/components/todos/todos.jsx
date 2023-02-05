import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsersAsync,
  selectTodos,
  selectTodosLoaded,
} from "../../reducers/todos/task_slice";
const Todos = () => {
  const todos = useSelector(selectTodos);
  const loaded = useSelector(selectTodosLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadUsersAsync());
    }
  }, [loaded, dispatch]);
  return (
    <div>
      <h1>Todos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>date</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {todos &&
            todos.length > 0 &&
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.status}</td>
                <td>{todo.due_on}</td>
                {/* <td>
                  <Link to={`/edit-create-user/${user.id}`}>
                    <i className="glyphicon glyphicon-edit"></i>
                  </Link>
                </td> */}
                {/* <td>
                  <Link
                    to={""}
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    <i className="glyphicon glyphicon-trash"></i>
                  </Link>
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todos;
