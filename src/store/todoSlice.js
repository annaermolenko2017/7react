import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66466a4951e227f23aaedf62.mockapi.io/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodo', async (todo) => {
    const response = await axios.post(API_URL, todo);
    return response.data;
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addTodoAsync.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        });
    }
});

export const { toggleTodo } = todoSlice.actions;
export const selectTodos = state => state.todos;
export default todoSlice.reducer;
