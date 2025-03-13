import React from "react";
import LogOutBtn from '../Header/LogOutBtn';
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Container, Logo } from "../..";

function Header() {
  const AuthStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !AuthStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !AuthStatus,
    },
    {
      name: "Posts",
      slug: "/posts",
      active: AuthStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: AuthStatus,
    },
  ];

  return (
    <header>
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px"/>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {AuthStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;