import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    fontsize?: 's' | 'm' | 'l';
    children: ReactNode;

}