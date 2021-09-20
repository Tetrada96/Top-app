import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    fontsize?: 's' | 'm';
    children: ReactNode;
    color?: 'ghost' | 'grey' | 'green' | 'red' | 'primary';
    href?: string
}