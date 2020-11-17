import { ref } from 'vue'
import axios from 'axios'
function fetch(url: string) {
  const loading = ref(true)
  const err = ref(null)
  const resData = ref(null)
  axios.get(url).then(res => {
    resData.value = res.data
  }).catch((e) => {
    err.value = e
  }).finally(() => {
    loading.value = false
  })
  return {
    loading,
    err,
    resData
  }
}

export default fetch