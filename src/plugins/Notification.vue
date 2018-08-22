<template>
    <div>
        {{id}}: {{ msg }} <button @click="onRemove">x</button>
    </div>
</template>


<script>
/*
TODO: Notification message should be able to:
    1. expire timeout
    2. has link
    3. wait for close
    4. timeout

    Write tests!
*/

export default {
    data() {
        return {};
    },
    methods: {
        onRemove() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }
    }
};
</script>