import './Header.scss';
import Search from '../Search';
import { useSearchContext } from '@/shared/lib/SearchContext';
import UserMenu from '@/components/UserMenu';

const Header = () => {
  const { searchValue, setSearchValue } = useSearchContext();

  return (
    <header className="header">
      <Search value={searchValue} onChange={setSearchValue} className="header__search" />
      <UserMenu className="header__user-menu"/>
    </header>
  )
}

export default Header