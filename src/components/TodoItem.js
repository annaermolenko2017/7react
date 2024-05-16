import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/todoSlice';

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();

    return (
        <li
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
            {todo.text}
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
        </li>
    );
};

export default TodoItem;
