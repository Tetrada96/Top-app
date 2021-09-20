import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.scss';
import cn from 'classnames';
// import { format } from 'date-fns';
// import { ru } from 'date-fns/locale';
import { Button, Input, Rating, TextArea } from '..';
import ClosedIcon from './closed.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, reset, formState: { errors }, clearErrors } = useForm<IReviewForm>();
    const [isSuccessSent, setIsSuccessSent] = useState<boolean>(false);

    const [error, setError] = useState<string>();


    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
            if (data.message) {
                setIsSuccessSent(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e: any) {
            setError(e.message);
        }


    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    placeholder='Имя'
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.name ? true : false}
                />
                <Input
                    placeholder='Заголовок отзыва' className={styles.title}
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.title ? true : false}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name='rating'
                        rules={{ required: { value: true, message: 'Выберете оценку' } }}
                        render={({ field }) => (
                            <Rating
                                ref={field.ref}
                                rating={field.value}
                                isEnabled
                                setRating={field.onChange}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1} />
                        )}
                    />
                </div>
                <TextArea
                    placeholder='Текст отзыва'
                    className={styles.description}
                    {...register('description', { required: { value: true, message: 'Введите текст отзыва' } })}
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    area-label='Текст отзыва'
                    aria-invalid={errors.description ? true : false}
                />
                <div className={styles.submit}>
                    <Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccessSent && <div role='alert' className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки
                </div>
                <button
                    className={styles.closed}
                    onClick={() => setIsSuccessSent(false)}
                    onKeyDown={() => setIsSuccessSent(false)}
                    aria-label="Закрыть оповещение"
                >
                    <ClosedIcon />
                </button>

            </div>}
            {error && <div role='alert' className={cn(styles.error, styles.panel)}>
                Что-то пошло не так, попробуйте обновить страницу
                <button
                    className={styles.closed}
                    onClick={() => setError(undefined)}
                    onKeyDown={() => setError(undefined)}
                    aria-label="Закрыть оповещение">

                    <ClosedIcon />
                </button>

            </div>}
        </form>
    );
};