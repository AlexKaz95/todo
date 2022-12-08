import React, { MouseEventHandler } from "react";
import styles from "./button.module.scss";

interface IButtonProps{
    text: string,
    callback: MouseEventHandler,
    type: 'main' | 'second',
    color?: 'default' | 'green' | 'red',
    tabIndex?: number
}

export const Button: React.FC<IButtonProps> = function({ text, callback, type = 'main', color = 'default', tabIndex = -1 }){
    const className = `${styles[`${type}`]} ${styles[`${type}_${color}`]}`

    return <div className={className} onClick={callback} tabIndex={tabIndex} >
        {text}
    </div>
}