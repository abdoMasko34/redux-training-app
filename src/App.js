import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Todos from "./components/todos/todos";
import Users from "./components/users/users";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Users />}></Route>
        <Route path={":userId/todos"} element={<Todos />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
