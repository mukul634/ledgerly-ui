
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // We've removed the authentication check since we always want to allow access
  return <Outlet />;
};

export default ProtectedRoute;
