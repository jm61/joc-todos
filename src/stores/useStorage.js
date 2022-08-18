import { writable } from "svelte/store"

export const useStorage = (key, initialValue) => {
  const serialize = JSON.stringify
  const deserialize = JSON.parse

  const storedValue = deserialize(localStorage.getItem(key))
  const store = writable(storedValue ? storedValue : initialValue)
  store.subscribe(value => localStorage.setItem(key, serialize(value)))
  return store
}
