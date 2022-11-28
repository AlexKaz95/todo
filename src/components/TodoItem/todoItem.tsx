import React, { MouseEventHandler, useState } from "react";
import { Button } from "../Button/button";
import styles from "./todoItem.module.css";

interface ITodoItemProps {
    todo: ITodoItem,
    markDone: Function,
    forget: Function,
    archiveTodo: Function,
    onDragStart: Function
    onDragEnd: Function
    onDragOver: Function
    order: number
}

export const TodoItem: React.FC<ITodoItemProps> = function({ todo, markDone, forget, archiveTodo, onDragStart, onDragEnd, onDragOver, order }){
    const [selected, setSelected] = useState(false);

    const markDoneWrapper: MouseEventHandler = function( e ){
        e.preventDefault();
        markDone( todo.id );
    }

    const forgetWrapper: MouseEventHandler = function( e ){
        e.preventDefault();
        forget(todo);
    }

    const archiveTodoWrapper: MouseEventHandler = function( e ){
        e.preventDefault();
        archiveTodo(todo.id);
    }

    const onDragStartWrapper: MouseEventHandler = function( e ){
        setSelected(true);
        onDragStart(todo.id);
    }

    const onDragEndWrapper: MouseEventHandler = function( e ){
        setSelected(false);
        onDragEnd();
    }

    const onDragOverWrapper: MouseEventHandler = function( e ){
        e.preventDefault();
        onDragOver( todo.id, order );
    }

    return <div 
            className={`${styles.container} 
            ${styles[selected ? 'selected' : '']}`} 
            onDragEnd={onDragEndWrapper} 
            onDragStart={onDragStartWrapper} 
            onDragOver={onDragOverWrapper} 
            draggable
    >
        <div className={`${styles.title} ${todo.done && styles.title_done}`}>{todo.title}</div>
        <div className={styles.actionField}>
            { !todo.done && <Button text='Забить' callback={ forgetWrapper } order='second'/> } 
            { !todo.done && <Button text='СДЕРЖАЛ' callback={ markDoneWrapper } order='main' color="green"/> }
            { todo.done && <Button text='Архивировать' callback={ archiveTodoWrapper } order='main' color="default"/> }
        </div>
    </div>
}