import Vue from 'vue';
import NotificationListTemplate from './NotificationList.vue';

const NotificationList = Vue.extend(NotificationListTemplate);
const maxNotifsCount = 3;
const types = {};
const defaultNotifParams = {
    duration: 5000,
    showExpiration: true,
    closedByUser: false,
    closeOnClick: false,
    onClose: new Function(),
    onClick: new Function(),
};
let listInstance = null;
let idCounter = 1;

function createContainer() {
    if (!listInstance) {
        listInstance = new NotificationList({
            el: document.createElement('div'),
            data: {
                maxNotifsCount,
            },
        });

        document.body.appendChild(listInstance.$el);
    }
}

function addNewNotif(options) {
    return new Promise((fulfilled, rejected) => {
        if (listInstance) {
            listInstance.notifStack.push({
                ...defaultNotifParams,
                ...options,
                ...{ id: idCounter++ },
            });
            fulfilled();
        } else {
            rejected();
        }
    })
}

const VueNotify = {
    types: types,
    install(Vue) {
        const notifQueue = [];
        const delayBetweenPushing = 1000;
        let shouldWaitToPush = false;

        createContainer();

        Vue.prototype.$notify = {
            push(options) {
                /*
                    Method expects the following options:
                    {
                        msg: <str>,
                        description: <str>,
                        date: <str>,
                        icon: <str>,
                        duration: <number>,
                        showExpiration: <bool>,
                        closedByUser: <bool>,
                        closeOnClick: <bool>,
                        onClick: <func>,
                        onClose: <func>,
                    }
                */

                notifQueue.push(options);
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