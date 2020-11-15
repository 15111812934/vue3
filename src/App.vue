<template>
  <div>
    <span @click="increase">{{ count }}</span>
    <span>{{double}}</span>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue';
import { ref, computed, reactive, toRefs } from 'vue'
interface DataProps{
  count: number;
  double: number;
  increase: () => {};
} 
export default {
  name: 'App',
  // 准备,在生命周期之前运行,无实例,无this
  setup () {
    // 响应式对象
    // const count = ref(0)
    // const increase = () => {
    //   count.value ++
    // }
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // return {
    //   count,
    //   increase,
    //   double
    // }
    // 响应式
    const data = reactive({
      count: 0,
      increase: () => {
        data.count ++
      },
      double: computed(() => {
        return data.count * 2
      })
    })
    const refData = toRefs(data)  
    return {
      // data取出来会丧失响应式,要用toRefs
      // ...data,
      ...refData
    }
  }
  // vue2
  // data () {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   increase () {
  //     this.count ++ 
  //   }
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
