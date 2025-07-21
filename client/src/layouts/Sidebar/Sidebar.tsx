import './Sidebar.scss';
import classNames from 'classnames';
import Button from '@/shared/ui/Button';
import Logo from '@/components/Logo';
import {NavLink} from 'react-router-dom';
import {useIsMobile} from '@/shared/lib/useIsMobile.ts';

const Sidebar = () => {
  const isMobile = useIsMobile();

  return (
    <div className="sidebar">
      <div className='sidebar__logo-wrapper'>
        <Logo />
      </div>
      <div className='sidebar__menu'>
        <NavLink
          to='/favorites'
          end
          className={({ isActive }) =>
            classNames('sidebar__menu-link', { 'sidebar__menu-link--active': isActive })
          }
        >
          <Button
            iconName={!isMobile ? 'musicNote' : ''}
            label='Избранное'
            mode='transparent'
            iconMode='orange-01 hover-none'
            iconPosition='before'
            width={32}
            height={32}
            type='button'
          />
        </NavLink>
        <NavLink
          to='/tracks'
          end
          className={({ isActive }) =>
            classNames('sidebar__menu-link', { 'sidebar__menu-link--active': isActive })
          }
        >
          <Button
            iconName={!isMobile ? 'musicNote' : 'smallPlay'}
            label='Аудиокомпозиции'
            mode='transparent'
            iconMode='orange-01 hover-none'
            iconPosition='before'
            width={32}
            height={32}
            type='button'
          />
        </NavLink>


      </div>
    </div>
  )
}

export default Sidebar;