<script>
  import { tick } from "svelte"
  import AddTodo from "./AddTodo.svelte"
  import Todo from "./Todo.svelte"
  import TodosLeft from "./TodosLeft.svelte"
  import FilterTodos from "./FilterTodos.svelte"
  import ClearTodos from "./ClearTodos.svelte"
  import { useStorage } from "../stores/useStorage"

  // state
  let todos = useStorage("todos", [])
  let selectedFilter = "all"
  let filtering = false
  // computed values
  $: todosCount = $todos.length
  $: incompleteTodos = $todos.filter(todo => !todo.completed).length
  $: filteredTodos = filterTodos($todos, selectedFilter)
  $: completedTodos = $todos.filter(todo => todo.completed).length
  $: duration = filtering ? 0 : 250
  // debugging
  //$: console.log(filteredTodos)

  function randomId() {
    return Math.random().toString(16).slice(2)
  }

  /** @param {Object} todo
   * @param {boolean} high
   */
  function addTodo(todo, high) {
    let newTodo = {
      id: randomId(),
      text: todo,
      completed: false,
      high: high
    }
    $todos = [...$todos, newTodo]
  }
  /** @param {Object} event*/
  function toggleCompleted(event) {
    let { checked } = event.target
    $todos = $todos.map(todo => ({
      ...todo,
      completed: checked
    }))
  }
  /** @param {String} id*/
  function completeTodo(id) {
    $todos = $todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }

  /** @param {String} id*/
  function removeTodo(id) {
    $todos = $todos.filter(todo => todo.id !== id)
  }

  /** @param {String} id
   * @param {String} newTodo
   */
  function editTodo(id, newTodo) {
    let currentTodo = $todos.findIndex(todo => todo.id === id)
    $todos[currentTodo].text = newTodo
  }

  /** @param {String} newFilter*/
  async function setFilter(newFilter) {
    filtering = true
    await tick()
    selectedFilter = newFilter
    await tick()
    filtering = false
  }

  /** @param {Array} todos
   * @param {String} filter
   */
  function filterTodos(todos, filter) {
    switch (filter) {
      case "all":
        return todos
      case "active":
        return todos.filter(todo => !todo.completed)
      case "completed":
        return todos.filter(todo => todo.completed)
      case "hipri":
        return todos.filter(todo => todo.high)
    }
  }
  function clearCompleted() {
    $todos = $todos.filter(todo => todo.completed !== true)
  }
</script>

<main>
  <h1 class="title">todos</h1>

  <section class="todos">
    <AddTodo {addTodo} {toggleCompleted} {todosCount} />

    {#if todosCount}
      <ul class="todo-list">
        {#each filteredTodos as todo}
          <Todo {todo} {completeTodo} {removeTodo} {editTodo} {duration} />
        {/each}
      </ul>

      <div class="actions">
        <TodosLeft {incompleteTodos} />
        <FilterTodos {selectedFilter} {setFilter} />
        <ClearTodos {clearCompleted} {completedTodos} />
      </div>
    {/if}
  </section>
</main>

<style>
  .title {
    font-size: var(--font-80);
    font-weight: inherit;
    text-align: center;
    color: var(--color-title);
  }

  .todos {
    --width: 500px;
    --todos-bg: hsl(0 0% 98%);
    --todos-text: hsl(220 20% 14%);

    width: var(--width);
    color: var(--todos-text);
    background-color: var(--todos-bg);
    border-radius: var(--radius-base);
    border: 1px solid var(--color-gray-90);
    box-shadow: 0 0 4px var(--shadow-1);
  }

  .todo-list {
    list-style: none;
  }

  .actions {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-8) var(--spacing-16);
    font-size: 0.9rem;
    border-top: 1px solid var(--color-gray-90);
  }

  .actions:before {
    content: "";
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: rgba(200, 200, 255, 0.5) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
    z-index: -1;
  }
</style>
