<template>
    <div class="form">
        <div>
            <input
                type="text"
                v-model="notifText"
                @keyup.enter="submit">
        </div>
        <button
            class="form_button" @click="submit">
            Emit notification
        </button>
    </div>
</template>

<script>
export default {
    name: 'CreateNotificationForm',
    data() {
        return {
            notifText: '',
        };
    },
    methods: {
        submit() {
            this.$notify.push(this.notifText, {
                date: 'June 25',
                duration: 300000,
                description:
                    'Гарри Робертс поделился приёмами и инструментами, помогающими ему изучить незнакомую кодовую базу с легаси ',
                closeByUser: false,
                customTemplateOptions: {
                    a: 2,
                },
                closeOnClick: false,
                showExpiration: true,
                icon: '/user.png',
                onClose() {
                    console.log('close');
                    ``;
                },
                onClick() {
                    console.log('click');
                },
            });
            this.notifText = '';
        },
    },
    props: {
        msg: String,
    },
};
</script>

<style lang="sass" scoped>
    $green: #42b983

    .form
        display: inline-block
        background: white
        border: 1px solid #e3e3e3
        border-radius: 2px
        padding: 30px 20px

        &_button
            color: $green
            font-weight: bold
            border: 2px solid $green
            border-radius: 5px
            padding: 6px 10px
            margin-top: 5px
</style>
