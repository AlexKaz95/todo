import React, { FC } from "react";
import styles from './header.module.css'

interface IHeaderProps {
    todosCount: number
}

export const Header: FC<IHeaderProps> = ({ todosCount }) => {
    return <div className={styles.header_container}>
        <div className={styles.header_title}>А что делать?!</div>
        <div className={styles.header_count}>{todosCount} дел в списке! Вот что делать.</div>
    </div>
} 