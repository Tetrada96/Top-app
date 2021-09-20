import { PProps } from './P.Props';
import styles from './P.module.scss';
import cn from 'classnames';

export const P = ({ fontsize = 'm', children, className, ...props }: PProps): JSX.Element => {
    return (
        <p
            className={cn(styles.p, className, {
                [styles.s]: fontsize == 's',
                [styles.m]: fontsize == 'm',
                [styles.l]: fontsize == 'l'
            })}
            {...props}
        >

            {children}
        </p>
    );
};