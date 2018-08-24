<template>
    <transition-group
        name="list"
        tag="div"
        class="notification-list">
        <notification
            v-for='notifData in notifsToShow'
            class="list-item"
            :key="notifData.id"
            :params='notifData'
            @remove="onRemove"/>
    </transition-group>
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
            return this.notifStack.slice(0, this.maxNotifsCount).reverse()
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
        position: absolute
        top: 20px
        right: 20px
        width: 300px

    .list-item
        position: relative
        opacity: 1

    .list-enter
        opacity: 0
        transform: translateY(-100%)

    .list-enter-active
        transition: all 1s

    .list-leave-to
        opacity: 0
        transform: translateY(50px)

    .list-leave-active
        position: absolute
        transition: all .5s

    .list-move
        transition: all 1s
</style>

