import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.scss';
// import cn from 'classnames';
import React from 'react';
import PlusIcon from './Plus.svg';

// export const priceRu = (price: number): string => {
//     return new Intl.NumberFormat('ru-RU', {
//         style: 'currency',
//         currency: 'RUB',
//         currencyDisplay: 'symbol',
//         maximumFractionDigits: 0,
//         minimumFractionDigits: 0,
//     }).format(price);
// };

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
    return (
        <>
            {advantages.map(a => (
                <div key={a._id} className={styles.advantage}>
                    <PlusIcon />
                    <div className={styles.title}>{a.title}</div>
                    <hr className={styles.vline} />
                    <div>{a.description}</div>

                </div>


            ))}
        </>
    );
};


