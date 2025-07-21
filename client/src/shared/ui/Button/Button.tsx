import './Button.scss';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon, type IconName } from '@/shared/ui/Icon';

type ButtonProps = {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string; // для Link
  target?: string;
  /**
   * '' (default)
   */
  mode?: '' | 'default' | 'transparent' | 'orange-01-bg' | 'disabled' | 'text-mini'| 'gray-05-text' | string;
  label?: string | React.ReactNode;
  isLabelHidden?: boolean;
  iconName?: IconName | '';
  /**
   * 'before' / 'after'
   */
  iconPosition?: 'before' | 'after';
  hasFillIcon?: boolean;
  extraAttrs?: React.HTMLAttributes<HTMLElement>;

  width?: number;
  height?: number;
  /**
   * '' (default) / 'transparent' / 'orange-01' / 'gray-05' / 'hover-none'
   */
  iconMode?: '' | 'orange-01' | 'gray-05' | 'hover-none' | string;
  isNavLink?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const Button = (props: ButtonProps) => {
  const {
    className,
    type,
    href,
    target,
    mode = '',
    label,
    isLabelHidden = false,
    iconName,
    iconPosition = 'before',
    hasFillIcon,
    extraAttrs,
    width,
    height,
    iconMode = '',
    isNavLink = false,
    onClick,
  } = props

  const isLink = Boolean(href);
  const Component = (isNavLink ? NavLink : isLink ? Link : 'button') as React.ElementType;
  const specificProps = isLink ? { to: href, target } : { type };

  const iconComponent = iconName && (
    <Icon
      className="button__icon"
      name={iconName}
      hasFill={hasFillIcon}
      width={width}
      height={height}
      iconMode={iconMode}
    />
  );

  return (
    <Component
      className={classNames(
        'button',
        className,
        ...(mode?.split(' ').map(mode => `button--${mode}`))
        )}

      aria-label={isLabelHidden ? String(label) : undefined}
      {...specificProps}
      {...extraAttrs}
      onClick={onClick}
    >
      {iconPosition === 'before' && iconComponent}
      {!isLabelHidden && <span className="button__label">{label}</span>}
      {iconPosition === 'after' && iconComponent}
    </Component>
  );
}

export default Button;