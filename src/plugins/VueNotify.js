import NotificationTemplate from './Notification.vue';
import Vue from 'vue';
const Notification = Vue.extend(NotificationTemplate);

const messages = {
    alreadyInstalled: `VueNotify: plugin already installed`,
    containerAlreadyExists: `VueNotify: container already exists`,
};
const types = {};
const maxNotifsCount = 3;
let count = 1;
let notifContainer = null;

/*
TODO:
    Write tests!
*/

function createContainer() {
    if (!notifContainer) {
        notifContainer = document.createElement('div')
        notifContainer.className = 'js-notify-container b-notify'
        document.body.appendChild(notifContainer);
        notifContainer.style.zIndex = 100;
    } else {
        console.error(messages.containerAlreadyExists);
    }
}

function addNewNotif(options) {
    if (notifContainer) {
        const instance = new Notification({
            el: document.createElement('div'),
            data: {
                ...options,
                ...{ id: count++ }
            },
        })

        notifContainer.appendChild(instance.$el)
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
                addNewNotif(options)
            }
        }
    }
}

export default VueNotify