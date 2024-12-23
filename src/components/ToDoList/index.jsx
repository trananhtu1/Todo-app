import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from '../ToDoItem';
import './style.scss';
import { clearError } from '../../redux/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, retryCount } = useSelector(state => state.todos);

  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        dispatch(clearError());
        dispatch({ type: 'todos/fetchTodosStart' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, retryCount, dispatch]);

  if (loading) {
    return <div className="todo-list-loading">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="todo-list-error">
        <p>Có lỗi xảy ra: {error}</p>
        {retryCount < 3 && <p>Đang thử lại...</p>}
      </div>
    );
  }

  if (!todos.length) {
    return <div className="todo-list-empty">Chưa có công việc nào</div>;
  }

  return (
    //newest 
    <div className="todo-list">
      {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={{
          id: todo?.id || '',
          title: todo?.title || 'Không có tiêu đề',
          completed: todo?.completed ?? false
        }}
      />
      ))}
    </div>
  );
};

export default TodoList;
