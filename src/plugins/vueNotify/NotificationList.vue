<template>
    <transition-group
        name="list"
        tag="div"
        class="notification-list"
        :class="wrapperClass">
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
        },
        wrapperClass() {
            switch (this.options.position) {
                case 'top-right':
                    return { 'notification-list--top-right': true }
                case 'top-left':
                    return { 'notification-list--top-left': true }
                case 'bottom-right':
                    return { 'notification-list--bottom-right': true }
                case 'bottom-left':
                    return { 'notification-list--bottom-left': true }
            }
        },
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

        &--top-right
            margin-top: 10px
            margin-right: 10px
            top: 0
            right: 0

        &--top-left
            margin-top: 10px
            margin-left: 10px
            top: 0
            left: 0

        &--bottom-right
            margin-bottom: 10px
            margin-right: 10px
            bottom: 0
            right: 0

        &--bottom-left
            margin-bottom: 10px
            margin-left: 10px
            bottom: 0
            left: 0

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

