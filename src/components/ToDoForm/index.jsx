import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import './style.scss';


//useFormik là 1 hook của Formik lib,xử lí form và validation 
//Yup: Thư viện định nghĩa và xác thực dữ liệu.
//useDispatch: Hook từ React-Redux, giúp gửi action lên Redux store.
//dispach Kích hoạt Saga: Khi gửi action todos/addTodoStart, Saga sẽ lắng nghe và xử lý việc thêm công việc vào Firebase thông qua hàm addTodoSaga.
// Quản lý công việc tập trung: Redux giúp lưu trữ danh sách công việc ở trạng thái toàn cục (global state), dễ dàng cập nhật và truy cập từ bất kỳ component nào.
//Hiển thị lỗi khi dữ liệu không hợp lệ ngay lập tức mà không cần gửi yêu cầu lên server
const TodoForm = () => {
  const dispatch = useDispatch();


    //initialValues Dùng để khởi tạo giá trị ban đầu của form.
    //Ở đây chỉ có trường title, giá trị ban đầu là chuỗi rỗng.
  const formik = useFormik({
    initialValues: {
      title: ''
    },
    //validationSchema
    //Dùng Yup để định nghĩa các quy tắc kiểm tra cho form
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Vui lòng nhập công việc')
        .min(3, 'Tiêu đề phải có ít nhất 3 ký tự')
        .max(100, 'Tiêu đề không được quá 100 ký tự')
    }),
    onSubmit: (values, { resetForm }) => {
      //gửi acction với payload là giá trị form vừa nhập value
      dispatch({ type: 'todos/addTodoStart', payload: values });
      resetForm();
    }
  });

  return (
    //Sử dụng onSubmit được Formik cung cấp (formik.handleSubmit) để xử lý khi form được submit.
    <form onSubmit={formik.handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Thêm công việc mới..."
          value={formik.values.title}
          onChange={formik.handleChange}
          // onBlur: Đánh dấu input là "đã chạm" khi rời khỏi trường (tạo điều kiện để hiển thị lỗi).
          onBlur={formik.handleBlur}
          className={`form-input ${formik.touched.title && formik.errors.title ? 'error' : ''}`}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="error-message">{formik.errors.title}</div>
        )}
      </div>
      <button type="submit" className="submit-button">
        Thêm
      </button>
    </form>
  );
};

export default TodoForm;