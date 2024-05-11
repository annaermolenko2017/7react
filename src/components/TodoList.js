import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, selectTodos } from '../store';

function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const [inputValue, setInputValue] = useState('');

    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        dispatch(addTodo({
            id: new Date().getTime(),
            text: inputValue,
            completed: false
        }));
        setInputValue('');
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        onClick={() => handleToggleTodo(todo.id)}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
                        {todo.text}
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your todo"
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}

export default TodoList;