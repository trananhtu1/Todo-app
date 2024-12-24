//import React from 'react';
import TodoList from './components/ToDoList';
import TodoForm from './components/ToDoForm';
import './styles/main.scss';

function App() {
  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
