import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
    children: JSX.Element;
};

export const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  const authStatus = useAppSelector((state) => state.authStatus);

  return (
    authStatus === AuthStatus.Auth ? props.children : < Navigate to={AppRoute.SignIn} />
  );
};
