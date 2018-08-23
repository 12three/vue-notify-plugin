<template>
    <div
        class="item"
        @mouseover="onMouseOver"
        @mouseleave="onMouseOut"
        @click="onNotifyClick">
        {{ params.id }}: {{ params.msg }}
        <button
            class="close-button"
            @click="onRemove">x</button>
    </div>
</template>


<script>

/*
TODO: Notification message should be able to:
    5. api has short methods
    6. animations
    7. style

    Write tests!
*/

export default {
    name: 'Notification',
    data() {
        return {
            isCursorAbove: false,
        };
    },
    methods: {
        isCloseButton(elem) {
            return elem && elem.classList.contains('close-button');
        },
        removeNotif() {
            this.$emit('remove', this.params.id)
        },
        onRemove() {
            this.params.onClose();
            this.removeNotif();
        },
        onMouseOver(){
            this.isCursorAbove = true;
        },
        onMouseOut() {
            this.isCursorAbove = false;
        },
        onNotifyClick(e) {
            if (!this.isCloseButton(e.target)) {
                this.params.onClick()
            }
        },
    },
    mounted() {
        if (!this.params.shouldBeClosedByUser) {
            setTimeout(() => {
                if (this.isCursorAbove) {
                    const timerId = setInterval(() => {
                        if (!this.isCursorAbove) {
                            clearInterval(timerId);
                            setTimeout(this.removeNotif, 300);
                        }
                    }, 1000)
                } else {
                    this.removeNotif();
                }
            }, this.params.duration)
        }
    },
    props: {
        params: {
            type: Object,
            required: true,
        },
    }
};
</script>

<style lang="sass" scoped>
    .item
        padding: 10px 15px
        border: 1px solid black
        margin-bottom: 5px
</style>
