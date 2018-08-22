<template>
  <div class="hello">
    <input type="text" v-model="notifText">
    <button @click="onClick">
      Emit notification
    </button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      notifText: ''
    }
  },
  methods: {
    onClick() {
      this.$notify.push({
        msg: this.notifText,
      })
      this.notifText = '';
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
