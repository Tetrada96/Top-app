import { TagProps } from './Tag.Props';
import styles from './Tag.module.scss';
import cn from 'classnames';

export const Tag = ({ fontsize = 'm', color = 'ghost', href, children, className, ...props }: TagProps): JSX.Element => {
    return (
        <div
            className={cn(styles.tag, className, {
                [styles.s]: fontsize == 's',
                [styles.m]: fontsize == 'm',
                [styles.red]: color == 'red',
                [styles.ghost]: color == 'ghost',
                [styles.grey]: color == 'grey',
                [styles.green]: color == 'green',
                [styles.primary]: color == 'primary',
            })}
            {...props}
        >
            {
                href
                    ? <a href={href}>{children}</a>
                    : <>{children}</>
            }

        </div>
    );
};