import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ Component }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("quizzieToken")
  );

  return <div>{isLoggedIn ? <Component /> : <Navigate to="/" />}</div>;
}

export default ProtectedRoute;
