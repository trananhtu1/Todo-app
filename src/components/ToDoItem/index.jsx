import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch({
      type: 'todos/updateTodoStart',
      payload: { id: todo.id, completed: !todo.completed }
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'todos/deleteTodoStart',
      payload: todo.id
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="todo-checkbox"
      />
      <span className="todo-title">{todo.title}</span>
      <button onClick={handleDelete} className="delete-button">
        Xóa
      </button>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired
};

export default TodoItem;