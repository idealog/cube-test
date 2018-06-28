<template>
	<div style="height:300px">
		<cube-scroll
		  ref="scroll"
		  :data="items"
		  :options="options"
		  @pulling-down="onPullingDown">
		</cube-scroll>
	</div>
</template>

<script type="text/javascript">
import sendToApp from 'sendToApp'
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: 'Refresh success'
        }
      }
    }
  },
  mounted(){
    sendToApp({
      'id':111,
      'name':'哈哈哈'
    })
  },
  methods: {
    onPullingDown() {
      // Mock async load.
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // If have new data, just update the data property.
          this.items.unshift('I am new data: ' + +new Date())
        } else {
          // If no new data, you need use the method forceUpdate to tell us the load is done.
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    }
  }
}

</script>
<style>
	
</style>