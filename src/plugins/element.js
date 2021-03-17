import Vue from 'vue'
// import from 'element-ui'
import { Button, Form, Input, FormItem, Row, Message } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
// Message为消息弹框组件，与上面不同，该组件导入需要挂载到Vue实体，使得每个Vue实例都能通过this调用
// 这里$message为自定义属性，可以随意更改
Vue.prototype.$message = Message
