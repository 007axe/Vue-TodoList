<template>
    <div>
        <h1 class="text-3xl font-bold text-center mb-2">Todo List</h1>

        <div class="flex">
            <input class="input input-bordered w-full" @keyup.enter="addTodo(todoName)" placeholder="เพิ่ม todo..."
                type="text" v-model="todoName">
            <button class="btn btn-accent ml-2" @click="addTodo(todoName)">เพิ่ม</button>
        </div>

        <Loading v-if="isLoading" />



        <div v-else>
            <!-- <div class="tabs mt-4">
                <a 
                v-for="item in todoStore.statuses" :key="item" 
                class="tab tab-bordered"
                :class="item === selectedStatus ? 'tab tab-active' : 'tab'"
                @click="changeSelectedStatus(item)">
                    {{ item }}
                </a>
            </div> -->

            <div class="flex items-center justify-between mt-2" v-for="item in todoStore.list" :key="item">
                <div class="flex">
                    <input type="checkbox" :checked="item.status === 'Done'" class="checkbox checkbox-success w-4 md:w-6 h-4 md:h-6"
                        @change="changeStatus($event, item.id)" />
                </div>
                <div class="flex text-sm sm:text-lg  w-[70%]">
                    <div :class="item.status === 'Done' ? 'line-through text-green-500' : ''" class="flex-auto w-[75%] overflow-hidden text-left">
                        {{ item.name }}
                    </div>
                    <div class="flex-auto w-[20%] text-center  rounded-md"
                    :class="item.status === 'Done' ? 'bg-green-500' : 'bg-yellow-500'"
                    >
                        {{ item.status }}
                    </div>
                </div>



                <div>
                    <router-link :to="{ name: 'edit-view', params: { id: item.id } }">
                        <button class="md:btn btn-warning btn-outline"><i class="fa-solid fa-pen-to-square"></i></button>
                    </router-link>
                    <button class="md:btn btn-error btn-outline ml-2" @click="deleteTodo(item.id)"><i
                            class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todo'
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

import Loading from '../components/Loading.vue'

const todoStore = useTodoStore()
const isLoading = ref(false)
const todoName = ref('')
const selectedStatus = ref('')

const filterTodoList = computed(() => {
    return todoStore.list.filter(item => item.status === selectedStatus.value)
})


onMounted(async () => {
    isLoading.value = true
    await todoStore.loadTodos()
    isLoading.value = false
})

const addTodo = async (todoName) => {
    try {
        isLoading.value = true
        await todoStore.addTodo(todoName)
        todoStore.loadTodos()

    }
    catch (error) {
        console.log('error', error)
    }
    isLoading.value = false
}

const editTodo = async (todo, todoId) => {
    try {
        await todoStore.editTodo(todo, todoId)
        todoStore.loadTodos()

    }
    catch (error) {
        console.log('error', error)
    }
}

const deleteTodo = async (id) => {
    try {
        isLoading.value = true
        await todoStore.deleteTodo(id)
        todoStore.loadTodos()
        console.log('ลบสำเร็จ')

    }
    catch (error) {
        console.log('error', error)
    }
    isLoading.value = false
}
const changeStatus = async (event, id) => {
    try {
        isLoading.value = true
        if (event.target.checked) {
            await todoStore.editTodo({ status: 'Done' }, id)

        } else {
            await todoStore.editTodo({ status: 'Doing' }, id)
        }
        await todoStore.loadTodos()


    }
    catch (error) {
        console.log('error', error)
    }
    isLoading.value = false
}

const changeSelectedStatus = async (newStatus) => {
    selectedStatus.value = newStatus
}

</script>

<style></style>