<template>
    <div
        class="notification"
        @mouseover="onMouseOver"
        @mouseleave="onMouseOut"
        @click="onNotifyClick">
        <div class="notification_logo"></div>
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
</template>


<script>

/*
TODO: Notification message should be able to:
    5. api has short methods
    6. animations

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
    .notification
        display: flex
        font-size: 14px
        font-family: Helvetica,Arial,sans-serif
        color: #464b4f
        width: 100%
        min-height: 50px
        padding: 10px
        margin-bottom: 5px
        border-radius: 5px
        border: 1px solid #f2f2f2
        box-shadow: 0 3px 5px 0 rgba(50,50,50,.1)

        &_logo
            flex: 0 0 50px
            width: 50px
            height: 50px
            margin-right: 10px
            border-radius: 25px
            background-color: #f2f2f2

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
