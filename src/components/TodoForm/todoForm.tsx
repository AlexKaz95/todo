import React, { ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler, useState } from "react"
import { Button } from "../Button/button";
import { DropDownMenu } from "../DropDownMenu/dropDownMenu";
import styles from './todoForm.module.scss';

interface ITodoForm {
    createTodo: Function
    categories: TCategory[]
    createCategory: Function
}

export const TodoForm: FC<ITodoForm> = function({ createTodo, categories, createCategory }){
    const DEFAULT_TODO = {
        title: '',
        status: 'progress',
        done: false,
        category: 'all'
    };

    const [todo, setTodo] = useState(DEFAULT_TODO);
    const [notValidClass, setNotValidClass] = useState<string>('');

    const onChange: ChangeEventHandler = function( e: ChangeEvent<HTMLInputElement> ){
        e.preventDefault();
        setNotValidClass('');
        const { id, value } = e.target;
        setTodo({ ...todo, [id]: value });
    }

    const createTodoWrapper: MouseEventHandler = function( e ){
        e.preventDefault();
        if (isValid(todo)) {
            createTodo( todo );
            setTodo(DEFAULT_TODO);
        } else {
            setNotValidClass('notValid')
        }
    }

    const enterDown: KeyboardEventHandler = function(e){
        if (e.key === 'Enter'){
            if (isValid(todo)) {
                createTodo( todo );
                setTodo(DEFAULT_TODO);
            } else {
                setNotValidClass('notValid')
            }
        }
    }

    const isValid = function( todo: any){
        console.log(todo.title.length)
        return todo.title.length > 0
    }

    return <div className={styles.form_container}>
        <input 
            className={`${styles.form_input}`} 
            tabIndex={0} 
            required
            type="text" 
            value={todo.title} 
            name="title" 
            id="title" 
            onChange={ onChange }
            autoComplete='off'
            placeholder="Я сделаю..."
            onKeyDown={ enterDown }
            onBlur={() => { setNotValidClass('') }}
        />

        <DropDownMenu 
            options={categories} 
            headerDef={categories[0]} 
            createCategory={createCategory}
            setCategory={( option: TCategory ) => setTodo({ ...todo, category: option.label})}
            tabIndex={0}
        />

        <Button text='ОБЕЩАЮ' callback={ createTodoWrapper } tabIndex={0} color='green' type='main'/>
    </div>
}