import Vue from 'vue';
import NotificationListTemplate from './NotificationList.vue';

const NotificationList = Vue.extend(NotificationListTemplate);
const types = {};
const defaultNotifParams = {
    duration: 5000,
    showExpiration: true,
    closeByUser: false,
    closeOnClick: false,
    onClose: new Function(),
    onClick: new Function(),
};
let listInstance = null;
let idCounter = 1;

function createContainer(options) {
    if (!listInstance) {
        listInstance = new NotificationList({
            el: document.createElement('div'),
            data: {
                options
            },
        });

        document.body.appendChild(listInstance.$el);
    }
}

function addNewNotif(options) {
    return new Promise((fulfilled, rejected) => {
        if (listInstance) {
            listInstance.notifStack.push(Object.assign(
                {},
                defaultNotifParams,
                options,
                { id: idCounter++ },
            ));
            fulfilled();
        } else {
            rejected();
        }
    })
}

const VueNotify = {
    types: types,
    install(Vue, instanceOptions = {}) {

        /*
            Main options:
            {
                position: 'top-right' || 'top-left' || 'bottom-right' || 'bottom-left',
                maxNotifsCount: <numb>,
                customTemplate: <obj>,
            }
        */

        const notifQueue = [];
        const delayBetweenPushing = 1000;
        const options = Object.assign(
            {},
            {
                position: 'top-right',
                maxNotifsCount: 3,
            },
            instanceOptions
        );
        let shouldWaitToPush = false;

        createContainer(options);

        Vue.prototype.$notify = {
            push(msg, options) {
                if (!msg) return

                /*
                    Method expects the following options:
                    {
                        description: <str>,
                        date: <str>,
                        icon: <str>,
                        duration: <number>,
                        customOptions: <obj>,
                        showExpiration: <bool>,
                        closeByUser: <bool>,
                        closeOnClick: <bool>,
                        onClick: <func>,
                        onClose: <func>,
                    }
                */

                notifQueue.push(Object.assign(
                    {},
                    { msg },
                    options
                ));
                if (!shouldWaitToPush) {
                    shouldWaitToPush = true;

                    addNewNotif(notifQueue.shift()).then(
                        () => {
                            const timerId = setInterval(
                                () => {
                                    if (
                                        notifQueue.length
                                    ) {
                                        addNewNotif(
                                            notifQueue.shift(),
                                        );
                                    } else {
                                        clearInterval(
                                            timerId,
                                        );
                                        shouldWaitToPush = false;
                                    }
                                },
                                delayBetweenPushing,
                            );
                        },
                    );
                }
            }
        }
    }
}

export default VueNotify