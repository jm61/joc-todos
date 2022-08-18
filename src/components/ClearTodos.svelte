<script>
  export let clearCompleted
  export let completedTodos
</script>

{#if completedTodos > 0}
  <button class="clear-completed" on:click={() => clearCompleted()}>
    Clear completed ({completedTodos})
  </button>
{/if}
