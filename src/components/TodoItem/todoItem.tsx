import React, { MouseEventHandler } from "react";
import { Button } from "../Button/button";
import styles from "./todoItem.module.css";



interface ITodoItemProps {
    todo: ITodoItem,
    markDone: Function,
    forget: Function
}

export const TodoItem: React.FC<ITodoItemProps> = function({ todo, markDone, forget }){

    const markDoneWrapper: MouseEventHandler = function( e ){
        e.preventDefault();
        markDone( todo.id );
    }

    const forgetWrapper: MouseEventHandler = function( e ){
        e.preventDefault();
        forget(todo);
    }

    return <div className={styles.container}>
        <div className={styles.title}>{todo.title}</div>
        <div className={styles.actionField}>
            <Button text='Забить' callback={ forgetWrapper } order='second'/>
            <Button text='СДЕРЖАЛ' callback={ markDoneWrapper } order='main' color="green"/>
        </div>
    </div>
}