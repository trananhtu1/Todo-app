import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state ban đầu
const initialState = {
  filter: 'All', // Trạng thái filter mặc định: 'All' (Hiển thị tất cả các task)
  todos: [], // Danh sách todos
  loading: false, // Trạng thái loading khi thực hiện các thao tác
  error: null, // Lưu trữ thông báo lỗi
  retryCount: 0, // Đếm số lần thử lại khi gặp lỗi
};

// Tạo slice cho todos
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Bắt đầu fetch todos
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Fetch thành công: Lưu danh sách todos vào state
    fetchTodosSuccess: (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    },
    // Bắt đầu thêm todo
    addTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Thêm todo thành công: Cập nhật vào danh sách todos
    addTodoSuccess: (state, action) => {
      state.todos.push(action.payload);
      state.loading = false;
    },
    // Bắt đầu cập nhật todo
    updateTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Cập nhật todo thành công
    updateTodoSuccess: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload; // Ghi đè todo đã cập nhật
      }
      state.loading = false;
    },
    // Bắt đầu xóa todo
    deleteTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Xóa todo thành công
    deleteTodoSuccess: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.loading = false;
    },
    // Thiết lập lỗi khi có lỗi xảy ra
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.retryCount += 1; // Tăng số lần thử lại
    },
    // Xóa lỗi
    clearError: (state) => {
      state.error = null;
      state.retryCount = 0;
    },
    // Thay đổi trạng thái filter (All, Active, Completed)
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // Xóa tất cả các task đã hoàn thành
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
  },
});

// Các selector để truy xuất dữ liệu từ state

// Selector: Lọc danh sách todos theo filter
export const selectFilteredTodos = (state) => {
  const { todos, filter } = state.todos;

  switch (filter) {
    case 'Active': // Chỉ lấy các task chưa hoàn thành
      return todos.filter((todo) => !todo.completed);
    case 'Completed': // Chỉ lấy các task đã hoàn thành
      return todos.filter((todo) => todo.completed);
    default: // 'All': Hiển thị tất cả task
      return todos;
  }
};

// Selector: Lấy trạng thái filter hiện tại
export const selectFilter = (state) => state.todos.filter;

// Selector: Lấy trạng thái loading
export const selectLoading = (state) => state.todos.loading;

// Selector: Lấy thông báo lỗi (nếu có)
export const selectError = (state) => state.todos.error;

// Selector: Đếm số task chưa hoàn thành
export const selectActiveTodoCount = (state) =>
  state.todos.todos.filter((todo) => !todo.completed).length;

// Selector: Tổng số todos
export const selectTotalTodoCount = (state) => state.todos.todos.length;

// Export các action và reducer
export const {
  fetchTodosStart,
  fetchTodosSuccess,
  addTodoStart,
  addTodoSuccess,
  updateTodoStart,
  updateTodoSuccess,
  deleteTodoStart,
  deleteTodoSuccess,
  setError,
  clearError,
  setFilter,
  clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
