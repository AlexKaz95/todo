import React, { MouseEventHandler, useState, useEffect, FC } from "react";
import { TodoItem } from "../TodoItem/todoItem";
import styles from './todoPanel.module.css';

interface ITodosPanelProps {
    todos: ITodoItem[],
    markDone: Function,
    forget: Function,
    archiveTodo: Function,
    changeOrder: Function
}

export const TodoPanel: FC<ITodosPanelProps> = function({ todos, markDone, forget, archiveTodo, changeOrder }){
    const [selected, setSelected] = useState<ITodoItem>();

    const onDragStart = function( id: number ){
        setSelected(todos.find(todo => todo.id === id))
    }

    const onDragEnd = function(){
        setSelected(undefined);
    }

    const onDragOver = function( id: number, order: number ){
        const isMovable = selected && selected.id !== id;
        console.log('movable', isMovable)
        if (isMovable) {
            changeOrder(order, selected);
        }
    }

    if (todos.length) {
        return <div className={styles.todoPanel_container}>
            { todos.map( (el: ITodoItem, index: number) => <TodoItem 
                todo={el} 
                order={index}
                markDone={markDone} 
                forget={forget} 
                key={el.id} 
                archiveTodo={archiveTodo} 
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            />) }
        </div>
    } else {
        return <></>
    }
} 