<script>
  export let addTodo
  export let toggleCompleted
  export let todosCount
  //$: console.log(high)

  let todo = ""
  let high = false
  function handleSubmit() {
    addTodo(todo, high)
    todo = ""
    high = false
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  {#if todosCount > 0}
    <input
      type="checkbox"
      id="toggle-all"
      class="<!-- toggle-all -->"
      on:click={toggleCompleted}
    />
    <label
      title="Mark all as complete"
      aria-label="Mark all as complete"
      for="toggle-all"
    >
      Mark all as complete
    </label>
  {/if}
  <!-- svelte-ignore a11y-autofocus -->
  <div class="contForm">
    <input
      id="new-todo"
      class="new-todo"
      placeholder="What needs to be done?"
      type="text"
      autofocus
      bind:value={todo}
    />
    <small><label for="hiprio">High </label></small>
    <input
      class="high"
      type="checkbox"
      name="hiprio"
      id="hiprio"
      bind:checked={high}
    />
  </div>
</form>

<style>
  .contForm {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .high {
    margin: 0 0.5rem 0 0.5rem;
  }
  .toggle-all {
    width: 1px;
    height: 1px;
    position: absolute;
    opacity: 0;
  }
  .toggle-all + label {
    position: absolute;
    font-size: 0;
  }
  .toggle-all + label:before {
    content: "❯";
    display: block;
    padding: var(--spacing-16);
    font-size: var(--font-24);
    color: var(--color-gray-58);
    transform: rotate(90deg);
  }
  .toggle-all:checked + label:before {
    content: "❮";
    color: var(--color-gray-28);
  }
  .new-todo {
    width: 100%;
    padding: var(--spacing-16);
    padding-left: 60px;
    font-size: var(--font-24);
    border: none;
    border-bottom: 1px solid var(--shadow-1);
  }
</style>
