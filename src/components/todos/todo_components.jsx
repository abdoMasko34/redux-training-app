import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteUserAsync,
  toggleStatusAsync,
  getEditedTodoAsync,
} from "../../reducers/todos/todos_actions";

import Modal from "../ui/todo_modal";
const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleEdit = () => {
    dispatch(
      getEditedTodoAsync(
        todo.id,
        () => {},
        () => {}
      )
    );
    setModalIsOpen(true);
  };
  // console.log(todo.user_id);
  return (
    <tr key={todo.id}>
      <td>{todo.title}</td>
      <td>
        {todo.status === "completed" ? (
          <span
            className="material-symbols-outlined"
            style={{ color: "grey", cursor: "pointer", fontSize: "26px" }}
            onClick={() => {
              dispatch(
                toggleStatusAsync(
                  { ...todo, status: "pending" },
                  () => {},
                  (err) => {
                    console.log(err.message);
                  }
                )
              );
            }}
          >
            toggle_on
          </span>
        ) : (
          <span
            className="material-symbols-outlined"
            style={{ color: "green", cursor: "pointer", fontSize: "26px" }}
            onClick={() => {
              dispatch(
                toggleStatusAsync(
                  { ...todo, status: "completed" },
                  () => {},
                  (err) => {
                    console.log(err.message);
                  }
                )
              );
            }}
          >
            toggle_off
          </span>
        )}
      </td>
      <td>{new Date(todo.due_on).toLocaleString()}</td>
      <td>
        <span
          className="material-symbols-outlined"
          onClick={handleEdit}
          style={{ cursor: "pointer" }}
        >
          edit_square
        </span>
      </td>
      <td>
        <span
          className="material-symbols-outlined"
          style={{ color: "#f7758a", cursor: "pointer" }}
          onClick={() => {
            dispatch(
              deleteUserAsync(
                { id: todo.id },
                () => {},
                (err) => {
                  alert(err.message);
                }
              )
            );
          }}
        >
          delete
        </span>
      </td>
      <td>
        <Modal
          id={todo.id}
          modalIsOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      </td>
    </tr>
  );
};

export default Todo;
