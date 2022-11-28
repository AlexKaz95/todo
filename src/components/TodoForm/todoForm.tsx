import React, { ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler, useState } from "react"
import { Button } from "../Button/button";
import styles from './todoForm.module.css';

interface ITodoForm {
    createTodo: Function
}

export const TodoForm: FC<ITodoForm> = function({ createTodo }){
    const DEFAULT_TODO = {
        title: '',
        status: 'progress',
        done: false
    };

    const [todo, setTodo] = useState(DEFAULT_TODO);

    const onChange: ChangeEventHandler = function( e: ChangeEvent<HTMLInputElement> ){
        e.preventDefault();
        const { id, value } = e.target;
        setTodo({ ...todo, [id]: value });
    }

    const createTodoWrapper: MouseEventHandler = function( e ){
        e.preventDefault();
        createTodo( todo );
        setTodo(DEFAULT_TODO);
    }

    const enterDown: KeyboardEventHandler = function(e){
        if (e.key === 'Enter'){
            createTodo( todo );
            setTodo(DEFAULT_TODO);
        }
    }

    return <div className={styles.form_container}>
        <input 
            className={styles.form_input} 
            tabIndex={0} 
            type="text" 
            value={todo.title} 
            name="title" 
            id="title" 
            onChange={onChange}
            autoComplete='off'
            placeholder="Я сделаю..."
            onKeyDown={enterDown}
        />
        <Button text='ОБЕЩАЮ' callback={ createTodoWrapper } tabIndex={0} color='green' order='main'/>
    </div>
}