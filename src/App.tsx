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

  const [todosLastId, setTodosLastId] = useState(() => {
    const dataTodosLastId = window.localStorage.getItem('todosLastId');
    if (dataTodosLastId) return JSON.parse(dataTodosLastId);
    return 0
  });

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
    window.localStorage.setItem('todosCount', JSON.stringify(todosCount))
    window.localStorage.setItem('todosLastId', JSON.stringify(todosLastId))
  }, [todos, todosCount, todosLastId])

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
    setTodosLastId(todosLastId + 1)
    setTodos([...todos, {...data, id: todosLastId}]);
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

  const changeOrder = function(order: number, selected: ITodoItem ){
    setTodos(prev => {
      const reordered = prev.filter(todo => todo.id !== selected.id)
      reordered.splice(order, 0, selected);
      return reordered
    })
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
      <TodoPanel todos={ todos } markDone={ markDone } forget={ forgetTodo } archiveTodo={archiveTodo} changeOrder={changeOrder}/>
      { modalView && <ModalWindow deletingTodo={deletingTodo} closeWindow={ closeWindow } confirm={ confirm } cancel={ cancel }/> }
    </div>
  );
}

export default App;
