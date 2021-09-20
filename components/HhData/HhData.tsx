import { HhDataProps } from './HhData.props';
import styles from './HhData.module.scss';
// import cn from 'classnames';
import React from 'react';
import { Card } from '../index';
import RateIcon from './rate.svg';
import { priceRu } from '../../helpers/helpers';

// export const priceRu = (price: number): string => {
//     return new Intl.NumberFormat('ru-RU', {
//         style: 'currency',
//         currency: 'RUB',
//         currencyDisplay: 'symbol',
//         maximumFractionDigits: 0,
//         minimumFractionDigits: 0,
//     }).format(price);
// };

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {

    return (
        <div className={styles.hh}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles.countValue}>{count}</div>
            </Card>
            <Card className={styles.salary}>
                <div>
                    <div className={styles.title}>Начальный</div>
                    <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.filled} />
                        <RateIcon />
                        <RateIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Средний</div>
                    <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.filled} />
                        <RateIcon className={styles.filled} />
                        <RateIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Профессионал</div>
                    <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.filled} />
                        <RateIcon className={styles.filled} />
                        <RateIcon className={styles.filled} />
                    </div>
                </div>
            </Card>
        </div>

    );
};

