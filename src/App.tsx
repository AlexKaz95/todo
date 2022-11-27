import React, { MouseEventHandler, useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { ModalWindow } from './components/ModalWindow/modalWindow';
import { TodoForm } from './components/TodoForm/todoForm';
import { TodoPanel } from './components/TodoPanel/todoPanel';

function App() {
  const [modalView, setModalView] = useState(false)
  const [deletingTodo, setDeletingTodo] = useState<ITodoItem | null>(null);
  const [todos, setTodos] = useState<ITodoItem[]>(() => {
    const dataTodos =  window.localStorage.getItem('todos');
    if (dataTodos) return JSON.parse(dataTodos);
    return []
  });

  const [todosCount, setTodosCount] = useState(() => {
    const dataTodosCount = window.localStorage.getItem('todosCount');
    if (dataTodosCount) return JSON.parse(dataTodosCount);
    return 0
  });

  const [todosInProgress, setTodosInProgress] = useState(() => {
    return todos.filter((todo) => todo.status==='done' || todo.status === 'progress');
  });


  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
    window.localStorage.setItem('todosCount', JSON.stringify(todosCount))
    setTodosInProgress(todos.filter((todo) => todo.status==='done' || todo.status === 'progress'))
  }, [todos, todosCount])

  const markDone = function( id: number ){
    setTodos( 
      todos.map(todo => { 
        if (todo.id === id){
          return {
            ...todo,
            status: 'done',
            done: true
          } 
        }
        return todo
      }
     ));
     setTodosCount( todosCount - 1 );
  }

  const forgetTodo = function( todo: ITodoItem ){
    setDeletingTodo(todo);
    setModalView(true);
  }

  const createTodo = function( data: ITodoItem ){
    setTodos([...todos, {...data, id: todos[todos.length - 1].id + 1}]);
    setTodosCount( todosCount + 1 );
  }

  const archiveTodo = function( id: number ){
    setTodos( 
      todos.map(todo => { 
        if (todo.id === id){
          return {
            ...todo,
            status: 'archive',
          } 
        }
        return todo
      }
     ));
  }

  const closeWindow: MouseEventHandler = function( e ){
    e.stopPropagation();
    e.preventDefault();
    setModalView(false)
  }

  const confirm: MouseEventHandler = function( e ){
    e.preventDefault();
    if (deletingTodo) {
      setTodos([...todos.filter(todo => todo.id !== deletingTodo.id)]);
      closeWindow( e );
      setTodosCount( todosCount - 1 );
    }
  }

  const cancel: MouseEventHandler = function( e ){
    e.preventDefault();
    closeWindow( e );
  }
  return (
    <div className="App">
      <Header todosCount={ todosCount }/>
      <TodoForm createTodo={ createTodo }/>
      <TodoPanel todos={ todosInProgress } markDone={ markDone } forget={ forgetTodo } archiveTodo={archiveTodo} />
      { modalView && <ModalWindow deletingTodo={deletingTodo} closeWindow={ closeWindow } confirm={ confirm } cancel={ cancel }/> }
    </div>
  );
}

export default App;
