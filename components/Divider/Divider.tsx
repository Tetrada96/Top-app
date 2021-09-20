import { DividerProps } from './Divider.Props';
import styles from './Divider.module.scss';
import cn from 'classnames';

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
    return (
        <hr className={cn(className, styles.hr)} {...props} />
    );
};