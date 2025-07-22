<template>
  <q-page class="flex flex-center column">
    <q-card class="q-pa-md q-ma-md" style="width: 600px;">
      <q-card-section>
        <div class="text-h6">Todo Manager</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="new_todo_title" label="New Todo" @keyup.enter="addTodo" />
        <q-btn label="Add" color="primary" @click="addTodo" class="q-mt-sm" />
      </q-card-section>

      <q-card-section>
        <q-list bordered separator>
          <q-item v-for="todo in todos" :key="todo.id" clickable v-ripple>
            <q-item-section>
              <!-- <pre>{{ todo }}</pre> -->
              <q-checkbox v-model="todo.completed" @update:model-value="toggleCompleted(todo)" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="{ 'text-strike': todo.completed }">{{ todo.title }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="delete" flat round dense @click="deleteTodo(todo.id)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()
const todos = ref([])
const new_todo_title = ref('')

// Function to fetch all todos from backend
async function fetchTodos() {
  try {
    const response = await axios.get('/api/todos')
    todos.value = response.data.todos
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Failed to fetch todos' })
  }
}

// Function to add a new todo
async function addTodo() {
  if (!new_todo_title.value.trim()) return
  try {
    const response = await axios.post('/api/todos', { title: new_todo_title.value })
    todos.value.push(response.data)
    new_todo_title.value = ''
    $q.notify({ type: 'positive', message: 'Todo added successfully' })
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Failed to add todo' })
  }
}

// Function to toggle todo completion
async function toggleCompleted(todo) {
  try {
    const response = await axios.put(`/api/todos/${todo.id}`, { completed: todo.completed })
    const index = todos.value.findIndex(t => t.id === todo.id)
    todos.value[index] = response.data
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Failed to update todo' })
  }
}

// Function to delete a todo
async function deleteTodo(id) {
  try {
    await axios.delete(`/api/todos/${id}`)
    todos.value = todos.value.filter(t => t.id !== id)
    $q.notify({ type: 'positive', message: 'Todo deleted successfully' })
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Failed to delete todo' })
  }
}

onMounted(fetchTodos)
</script>
