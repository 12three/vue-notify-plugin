<template>
  <div id="app">
    <button @click="onClick">Push notification</button>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    onClick(){
      this.$notify.push('WOW!')
    }
  },
  components: {
  }
}
</script>