import { Navigate } from "react-router-dom";

const ProtectedUnAuthRoute = ({ component: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={!props.loggedIn ? props.pathRedirect : "/"} />
  );
};

export default ProtectedUnAuthRoute;
