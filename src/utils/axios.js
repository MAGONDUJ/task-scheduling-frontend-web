import axios from 'axios'

export default axios.create({
  baseURL: `https://task-scheduling-backend.herokuapp.com/`
})
