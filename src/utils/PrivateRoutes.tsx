import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import ERoutes from '../routes';

function PrivateRoutes() {
  const { token } = useAppSelector((selector) => selector.user);

  return token ? <Outlet /> : <Navigate to={ERoutes.SIGN_IN} />;
}

export default PrivateRoutes;
