import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import React from "react";
// import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Todos from "./components/todos/todos";
import Users from "./components/users/users";
import Login from "./components/login/login";
import { useSelector } from "react-redux";
import { roleSelector } from "./reducers/auth_slice";
import { useEffect } from "react";
// const App = () => {
//   return (
//     <Routes>
//       <Route path={"/"} element={<Layout />}>
//         <Route index element={<Users />}></Route>
//         <Route path={":userId/todos"} element={<Todos />}></Route>
//       </Route>
//     </Routes>
//   );
// };

// export default App;

export default function AppRouter() {
  const roles = useSelector(roleSelector); // redux selector
  useEffect(() => {
    console.log(roles);
  }, []);
  return <CreateRoutes roles={roles} />;
}

function CreateRoutes(props) {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Users />,
        },

        ...(props.roles.includes("admin")
          ? [
              {
                path: "/:userId/todos",
                element: <Todos />,
              },
            ]
          : []),
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
