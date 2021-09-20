import { ButtonIconProps, icons } from './ButtonIcon.props';
import styles from './ButtonIcon.module.scss';
import cn from 'classnames';


export const ButtonIcon = ({ icon, appearance, className, ...props }: ButtonIconProps): JSX.Element => {

    const IconComponent = icons[icon];

    return (
        <button
            className={cn(styles.button, className, {
                [styles.primary]: appearance == 'primary',
                [styles.white]: appearance == 'white'

            })}
            {...props}
        >
            <IconComponent />
        </button>
    );
};