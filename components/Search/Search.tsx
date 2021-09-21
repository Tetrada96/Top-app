import { SearchProps } from './Search.Props';
import styles from './Search.module.css';
import cn from 'classnames';
import React, { useState, KeyboardEvent } from 'react';
import { Button, Input } from '..';
import SearchIcon from './search.svg';
import { useRouter } from 'next/dist/client/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key == 'Enter') {
            goToSearch();
        }
    };

    return (
        <form className={cn(className, styles.search)} {...props} role='search'>
            <Input
                className={styles.input}
                placeholder='Поиск...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button
                aria-label="Искать по сайту"
                appearance='primary'
                className={styles.button}
                onClick={goToSearch}
            >
                <SearchIcon />
            </Button>
        </form>
    );
};