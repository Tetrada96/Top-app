import { RatingProps } from './Rating.Props';
import styles from './Rating.module.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import StarIcon from './star.svg';
import { KeyboardEvent } from 'react';



export const Rating = forwardRef(({ isEnabled = false, rating, setRating, tabIndex, error, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        constructorRating(rating);
    }, [rating, tabIndex]);


    const computeFocus = (r: number, i: number): number => {
        if (!isEnabled) {
            return -1;
        }
        if (!rating && i == 0) {
            return tabIndex ?? 0;
        }
        if (r + 1) {
            return tabIndex ?? 0;
        }
        return -1;
    };

    const constructorRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span
                    role={isEnabled ? 'slider' : ''}
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.enable]: isEnabled
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    tabIndex={computeFocus(rating, i)}
                    onKeyDown={handleKey}
                    ref={r => ratingArrayRef.current?.push(r)}
                    aria-valuenow={rating}
                    aria-invalid={error ? true : false}
                    aria-valuemax={5}
                    aria-valuemin={1}
                    aria-label={isEnabled ? "Укажите рейтинг с помощью стрелок" : ('Рейтинг' + rating)}
                >
                    <StarIcon
                    />
                </span>
            );
        });
        setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
        if (!isEnabled) {
            return;
        }
        constructorRating(i);
    };

    const onClick = (i: number) => {
        if (!isEnabled || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
        if (!isEnabled || !setRating) {
            return;
        }
        if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
            if (!rating) {
                setRating(1);
            } else {
                e.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }
        if (e.code == 'ArrowDown' || e.code == 'ArrowLeft') {
            e.preventDefault();
            setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
        }

    };


    return (
        <div ref={ref} {...props} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
            {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}

        </div>
    );
});