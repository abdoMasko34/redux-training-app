import { Link } from "react-router-dom";
import NavLiLink from "./nav_li_link";
import { useSelector } from "react-redux";
import { selectUsersLength } from "../reducers/users/users_slice";
export default function Nav() {
  const usersLength = useSelector(selectUsersLength);
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to={"/"}>
            WebSiteName
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <NavLiLink to={"/"}>
              Users <span style={{ color: "#444" }}>{usersLength}</span>
            </NavLiLink>
            {/* <NavLiLink to={":userId"}>Todos</NavLiLink> */}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <NavLiLink to={"#"}>
              <i className="glyphicon glyphicon-user"></i> Sign Up
            </NavLiLink>
            <NavLiLink to={"#"}>
              <i className="glyphicon glyphicon-log-in"></i> Login
            </NavLiLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}
