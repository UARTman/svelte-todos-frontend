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

    const changeTodo = async (todo) => {
        await fetch(address + todo.id, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "id": todo.id
            },
            body: JSON.stringify(todo)
        });
        await fetchTodos();
    }

    const deleteTodo = async (id) => {
        await fetch(address + id, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "id": id
            }
        });
        await fetchTodos();
    }

    fetchTodos();
    return {
        subscribe,
        fetchTodos,
        addTodo,
        deleteTodo,
        changeTodo,
    }
}

export const todosStore = createTodosStore();