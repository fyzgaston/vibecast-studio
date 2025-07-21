import './UserMenu.scss';
import { useNavigate } from 'react-router-dom';
import Profile from '@/components/Profile';
import Button from '@/shared/ui/Button';
import {clearUserData} from '@/shared/lib/storage.ts';
import classNames from 'classnames';
import {useIsMobile} from '@/shared/lib/useIsMobile.ts';

type UserMenuProps = {
  className?: string;
}

const UserMenu = ({className}: UserMenuProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    clearUserData()
    navigate('/auth');
  }

  return (
    <div className={classNames("user-menu", className)}>
      <Profile/>
      <Button
        className='user-menu__icon'
        iconName='userMenuArrow'
        type='button'
        label={isMobile ? '' : 'Выйти'}
        height={16}
        width={16}
        iconPosition='after'
        mode='transparent text-mini gray-05-text'
        onClick={handleLogout}
      />
    </div>
  )
}

export default UserMenu;