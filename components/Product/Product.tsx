import { ProductProps } from './Product.Props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from '..';
import React, { forwardRef, useRef, useState, ForwardedRef } from 'react';
import { declofNum, priceRu } from '../../helpers/helpers';
// import Image from 'next/image';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 }
    };

    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.focus();
        reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    };

    return (
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <img
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    >

                    </img>
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span><span className="visualyHidden">Цена</span>{priceRu(product.price)}</span>
                    {product.oldPrice != 0 && <Tag className={styles.oldPrice} color='green'> <span className="visualyHidden">Скидка</span> {priceRu(product.price - product.oldPrice)}</Tag>}
                </div>

                <div className={styles.credit}>
                    <span className="visualyHidden">Кредит</span> {priceRu(product.credit)}/
                    <span className={styles.month}>мес</span>
                </div>
                <div className={styles.rating}>
                    <span className="visualyHidden">{'Рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating} />
                </div>
                <div className={styles.tags}>{product.categories.map(c => <Tag className={styles.categories} key={c} color='ghost'>{c}</Tag>)}</div>
                <div className={styles.priceTitle} aria-hidden={true}>цена</div>
                <div className={styles.creditTitle} aria-hidden={true} >кредит</div>
                <div className={styles.rateTitle}>
                    <a href='#ref' onClick={scrollToReview}>{product.reviewCount} {declofNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
                </div>
                <Divider className={styles.hr} />
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div className={styles.characteristics} key={c.name}>
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && <div className={styles.advantages}>
                        <div className={styles.advTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>
                <Divider className={cn(styles.hr, styles.hr2)} />
                <div className={styles.actions}>
                    <Button appearance='primary'>Узнать подробнее</Button>
                    <Button
                        aria-expanded={isReviewOpened}
                        className={styles.reviewButton}
                        appearance='ghost'
                        arrow={isReviewOpened ? 'down' : 'right'}
                        onClick={() => setIsReviewOpened(!isReviewOpened)}>
                        Читать отзывы
                    </Button>
                </div>
            </Card>
            <motion.div
                variants={variants}
                initial={'hidden'}
                animate={isReviewOpened ? 'visible' : 'hidden'}
            >
                <Card color='blue' className={cn(styles.reviews, {
                    [styles.open]: isReviewOpened,
                    [styles.close]: !isReviewOpened
                })}
                    ref={reviewRef}
                    tabIndex={isReviewOpened ? 0 : -1}
                >
                    {product.reviews.map(r => (
                        <div key={r._id}>
                            <Review

                                review={r} />
                            <Divider />
                        </div>
                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened} />
                </Card>

            </motion.div>

        </div>
    );
}));
