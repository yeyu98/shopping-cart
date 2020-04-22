/*
 * @Author: your name
 * @Date: 2020-04-16 09:44:57
 * @LastEditTime: 2020-04-20 09:39:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \源码e:\工作\shopping-cart\src\main.js
 */
import Vue from 'vue'
import { Button,Table,Input,Col,Row,Modal,message,Checkbox } from 'ant-design-vue'
// import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'

Vue.component(Button.name,Button)
Vue.component(Table.name,Table)
Vue.component(Input.name,Input)
Vue.component(Col.name,Col)
Vue.component(Row.name,Row)
Vue.component(Modal.name,Modal)
Vue.component(Checkbox.name,Checkbox)

// Vue.use(Antd)

Vue.prototype.$confirm = Modal.confirm //定义
Vue.prototype.$message = message


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
