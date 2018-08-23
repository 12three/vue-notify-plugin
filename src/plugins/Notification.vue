<template>
    <div
        class="item"
        @mouseover="onMouseOver"
        @mouseleave="onMouseOut">
        {{id}}: {{ msg }}<button @click="onRemove">x</button>
    </div>
</template>


<script>
/*
TODO: Notification message should be able to:
    2. has link
    3. wait for close
    4. timeout
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
        };

        return {
            ...defaultOptions,
            isCursorAbove: false,
        };
    },
    methods: {
        destroy() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        onRemove() {
            this.destroy();
        },
        onMouseOver(){
            this.isCursorAbove = true;
        },
        onMouseOut() {
            this.isCursorAbove = false;
        }
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
