import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync, fetchTodos, selectTodos } from '../store/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        dispatch(addTodoAsync({
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
