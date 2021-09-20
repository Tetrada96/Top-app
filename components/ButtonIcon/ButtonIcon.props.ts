import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import menu from './menu.svg';
import close from './close.svg';
import up from './up.svg';

export const icons = {
    menu,
    close,
    up
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: IconName;
    appearance: 'primary' | 'white';

}