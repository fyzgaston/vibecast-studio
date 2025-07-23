import './Logo.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => (
  <Link
    to="/"
    className={classNames('logo', className)}
    aria-label="На главную"
  >
    <img
      className='logo__icon-arrow'
      src={`${import.meta.env.BASE_URL}logo-arrow.svg`}
      alt="Логотип"
      width={33}
      height={28}
    />
    <img
      className='logo__icon-text'
      src={`${import.meta.env.BASE_URL}logo-text.svg`}
      alt="Логотип"
      width={143}
      height={30}
    />
  </Link>
);

export default Logo;