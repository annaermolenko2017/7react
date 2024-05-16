import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, selectTodos } from '../store/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const [inputValue, setInputValue] = useState('');

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

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
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
};

export default TodoList;
