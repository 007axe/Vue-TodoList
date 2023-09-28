import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://65106cba3ce5d181df5d3ecb.mockapi.io'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    statuses: ['Panding', 'Doing', 'Done'],
    selectionTodo: {}
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
        // console.log(this.list)
      }catch(error) {
        console.log('erorr', error)
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectionTodo = response.data

      }catch(error) {
        console.log('erorr', error)
      }
    },
    async addTodo(todoName) {
      try {
        const todoData = {
          name: todoName,
          status: 'Panding'
        }
        const response = await axios.post(`${BASE_URL}/todos`, todoData)
      }catch(error) {
        console.log('erorr', error)
      }
    },
    async editTodo(todoData, id) {
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
      }catch(error) {
        console.log('erorr', error)
      }
    },
    async deleteTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`,id)
      }catch(error) {
        console.log('erorr', error)
      }
    }
  }
})
