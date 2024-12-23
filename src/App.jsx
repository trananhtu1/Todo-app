import TodoForm from './components/ToDoForm';
import TodoList from './components/ToDoList';
import './styles/main.scss';

function App() {
  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
