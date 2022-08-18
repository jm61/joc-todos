<script>
  import { fade, slide } from "svelte/transition"
  export let todo = {}
  export let completeTodo
  export let removeTodo
  export let editTodo
  export let duration

  let editing = false

  function toggleEdit() {
    editing = true
  }

  /**
   * @param {Object} event
   * @param {string} id
   */
  function handleEdit(event, id) {
    const pressedKey = event.key
    const targetElement = event.target
    let newTodo = targetElement.value
    console.log(newTodo)

    switch (pressedKey) {
      case "Enter":
        editTodo(id, newTodo)
        targetElement.blur()
        break
      case "Escape":
        targetElement.blur()
        break
    }
  }

  function handleBlur(event, id) {
    const targetElement = event.target
    let newTodo = targetElement.value
    editTodo(id, newTodo)
    targetElement.blur()
    editing = false
  }
</script>

<li in:slide={{ duration }} out:fade={{ duration }} class="todo" class:editing>
  <div class="todo-item">
    <div>
      <input
        id="todo"
        class="toggle"
        type="checkbox"
        checked={todo.completed}
        on:change={() => completeTodo(todo.id)}
      />
      <label aria-label="Check todo" class="todo-check" for="todo" />
    </div>
    <span
      class="todo-text"
      class:completed={todo.completed}
      on:dblclick={toggleEdit}>{todo.text}</span
    >
    <span on:dblclick={toggleEdit} class="hideHigh" class:showHigh={todo.high}
      >&#9889;</span
    >
    <button
      aria-label="Remove todo"
      class="remove"
      on:click={() => removeTodo(todo.id)}
    />
  </div>
  {#if editing}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      class="edit"
      type="text"
      autofocus
      value={todo.text}
      on:keydown={e => handleEdit(e, todo.id)}
      on:blur={e => handleBlur(e, todo.id)}
    />
  {/if}
</li>

<style>
  .hideHigh {
    display: none;
  }
  .showHigh {
    position: absolute;
    top: 24px;
    right: 30px;
    display: block;
    font-size: 1rem;
    padding: 0 0.2rem 0 0.2rem;
  }
  .todo {
    font-size: var(--font-24);
    font-weight: 400;
    border-bottom: 1px solid #ededed;
  }

  .todo:last-child {
    border-bottom: none;
  }

  .todo-check,
  .todo-text {
    display: block;
    padding: var(--spacing-16);
    color: var(--color-gray-28);
    transition: color 0.4s;
  }

  .todo-check {
    border-radius: 100%;
  }

  .completed {
    color: var(--color-gray-58);
    text-decoration: line-through var(--color-title);
  }

  .todo-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 var(--spacing-8);
  }

  .editing .todo-item {
    display: none;
  }

  .edit {
    width: 100%;
    padding: var(--spacing-8);
    font-size: var(--font-24);
    border: 1px solid #999;
    border-radius: var(--radius-base);
    box-shadow: inset 0 -1px 5px 0 var(--shadow-1);
  }

  .toggle {
    position: absolute;
    top: 26px;
    left: 13px;
    transform: scale(2);
    opacity: 0;
  }

  .toggle + label {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 84% 50%;
  }

  .toggle:checked + label {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E");
  }

  .remove {
    display: none;
    margin-left: auto;
    font-size: var(--font-32);
    color: var(--color-gray-58);
    transition: color 0.2s ease-out;
  }

  .remove:hover {
    color: var(--color-highlight);
  }

  .remove:after {
    content: "×";
  }

  .todo:hover .remove {
    display: block;
  }
</style>
