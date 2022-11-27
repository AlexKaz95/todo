import React, { MouseEventHandler } from "react";
import styles from "./button.module.css";

interface IButtonProps{
    text: string,
    callback: MouseEventHandler,
    order: 'main' | 'second',
    color?: 'default' | 'green' | 'red',
    tabIndex?: number
}

export const Button: React.FC<IButtonProps> = function({ text, callback, order= 'main', color = 'default', tabIndex = -1 }){
    const className = `${styles[`${order}`]} ${styles[`${order}_${color}`]}`

    return <div className={className} onClick={callback} tabIndex={tabIndex} >
        {text}
    </div>
}