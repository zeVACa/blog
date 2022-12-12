import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

function PrivateRoutes() {
  const { token } = useAppSelector((selector) => selector.user);

  return token ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoutes;
