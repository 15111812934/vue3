<template>
  <div>
    <span @click="increase">{{ count }}</span>
    <span>{{double}}</span>
    <div>{{greeting}}</div>
    <div>X:{{x}}, Y:{{y}}</div>
    <Suspense>
      <template #default>
        <async-show></async-show>
      </template>
      <!-- 异步未返回时展示的结果 -->
      <template #fallback>
        <h1>loading...</h1>
      </template>
    </Suspense>
    <async-show></async-show>
    <div v-if="loading">loading....</div>
    <!-- <div v-else>{{err}}</div> -->
    <img v-else :src="resData" alt="">
    <div @click="updateGreeting">add</div>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue';
import { ref, computed, reactive, toRefs, onMounted, onUnmounted, onUpdated, onRenderTriggered, watch, onErrorCaptured } from 'vue'
import useMousePos from './hooks/useMousePos'
// import fetch from './hooks/useURLLoader'
import asyncShow from './components/asyncShow.vue'
interface DataProps{
  count: number;
  increase: () => void;
  double: number;
} 
export default {
  name: 'App',
  components: {
    asyncShow
  },
  // 准备,在生命周期之前运行,,无this
  setup () {
    const err = ref(null)
    onErrorCaptured((e: any) => {
      err.value = e
      return true
    })
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
    onUpdated(() => {
      console.log('update')
    })
    // 调试
    onRenderTriggered((event) => {
      console.log(event)
    })
    // 响应式
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count ++
      },
      double: computed(() => {
        return data.count * 2
      })
    })
    const refData = toRefs(data)
    const greeting = ref('')
    const updateGreeting = () => {
      greeting.value += 'Hello'
    }
    // 监控响应式对象
    // watch([greeting, data], (newVal, oldVal) => {
    //   console.log(newVal)
    //   document.title = greeting.value + data.count
    // })
    // 单独watch响应式对象中的单个值
    watch([greeting, () => data.count], (newVal, oldVal) => {
      console.log(newVal)
      document.title = greeting.value + data.count
    })
    // 更新时不触发,因为setup函数只触发一次,使用watch
    document.title = greeting.value
    // 清楚来源
    const { x, y } = useMousePos()
    // const { loading, err, resData} = fetch('https://www.baidu.com/link?url=RHe7qW5Z9aV_w4Zqh8ileIt5YO5H7tgZNfZ30xhIq2jgVeXVdTnjte6giIdAGhr4a__NW7EVTlZveYKaxWeMhMRIjgObXmlerFJt3e3bmF2usBcFzWi_fFMf_t4jt8bF2VyN-BxXTcp2VI-S-T6X01g-uTEdFyV9Imnzb_A9jTlqCJc-1RHsy55FZY6_VMngFh9yjtZZjLV9JvpbE3luENM9HBax9YkXPcopF2W7MQb-19zpY6UkTrTrxO-xpUacnUiIbYswqhU4WDwUn6wDiLZeev26bQ-RNtTokwnVYFmnAEvGXaYofZISjjYnIK84OUP5N0vE0I84Sw-f-yNWdmTTeZOHPjpZ8gV84OAZttAMiolxv5f-k2uu1uFxxOt8IGulEPRE-fLfxPnFgY_rlZ9nXHWtjYMvRE6INxQaimq5iUCNdvXxCNcCvtIFYfRuNJ23FfUolyWtolznPeakT8llXrkclnaPiR41E-mqM29BQ-zZsSupjGAXgvYiQKwPPo5LU_g_thCcTHOBDIw2JbEwUgw0a7GJ07PisNqh49BWoutQUBLGsUMAWiRBRFdyUg_k8Srouh3nagZC0OqWhd6Zc4Av-QQiypzOLtK0z8m&timg=https%3A%2F%2Fss0.bdstatic.com%2F94oJfD_bAAcT8t7mm9GUKT-xh_%2Ftimg%3Fimage%26quality%3D100%26size%3Db4000_4000%26sec%3D1605621333%26di%3Dd7a0d02d7b8e8b8f7052651a59099c9e%26src%3Dhttp%3A%2F%2Fa4.att.hudong.com%2F27%2F67%2F01300000921826141299672233506.jpg&click_t=1605621362118&s_info=1519_722&wd=&eqid=cfb352ec0003929e000000065fb3d654')
    return {
      // data取出来会丧失响应式,要用toRefs
      // ...data,
      // loading,
      // err,
      // resData,
      x,
      y,
      greeting,
      updateGreeting,
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
