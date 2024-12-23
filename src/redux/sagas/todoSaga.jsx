import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc ,
  getDoc
} from 'firebase/firestore';
import { db } from '../../services/firebase';
import {
  fetchTodosSuccess,
  addTodoSuccess,
  updateTodoSuccess,
  deleteTodoSuccess,
  setError
} from '../todoSlice';

function* fetchTodosSaga() {
  try {
    console.log('[fetchTodosSaga] - Fetching todos...');
    const querySnapshot = yield call(getDocs, collection(db, 'todos'));
    const todos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('[fetchTodosSaga] - Todos fetched successfully:', todos);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    console.error('[fetchTodosSaga] - Error fetching todos:', error);
    yield put(setError(error.message));
  }
}

function* addTodoSaga(action) {
  try {
    console.log('[addTodoSaga] - Adding todo with payload:', action.payload);
    
    if (!db) {
      console.error('[addTodoSaga] - Firebase DB not initialized');
      throw new Error('Firebase DB not initialized');
    }

    const docRef = yield call(addDoc, collection(db, 'todos'), {
      title: action.payload.title,
      completed: false,
      createdAt: new Date().toISOString()
    });

    console.log('[addTodoSaga] - Todo added successfully with ID:', docRef.id);

    const newTodo = {
      id: docRef.id,
      ...action.payload,
      completed: false
    };
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    console.error('[addTodoSaga] - Error adding todo:', error);
    yield put(setError(error.message));
  }
}


function* updateTodoSaga(action) {
  try {
    console.log('[updateTodoSaga] - Updating todo with payload:', action.payload);
    const { id, ...updates } = action.payload;

    const todoRef = doc(db, 'todos', id);
    
    // Lấy dữ liệu hiện tại từ Firestore trước khi cập nhật
    const currentDoc = yield call(getDoc, todoRef);
    if (!currentDoc.exists()) {
      throw new Error(`Todo với ID: ${id} không tồn tại.`);
    }

    // Bảo toàn dữ liệu hiện tại, chỉ cập nhật các trường được truyền trong payload
    const currentData = currentDoc.data();
    const updatedData = {
      ...currentData,
      ...updates, // Ghi đè giá trị mới lên dữ liệu cũ
    };

    yield call(updateDoc, todoRef, updatedData);

    console.log('[updateTodoSaga] - Todo updated successfully with ID:', id);
    yield put(updateTodoSuccess({ id, ...updatedData }));
  } catch (error) {
    console.error('[updateTodoSaga] - Error updating todo:', error);
    yield put(setError(error.message));
  }
}


function* deleteTodoSaga(action) {
  try {
    console.log('[deleteTodoSaga] - Deleting todo with ID:', action.payload);

    const todoRef = doc(db, 'todos', action.payload);
    yield call(deleteDoc, todoRef);

    console.log('[deleteTodoSaga] - Todo deleted successfully with ID:', action.payload);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    console.error('[deleteTodoSaga] - Error deleting todo:', error);
    yield put(setError(error.message));
  }
}

export function* todoSaga() {
  console.log('[todoSaga] - Initializing todo sagas...');
  yield takeLatest('todos/fetchTodosStart', fetchTodosSaga);
  yield takeLatest('todos/addTodoStart', addTodoSaga);
  yield takeLatest('todos/updateTodoStart', updateTodoSaga);
  yield takeLatest('todos/deleteTodoStart', deleteTodoSaga);
}
