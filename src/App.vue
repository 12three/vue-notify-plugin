<template>
  <div id="app">
    <CreateNotificationForm/>
  </div>
</template>

<script>
import CreateNotificationForm from './components/CreateNotificationForm.vue'

export default {
  name: 'app',
  components: {
    CreateNotificationForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
