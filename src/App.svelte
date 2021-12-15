<script>
	import {todosStore} from "./todosStore";
	let addTodoText = "";
	let addTodo = () => {
		todosStore.addTodo({
			text: addTodoText,
		}).then(() => console.log(
			"Added todo"
		));
	}

</script>

<ul>
	{#each $todosStore as todo (todo.id)}
		<li>{todo.text}</li>
	{/each}
	<input bind:value={addTodoText}> <button on:click={addTodo}>Add todo</button>
</ul>


<style>
	
</style>