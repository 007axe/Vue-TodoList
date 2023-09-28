<template>
  <div class="max-w-lg mx-auto">
    <div class="flex items-center"> 
      <router-link :to="{ name: 'todo-view' }"><i class="fa-solid fa-backward"></i></router-link>
      <h1 class="text-3xl font-bold mb-2 ml-auto mr-auto">Edit</h1>
    </div>
    <Loading v-if="isLoading" />
    <div v-else class="text-lg">
        <h2 class="text-xl">id {{ todoId }}</h2>
      <div>
        <p class="my-2">ชื่อ</p>
        <input class="input input-bordered w-full" type="text" v-model="todoStore.selectionTodo.name">
      </div>
      <div>
        <p class="my-2">สถานะ</p>
        <select class="select select-bordered w-full mb-2"  v-model="todoStore.selectionTodo.status">
          <option v-for="status in todoStore.statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
      <button class="btn btn-accent w-full mt-2" @click="editTodo(todoStore.selectionTodo)">Update</button>

    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todo'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

import Loading from '../components/Loading.vue'

const todoStore = useTodoStore()
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const todoId = ref()

onMounted(async () => {
  isLoading.value = true
  await todoStore.loadTodo(route.params.id)
  todoId.value = parseInt(route.params.id)
  isLoading.value = false
})

const editTodo = async (selectionTodo) => {
  try {
    const bodyData = {
      name: selectionTodo.name,
      status: selectionTodo.status
    }
    isLoading.value = true
    await todoStore.editTodo(bodyData, todoId.value)
    todoStore.loadTodos()
    isLoading.value = false
    router.push({ name: 'todo-view' })

  }
  catch (error) {
    console.log('error', error)
  }
}

</script>