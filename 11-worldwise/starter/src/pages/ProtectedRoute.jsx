import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect to the login page
      navigate("/", { replace: true });
      
    }
  }, [isAuthenticated, navigate]);
  
  return isAuthenticated ? children:null;
}

export default ProtectedRoute;