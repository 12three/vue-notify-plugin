<template>
  <div class="hello">
    <input
      type="text"
      v-model="notifText"
      @keyup.enter="submit">
    <button @click="submit">
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
    submit() {
      this.$notify.push({
        msg: this.notifText,
        date: 'June 25',
        description: 'Гарри Робертс поделился приёмами и инструментами, помогающими ему изучить незнакомую кодовую базу с легаси ',
        shouldBeClosedByUser: true,
        onClose() {
          console.log('close');
        },
        onClick() {
          console.log('click');
        },
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
