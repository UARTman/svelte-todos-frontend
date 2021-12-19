<script>
	import {todosStore} from "./todosStore";
	let addTodoText = "";
	let addTodo = () => {
		todosStore.addTodo({
			text: addTodoText,
		});
	}
	let deleteTodo = (id) => {
		todosStore.deleteTodo(id);
	}
	let doneTodo = (todo) => {
		todosStore.changeTodo({
			editing: todo.editing,
			done: !todo.done,
			text: todo.text,
			id: todo.id,
		});
	}
	let editTodo = (todo) => {
		todosStore.changeTodo({
			editing: !todo.editing,
			done: todo.done,
			text: todo.text,
			id: todo.id,
		});
	}
	let saveTodo = (todo) => {
		todosStore.changeTodo({
			editing: !todo.editing,
			done: todo.done,
			text: todo.newtext,
			id: todo.id,
		});
	}
</script>

<ul>
	{#each $todosStore as todo (todo.id)}
		<li>
			<input type="checkbox" checked={todo.done} on:click={doneTodo(todo)}>
			{#if todo.editing}
			<input bind:value={todo.newtext}>
			<button on:click={saveTodo(todo)}>Save</button>
			<button on:click={editTodo(todo)}>Discard</button>
			{:else}
			{todo.text}
			<button on:click={editTodo(todo)}>Edit</button>
			<button on:click={deleteTodo(todo.id)}>Delete</button>
			{/if}
		</li>
	{/each}
	<input bind:value={addTodoText}> <button on:click={addTodo}>Add todo</button>
</ul>


<style>
	
</style>