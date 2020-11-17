import { ref, onMounted, onUnmounted, reactive, toRefs } from 'vue'
function useMousePos() {
  // 鼠标追踪器
  // const x = ref(0)
  // const y = ref(0)
  // const updateMouse = (e: MouseEvent) => {
  //   x.value = e.pageX
  //   y.value = e.pageY
  // }
  const pos = reactive({
    x: 0,
    y: 0,
    updateMouse: (e: MouseEvent) => {
       pos.x = e.pageX
       pos.y = e.pageY
    }
  })
  onMounted(() => {
    console.log('mounted')
    window.addEventListener('click', pos.updateMouse)
  })
  onUnmounted(() => {
    window.removeEventListener('click', pos.updateMouse)
  })
  return toRefs(pos)
}

export default useMousePos