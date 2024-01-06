import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Outlet } from "react-router-dom";

export default function RestrictedRoutes() {
  const [authuser, setAuthUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });

    return () => checkLoggedIn();
  }, []); // run the effect once on load

  if (authuser === null) {
    return null;
  } else {
    return <Outlet />;
  } // here because when you click the login button authuser is still null
}
