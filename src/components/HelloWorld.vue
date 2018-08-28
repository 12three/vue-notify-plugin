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
      notifText: '',
    }
  },
  methods: {
    submit() {
      this.$notify.push(this.notifText, {
        date: 'June 25',
        duration: 3000,
        description: 'Гарри Робертс поделился приёмами и инструментами, помогающими ему изучить незнакомую кодовую базу с легаси ',
        closeByUser: false,
        closeOnClick: true,
        showExpiration: true,
        icon: '/user.png',
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
