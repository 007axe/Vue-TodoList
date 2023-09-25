<template>
  <div>
    
    <h1>Todo List</h1>
    <div>
        <input type="text" v-model="todoText">
        <button @click="addTodo(todoText)">Add</button>
    </div>
    <ul >
        <h2 v-if="isLoading">Loading...</h2>
        <li v-for="todo in todoStore.list" :key="todo">
            {{ todo.name }}
            <select v-model="todo.status" @change="editStatus(todo, todo.id)">
                <option>Select status</option>
                <option 
                v-for="status in todoStore.statuses" 
                :key="status" 
                :value="status">
                    {{ status }}
                </option>
            </select>

            <router-link :to="{ name: 'todo-edit', params: {id: todo.id}}">
                <button>Edit</button>
            </router-link>
            <button @click="deleteTodo(todo.id)">Delete</button>
        </li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const todoText = ref('')
const isLoading = ref(false)

onMounted(async() => {
    isLoading.value = true
    await todoStore.loadTodos()
    isLoading.value = false
    // console.log(todoStore.list)
})

const addTodo = async (todoText) => {
    try {
        isLoading.value = true
        await todoStore.addTodo(todoText)
        isLoading.value = false
    }
    catch (error) {
        console.log('error', error)
    }
}

const editStatus = async (todoData, todoId) => {
    try {
        isLoading.value = true
        const updateData = {
            name: todoData.name,
            status: todoData.status
        }
        await todoStore.editTodo(updateData, todoId)
    }
    catch (error) {
        console.log('error', error)
        isLoading.value = false
    }
}
const deleteTodo = async (todoId) => {
    try {
        isLoading.value = true
        await todoStore.removeTodo(todoId)
        await todoStore.loadTodos()
        isLoading.value = false
    }
    catch (error) {
        console.log('error', error)
    }
}

</script>

<style>

</style>