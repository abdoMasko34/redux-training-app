import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../ui/todo_modal";
import Todo from "./todo_components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodos,
  selectTodosLoaded,
} from "../../reducers/todos/todos_slice";
import { getTodosByIdAsync } from "../../reducers/todos/todos_actions";
const Todos = () => {
  const todos = useSelector(selectTodos);
  const loaded = useSelector(selectTodosLoaded);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    // if (!loaded) {
    dispatch(
      getTodosByIdAsync(
        userId,
        () => {},
        (err) => {
          alert(err.message);
        }
      )
    );
    // }
  }, [userId, dispatch]);
  return (
    <div>
      <Modal
        modalIsOpen={modalIsOpen}
        id={null}
        userId={userId}
        onClose={() => setModalIsOpen(false)}
      />
      <h1>Todos</h1>
      <button
        className="btn   pull-right"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        create +
      </button>
      {todos.length > 0 && (
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
              todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Todos;
