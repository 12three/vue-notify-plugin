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
                :style="{animationDuration: `${params.duration}ms`}"
            ></div>
        </div>
        <div class="notification_wrapper">
            <div
                v-if="params.icon"
                class="notification_logo"
                :style="{backgroundImage: `url(${ params.icon })`}"
                ></div>
            <div class="notification_content">
                <div class="notification_header">
                    <div class="notification_header-title">{{ params.msg }}</div>
                    <div class="notification_header-date">{{ params.date }}</div>
                </div>
                <div
                    class="notification_description"
                    v-if="params.description">
                    {{ params.description }}
                </div>
            </div>

            <button
                v-if="false"
                class="close-button"
                @click="onRemove">x</button>
        </div>
    </div>
</template>


<script>
import Timer from './Timer.js';

/*
TODO:
    # api should have short methods
    # right image
    # position
    ? what can I do else

    # demo
    # description
    # publish on npm

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
            return this.params.showExpiration && !this.params.shouldBeClosedByUser
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
        onMouseOver(e) {
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
            if (!this.isCloseButton(e.target)) {
                this.params.onClick()
            }
        },
    },
    mounted() {
        if (!this.params.shouldBeClosedByUser) {
            this.timer = new Timer(() => {
                this.removeNotif();
            }, this.params.duration)
            this.timer.start();
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
        min-height: 50px
        margin-bottom: 5px
        border-radius: 5px
        border: 1px solid #f2f2f2
        background-color: white
        box-shadow: 0 3px 5px 0 rgba(50,50,50,.1)
        overflow: hidden

        &_wrapper
            display: flex
            padding: 10px

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

        &_logo
            flex: 0 0 50px
            width: 50px
            height: 50px
            margin-right: 10px
            border-radius: 25px
            background-color: #f2f2f2
            background-size: cover

        &_content
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1

        &_header
            display: flex

            &-title
                flex: 1
                text-transform: capitalize
                font-weight: bold

            &-date
                color: grey

        &_description
            margin-top: 5px
</style>
