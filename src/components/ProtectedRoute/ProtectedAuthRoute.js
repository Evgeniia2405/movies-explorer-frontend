import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ component: Component, ...props }) => {
  return props.loggedIn !== true ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace/>
  );
};

export default ProtectedAuthRoute;
