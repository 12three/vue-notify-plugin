# Vue-notify 💬
Vue-notify is vue plugin for non-blocking notifications.

## Installation
```
npm install vue-notify-plugin
```
or
```
yarn add vue-notify-plugin
```

## Configuration
```js
import Vue from 'vue';
import VueNotifyPlugin from 'vue-notify-plugin';
import customTemplate from 'customTemplate.vue';

Vue.use(VueNotifyPlugin, {
    position: 'top-left'
});
```

### Initialization params:
All options are optional.

|Name	|Type	|Default	|Desciption|
| ------ | ------ | ------ | ------ |
| position | String | 'top-right' | The location of the notifications, currently possible: `top-right`, `top-left`, `bottom-right`, `bottom-left` |
|maxNotifsCount|Number|3|Maximum number of notifications that can be shown in notification holder|
|customTemplate|Obj|-|Expect vue component that will be used as a tempalte of notification content. Will get following props: `message`, `icon`, `data`, `description`, `customTemplateOptions`|

## Usage
In any of your vue-components, simply call this methods:
```js
this.$notify.push("Hello world!", [options])
```
Each notification expects message as first required argument.

### Notification options:
All props are optional.

|Name	|Type	|Default	|Desciption|
| ------ | ------ | ------ | ------ |
|duration|Number|5000|The amount of milliseconds that the animation should take|
|showExpiration|Boolean|true|Dispaly expiration progress bar|
|closeByUser|Boolean|false|Make user to close notification by himself|
|closeOnClick|Boolean|false|Close notification on click|
|description|String|-|More detail notification description|
|date|String|-|Date|
|icon|String|-|Url of icon|
|customTemplateOptions|Object|-|Additional params for custom template|
|onClick|Function|-|Cotification click handler, except click on close button|
|onClose|Function|-|Close button click handler|

## Development
### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```
