import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './style.scss';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo?.title || ''); // Giá trị mặc định

  //newest 
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() === '') return; // Ngăn lưu nếu tiêu đề trống
    dispatch({
      type: 'todos/updateTodoStart',
      payload: { id: todo.id, title: editedTitle }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  if (!todo || !todo.title) {
    return <div className="todo-item error">Công việc không hợp lệ</div>;
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="todo-checkbox"
      />
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
          />
          <button onClick={handleSave} className="save-button">Lưu</button>
          <button onClick={handleCancel} className="cancel-button">Hủy</button>
        </div>
      ) : (
        <>
          <span className="todo-title">{todo.title}</span>
          <button onClick={handleEdit} className="edit-button">Chỉnh sửa</button>
        </>
      )}
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
