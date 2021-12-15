import {writable} from "svelte/store";

const address = "http://localhost:3000/api/todos/"

const createTodosStore = () => {
    let {subscribe, update, set} = writable([]);
    const fetchTodos = async () => {
        let response = await fetch(address);
        let fetchedTodos = await response.json();
        set(fetchedTodos.todos);
    }

    const addTodo = async (todo) => {
        await fetch(address, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(todo)
        });
        await fetchTodos();
    }

    fetchTodos();
    return {
        subscribe,
        fetchTodos,
        addTodo,
    }
}

export const todosStore = createTodosStore();