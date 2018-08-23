import Vue from 'vue';
import NotificationListTemplate from './NotificationList.vue';

const NotificationList = Vue.extend(NotificationListTemplate);
const messages = {
    alreadyInstalled: `VueNotify: plugin already installed`,
    containerAlreadyExists: `VueNotify: container already exists`,
};
const maxNotifsCount = 3;
const types = {};
const defaultNotifParams = {
    duration: 3000,
    shouldBeClosedByUser: false,
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
    } else {
        console.error(messages.containerAlreadyExists);
    }
}

function addNewNotif(options) {
    if (listInstance) {
        listInstance.notifStack.push({
            ...defaultNotifParams,
            ...options,
            ...{ id: idCounter++ },
        });
    }
}

const VueNotify = {
    types: types,
    installed: false,
    install(Vue, pluginOption) {
        if (this.installed) {
            return console.error(messages.alreadyInstalled);
        }
        createContainer();

        Vue.prototype.$notify = {
            push(options) {
                /*
                    Method expects the following options:
                    {
                        msg: <str>,
                        description: <str>,
                        date: <str>,
                        duration: <number>,
                        shouldBeClosedByUser: <bool>,
                        onClick: <func>,
                        onClose: <func>,
                    }
                */

                addNewNotif(options);
            }
        }
    }
}

export default VueNotify