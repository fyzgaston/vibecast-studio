import './Search.scss';
import classNames from 'classnames';
import { Icon } from '@/shared/ui/Icon';
import {useIsMobile} from '@/shared/lib/useIsMobile';

interface SearchProps {
  className?: string;
  value: string,
  onChange: ((value: string) => void),
}

const Search = (props: SearchProps) => {
  const { value, onChange, className } = props;
  const isMobile = useIsMobile();

  return (
    <div className={classNames('search', className)}>
      <Icon
        name="search"
        className="search__icon"
        height={24}
        width={24}
        iconMode='hover-none'
      />
      <input
        className='search__input'
        id='search-input'
        type='text'
        placeholder={isMobile ? '' : 'Что будем искать?'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Search;