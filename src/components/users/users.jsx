import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsers,
  selectUsersLoaded,
  loadUsersAsync,
} from "../../reducers/users/users_slice";
const Users = () => {
  const users = useSelector(selectUsers);
  const loaded = useSelector(selectUsersLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadUsersAsync());
    }
  }, [loaded, dispatch]);

  //   const [errorMessage, setErrorMessage] = useState(null);
  return (
    <div>
      <h1>Users</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status </th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
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

export default Users;
