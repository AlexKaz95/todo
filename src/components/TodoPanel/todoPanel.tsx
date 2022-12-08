import React, { useState, FC } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CategoryTabs } from "../CategoryTabs/categoryTabs";
import { TodoItem } from "../TodoItem/todoItem";
import styles from './todoPanel.module.scss';
import { TodoPanelPlug } from "./todoPanelPlug";

interface ITodosPanelProps {
    todos: ITodoItem[],
    markDone: Function,
    forget: Function,
    archiveTodo: Function,
    changeOrder: Function
    categories: TOption[]
}

export const TodoPanel: FC<ITodosPanelProps> = function({ todos,  categories, markDone, forget, archiveTodo, changeOrder }){
    const [selected, setSelected] = useState<ITodoItem>();
    const [params, setSearchParams] = useSearchParams();

    const onDragStart = function( id: number ){
        setSelected(todos.find(todo => todo.id === id))
    }

    const onDragEnd = function(){
        setSelected(undefined);
    }

    const onDragOver = function( id: number, order: number ){
        const isMovable = selected && selected.id !== id;
        if (isMovable) {
            changeOrder(order, selected);
            return;
        }
    }

    const filteredTodos = todos.filter( (el: ITodoItem, indx: number ) => {
        el.order = indx;
        return (el.status === 'done' || el.status === 'progress' ) && ( el.category === params.get('catId') )
    })    

    if (filteredTodos.length) {
        return <>
        <CategoryTabs categories={categories}/>
        <div className={styles.todoPanel_container}>
            { filteredTodos.map( (el: ITodoItem ) => <TodoItem 
                todo={el} 
                order={el.order!}
                markDone={markDone} 
                forget={forget} 
                key={el.id} 
                archiveTodo={archiveTodo} 
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            />) }
        </div>
        </>
    } else {
        return <>
        <CategoryTabs categories={categories}/>
        <TodoPanelPlug/>
        </>
    }
} 