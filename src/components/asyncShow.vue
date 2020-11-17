<template>
  <div>
    <h1>{{ result }}</h1>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve({
            result: 43
          })
        }, 5000)
      })
    }
  })

</script>