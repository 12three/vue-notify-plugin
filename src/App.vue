<template>
  <div id="app">
    <input type="text" v-model="value"/>
    <button @click="onClick">Push notification</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
        };
    },
    name: 'app',
    methods: {
        onClick() {
            this.$notify.push(this.value);
            this.value = '';
        },
    },
    components: {},
};
</script>
