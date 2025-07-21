import './MainContent.scss';
import Header from '@/components/Header';
import {Outlet} from 'react-router-dom';

const MainContent = () => {
  return (
    <div className="main-content">
      <Header />
      <Outlet />
    </div>
  )
}

export default MainContent;