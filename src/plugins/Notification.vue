<template>
    <div
        class="item"
        @mouseover="onMouseOver"
        @mouseleave="onMouseOut"
        @click="onNotifyClick">
        {{ id }}: {{ msg }}
        <button
            class="close-button"
            @click="onRemove">x</button>
    </div>
</template>

<script>
/*
TODO: Notification message should be able to:
    3. max count + queue
    5. api has short methods
    6. animations
    7. style

    Write tests!
*/

export default {
    name: 'Notification',
    data() {
        const defaultOptions = {
            duration: 3000,
            shouldBeClosedByUser: false,
            onClose: new Function(),
            onClick: new Function(),
        };

        return {
            ...defaultOptions,
            isCursorAbove: false,
        };
    },
    methods: {
        isCloseButton(elem) {
            return elem && elem.classList.contains('close-button');
        },
        destroy() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        onRemove() {
            this.onClose();
            this.destroy();
        },
        onMouseOver(){
            this.isCursorAbove = true;
        },
        onMouseOut() {
            this.isCursorAbove = false;
        },
        onNotifyClick(e) {
            if (!this.isCloseButton(e.target)) {
                this.onClick()
            }
        },
    },
    mounted() {
        if (!this.shouldBeClosedByUser) {
            setTimeout(() => {
                if (this.isCursorAbove) {
                    const timerId = setInterval(() => {
                        if (!this.isCursorAbove) {
                            clearInterval(timerId);
                            setTimeout(this.destroy, 300);
                        }
                    }, 1000)
                } else {
                    this.destroy();
                }
            }, this.duration)
        }
    }
};
</script>

<style lang="sass" scoped>
    .item
        padding: 10px 15px
        border: 1px solid black
        margin-bottom: 5px
</style>
