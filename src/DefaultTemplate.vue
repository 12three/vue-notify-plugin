<template>
    <div class="notification-content">
        <div
            v-if="icon"
            class="notification-content_logo"
            :style="{ backgroundImage: `url(${ icon })` }"
            >
        </div>
        <div class="notification-content_content">
            <div class="notification-content_header">
                <div class="notification-content_header-title">{{ message }}</div>
                <div class="notification-content_header-date">{{ date }}</div>
            </div>
            <div
                class="notification-content_description"
                v-if="description">
                {{ description }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'icon',
        'message',
        'date',
        'description',
    ]
}
</script>

<style lang="sass" scoped>
.notification-content
    display: flex
    padding: 10px

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
