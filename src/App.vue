<!--
 * @Author: your name
 * @Date: 2020-04-16 09:44:57
 * @LastEditTime: 2020-04-20 09:29:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \源码e:\工作\shopping-cart\src\App.vue
 -->
<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script>
import Main from '@/components/Main'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style lang="less">
html,body{
  padding: 0;
  margin: 0;
  height: 100vh;
}
#app {
  font-family: "微软雅黑Light",Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.ant-table-pagination,.ant-pagination {
  display:none;
}
</style>
