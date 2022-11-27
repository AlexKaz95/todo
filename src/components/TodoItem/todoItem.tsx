import React, { MouseEventHandler, useState } from "react";
import { Button } from "../Button/button";
import styles from "./todoItem.module.css";



interface ITodoItemProps {
    todo: ITodoItem,
    markDone: Function,
    forget: Function,
    archiveTodo: Function
}

export const TodoItem: React.FC<ITodoItemProps> = function({ todo, markDone, forget, archiveTodo }){
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

    const onDragStart: MouseEventHandler = function( e ){
        setSelected(true);
        console.log('onDragStart');
    }

    const onDragEnd: MouseEventHandler = function( e ){
        setSelected(false);
        console.log('onDragEnd', e.pageX);
    }

    const onDragOver: MouseEventHandler = function( e ){
        e.preventDefault();
        console.log('onDragOver', e.pageX);
    }

    return <div className={`${styles.container} ${styles[selected ? 'selected' : '']}`} onDragEnd={onDragEnd} onDragStart={onDragStart} onDragOver={onDragOver} draggable>
        <div className={`${styles.title} ${todo.done && styles.title_done}`}>{todo.title}</div>
        <div className={styles.actionField}>
            { !todo.done && <Button text='Забить' callback={ forgetWrapper } order='second'/> } 
            { !todo.done && <Button text='СДЕРЖАЛ' callback={ markDoneWrapper } order='main' color="green"/> }
            { todo.done && <Button text='Архивировать' callback={ archiveTodoWrapper } order='main' color="default"/> }
        </div>
    </div>
}