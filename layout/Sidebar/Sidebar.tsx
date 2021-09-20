import React from 'react';
import { Menu } from '../Menu/Menu';
import { SidebarProps } from './Sidebar.Props';
import Logo from '../logo.svg';
import styles from './Sidebar.module.scss';
import cn from 'classnames';
import { Search } from '../../components';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    return (
        <div className={cn(className, styles.sidebar)} {...props}>
            <Logo className={styles.logo} />
            <Search />
            <Menu />
        </div>
    );
};