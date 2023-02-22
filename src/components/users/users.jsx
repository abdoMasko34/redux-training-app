import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsers,
  selectUsersLoaded,
} from "../../reducers/users/users_slice";
import { loadUsersAsync } from "../../reducers/users/user_actions";
import ErrorModal from "../ui/error_modal";
import Modal from "../ui/user_modal";
import User from "./user_component";

const Users = () => {
  const users = useSelector(selectUsers);
  const loaded = useSelector(selectUsersLoaded);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(
        loadUsersAsync(
          () => {},
          (error) => {
            setErrorMessage(error.message);
            console.log(error);
          }
        )
      );
    }
  }, [loaded, dispatch]);

  return (
    <>
      <Modal
        modalIsOpen={modalIsOpen}
        id={null}
        onClose={() => setModalIsOpen(false)}
      />
      <h1>Users</h1>
      {errorMessage ? (
        <button
          className="btn btn-success"
          onClick={() => {
            dispatch(
              loadUsersAsync(
                () => {},
                (error) => {
                  setErrorMessage(error.message);
                  console.log(error);
                }
              )
            );
          }}
        >
          Refresh
        </button>
      ) : (
        <>
          <button
            className="btn   pull-right"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            create +
          </button>
          <ErrorModal errorMessage={errorMessage} />
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <User
                    key={user.id}
                    user={user}
                    setErrorMessage={setErrorMessage}
                  />
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Users;
