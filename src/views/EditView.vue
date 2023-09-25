<template>
  <div v-if="isLoading">
    <h1>Edit id {{ todoId }}</h1>
    <div>
      <span>Name: </span>
      <input type="text" v-model="todoStore.selectedTodo.name">
    </div>
    <div>
      <span>Status: </span>
      <select v-model="todoStore.selectedTodo.status">
                <option>Select status</option>
                <option 
                v-for="status in todoStore.statuses" 
                :key="status" 
                :value="status">
                    {{ status }}
                </option>
            </select>
    </div>
    <button @click="editTodo(todoStore.selectedTodo)">Edit</button>
  </div>
  <div v-else>
    <h1>Loading...</h1>
  </div>
  <router-link :to="{ name: 'todo-list'}">
      back to home
    </router-link>

</template>
  
<script setup>
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const route = useRoute()
const router = useRouter()
const todoId = ref(-1)
const isLoading = ref(false)

onMounted(async() => {
  await todoStore.loadTodo(route.params.id)
  isLoading.value = true
  todoId.value = parseInt(route.params.id)
  // console.log(todoStore.selectedTodo)
})

const editTodo = async (selectedTodo) => {
  try {
    const bodyData = {
    name: selectedTodo.name,
    status: selectedTodo.status
    }
    await todoStore.editTodo(bodyData, todoId.value)
    alert('edit complete!')
    router.push({ name: 'todo-list' })
  }
  catch (error) {
    console.log('error', error)
  }
  
  
}

</script>
  
<style></style>