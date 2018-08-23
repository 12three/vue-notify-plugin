<template>
    <div>
        <notification
            v-for='notifData in notifStack'
            :key="notifData.id"
            :params='notifData'
            @remove="onRemoveTime"/>
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
    methods: {
        onRemoveTime(notifId) {
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
