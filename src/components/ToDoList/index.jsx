import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from '../ToDoItem';
import './style.scss';
import { 
  clearError, 
  setFilter, 
  clearCompleted, 
  selectFilteredTodos, 
  selectFilter 
} from '../../redux/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  
  // Lấy danh sách todos đã được lọc dựa trên trạng thái filter (All, Active, Completed)
  const todos = useSelector(selectFilteredTodos);
  
  // Lấy trạng thái filter hiện tại từ Redux
  const filter = useSelector(selectFilter);

  // Lấy các trạng thái loading, error, và retryCount từ Redux
  const { loading, error, retryCount } = useSelector(state => state.todos);

  // Xử lý retry tự động khi có lỗi xảy ra, tối đa thử lại 3 lần
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        // Clear lỗi và gửi yêu cầu fetch lại todos
        dispatch(clearError());
        dispatch({ type: 'todos/fetchTodosStart' });
      }, 5000);

      // Xóa timeout khi component bị unmount hoặc khi điều kiện thay đổi
      return () => clearTimeout(timer);
    }
  }, [error, retryCount, dispatch]);

  // Hàm thay đổi trạng thái filter
  const handleFilterChange = (newFilter) => {
    // Dispatch action setFilter để cập nhật trạng thái filter trong Redux
    dispatch(setFilter(newFilter));
  };

  // Hàm xóa tất cả các task đã hoàn thành
  const handleClearCompleted = () => {
    // Dispatch action clearCompleted để xóa các todos có completed = true
    dispatch(clearCompleted());
  };
  // Tính số công việc còn lại
  const itemsLeft = todos.filter(todo => !todo.completed).length;
  // Hiển thị trạng thái loading khi đang tải dữ liệu
  if (loading) {
    return <div className="todo-list-loading">Đang tải...</div>;
  }

  // Hiển thị lỗi khi gặp lỗi trong quá trình fetch dữ liệu
  if (error) {
    return (
      <div className="todo-list-error">
        <p>Có lỗi xảy ra: {error}</p>
        {/* Hiển thị trạng thái thử lại nếu retryCount nhỏ hơn 3 */}
        {retryCount < 3 && <p>Đang thử lại...</p>}
      </div>
    );
  }

  // Hiển thị thông báo khi không có công việc nào trong danh sách
  
  
  return (
    <div className="todo-list-container">
      {/* Danh sách công việc */}
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
        {/* Thanh điều hướng filter */} 
      <div className="todo-list-filters">

        
        {/* Nút filter All */}
        <div className="status-bar">
        {itemsLeft} task left!
        </div>
        

        {/* Nút filter Active */}
        <div className="filter-buttons">

          <button 
            className={`filter-button ${filter === 'All' ? 'active' : ''}`}
            onClick={() => handleFilterChange('All')}
          >
            All
          </button>
          <button 
            className={`filter-button ${filter === 'Active' ? 'active' : ''}`}
            onClick={() => handleFilterChange('Active')}
          >
            Active
          </button>

          {/* Nút filter Completed */}
          <button 
            className={`filter-button ${filter === 'Completed' ? 'active' : ''}`}
            onClick={() => handleFilterChange('Completed')}
          >
            Completed
          </button>
          </div>
        

        {/* Nút Clear Completed */}
        <button 
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
