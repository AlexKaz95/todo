import React, { MouseEventHandler, useState, useEffect, FC } from "react";
import { TodoItem } from "../TodoItem/todoItem";
import styles from './todoPanel.module.css';

interface ITodosPanelProps {
    todos: ITodoItem[],
    markDone: Function,
    forget: Function,
}

export const TodoPanel: FC<ITodosPanelProps> = function({ todos, markDone, forget }){
    if (todos.length) {
        return <div className={styles.todoPanel_container}>
            { todos.map( (el: ITodoItem) => <TodoItem todo={el} markDone={markDone} forget={forget} key={el.id}/>) }
        </div>
    } else {
        return <></>
    }
} 