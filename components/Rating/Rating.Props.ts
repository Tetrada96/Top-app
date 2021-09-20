import { HTMLAttributes, DetailedHTMLProps } from "react";
import { FieldError } from "react-hook-form";

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isEnabled?: boolean
    rating: number
    setRating?: (rating: number) => void
    error?: FieldError
}
