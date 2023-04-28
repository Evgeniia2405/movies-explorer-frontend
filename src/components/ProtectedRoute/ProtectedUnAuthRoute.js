import { Navigate } from "react-router-dom";

const ProtectedUnAuthRoute = ({ component: Component, ...props }) => {
  return props.loggedIn === true ? (
    <Component {...props} />
  ) : (
    <Navigate to={!props.loggedIn ? props.pathRedirect : "/"} replace />
  );
};

export default ProtectedUnAuthRoute;
