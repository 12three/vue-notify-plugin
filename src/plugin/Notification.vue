<template>
    <div
        class="notification"
        @mouseover="onMouseOver"
        @mouseleave="onMouseOut"
        @click="onNotifyClick">
        <div
            v-if="showExpiration"
            class="notification_expiration">
            <div
                class="notification_expiration-strip"
                :style="{ animationDuration: `${params.duration}ms` }"
            ></div>
        </div>
        <div class="notification_wrapper">
            <component :is="customTemplate || 'DefaultTemplate'"
                :icon="params.icon"
                :date="params.date"
                :message="params.msg"
                :description="params.description"
                :customOptions="params.customOptions"
                />
        </div>
    </div>
</template>


<script>
import Timer from './Timer.js';
import DefaultTemplate from './DefaultTemplate.vue'

/*
TODO:
    ? what can I do else

    # demo
    # own custom style
    # remove linters errors

    # write tests
*/

export default {
    name: 'Notification',
    data() {
        return {
            timer: null,
            isCursorAbove: false,
        };
    },
    computed: {
        showExpiration() {
            return this.params.showExpiration && ! this.params.closeByUser
        }
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
        onMouseOver() {
            if (!this.isCursorAbove) {
                this.isCursorAbove = true;
                if (this.timer) this.timer.pause();
            }
        },
        onMouseOut() {
            this.isCursorAbove = false;
            if (this.timer) this.timer.resume();
        },
        onNotifyClick(e) {
            const { onClick, closeOnClick } = this.params;

            if (!this.isCloseButton(e.target)) {
                onClick()
                if (closeOnClick) this.removeNotif()
            }
        },
    },
    mounted() {
        if (!this.params.closeByUser) {
            this.timer = new Timer(() => {
                this.removeNotif();
            }, this.params.duration)
        }
    },
    props: {
        params: {
            type: Object,
            required: true,
        },
        customTemplate: Object,
    },
    components: {
        DefaultTemplate,
    }
};
</script>


<style lang="sass" scoped>
    $timeout-strip-color: #5699d2
    @keyframes example
        from
            right: 100%
        to
            right: 0

    .notification
        display: flex
        flex-direction: column
        position: relative
        box-sizing: border-box
        font-size: 14px
        font-family: Helvetica,Arial,sans-serif
        color: #464b4f
        width: 100%
        min-height: 30px
        margin-bottom: 5px
        border-radius: 2px
        background-color: white
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)
        overflow: hidden

        &_expiration
            position: relative
            width: 100%
            height: 3px
            background-color: lighten($timeout-strip-color, 25%)

            &-strip
                position: absolute
                top: 0
                bottom: 0
                left: 0
                background-color: $timeout-strip-color
                animation-name: example
                animation-fill-mode: forwards
                animation-timing-function: linear

        &:hover &_expiration-strip
            animation-play-state: paused
</style>
