import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../ui/user_modal";
import { useDispatch } from "react-redux";
import {
  deleteUserAsync,
  getEditUserAsync,
  toggleStatusAsync,
} from "../../reducers/users/user_actions";

const User = ({ user, setErrorMessage }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleEdit = () => {
    dispatch(
      getEditUserAsync(
        user.id,
        () => {},
        (err) => {
          console.log(err.message);
        }
      )
    );
    setModalIsOpen(true);
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        {user.status === "active" ? (
          <span
            className="material-symbols-outlined"
            style={{ color: "grey", cursor: "pointer", fontSize: "26px" }}
            onClick={() => {
              dispatch(
                toggleStatusAsync(
                  { ...user, status: "inactive" },
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
                  { ...user, status: "active" },
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
      <td>
        <Link to={`${user.id}/todos`}>
          <span
            className="material-symbols-outlined"
            style={{ color: "#008080", cursor: "pointer" }}
          >
            checklist
          </span>
        </Link>
      </td>
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
                user.id,
                () => {},
                (err) => {
                  setErrorMessage(err.message);
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
          id={user.id}
          modalIsOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          modalType="users"
        />
      </td>
    </tr>
  );
};

export default User;
