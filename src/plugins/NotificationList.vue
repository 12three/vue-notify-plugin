<template>
    <div class="notification-list">
        <notification
            v-for='notifData in notifsToShow'
            :key="notifData.id"
            :params='notifData'
            @remove="onRemove"/>
    </div>
</template>


<script>
import Notification from './Notification.vue';

export default {
    data() {
        return {
            notifStack: []
        }
    },
    computed: {
        notifsToShow() {
            return this.notifStack.slice(0, this.maxNotifsCount)
        }
    },
    methods: {
        onRemove(notifId) {
            const listPosition = this.notifStack.reduce((acc, item, i) => {
                return item.id === notifId ? i : acc;
            }, false)

            if ( listPosition !== false) {
                this.notifStack.splice(listPosition, 1)
            }
        },
    },
    components: {
        Notification
    }
}
</script>

<style lang="sass" scoped>
    .notification-list
        width: 300px
</style>

