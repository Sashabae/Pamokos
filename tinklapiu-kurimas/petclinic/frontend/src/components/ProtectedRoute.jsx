import { Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/" replace />;
}
