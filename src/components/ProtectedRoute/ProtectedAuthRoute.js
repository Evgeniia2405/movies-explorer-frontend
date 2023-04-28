import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ component: Component, ...props }) => {
  return props.loggedIn === false ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace/>
  );
};

export default ProtectedAuthRoute;
