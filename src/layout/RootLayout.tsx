import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="static">
      <Navbar />
      <div className="~top-12/36 absolute px-4">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout