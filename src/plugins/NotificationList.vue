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
        position: absolute
        width: 300px

    .list-item
        position: relative
        z-index: 2
        transition: all 1s
        margin-right: 10px

    .list-leave-to
        z-index: 0
        opacity: 0
        transition: all 0.6s
        box-shadow: 0 3px 5px 0 rgba(50,50,50,0)
        transform: translateY(25px)

    .list-enter
        z-index: 0
        opacity: 0
        transform: translateY(50px)

    .list-move
        opacity: 1
        z-index: 2

    .list-leave-active
        position: absolute
        z-index: 1

    .flist-move
        z-index: 2
        opacity: 0

</style>

