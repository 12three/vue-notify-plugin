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
let notifContainer = null;
let listInstance = null;
let idCounter = 1;

/*
TODO:
    Write tests!
*/

function createContainer() {
    if (!notifContainer) {
        listInstance = new NotificationList({
            el: document.createElement('div'),
            data: {
                maxNotifsCount,
            },
        })

        notifContainer = document.createElement('div')
        notifContainer.className = 'js-notify-container b-notify'
        document.body.appendChild(notifContainer);
        notifContainer.appendChild(listInstance.$el);
        notifContainer.style.zIndex = 100;
    } else {
        console.error(messages.containerAlreadyExists);
    }
}

function addNewNotif(options) {
    if (notifContainer && listInstance) {
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
                        duration: <numb>,
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