<template>
  <div class="nav-bar clearfix">
    <router-link :to="{
        name:'root'
        }">
      <img src="../assets/cnodejs_light.svg" alt />
    </router-link>
    <ul class="clearfix">
      <li>
        <a href="#">首页</a>
      </li>
      <li>
        <a href="#">新手入门</a>
      </li>
      <li>
        <a href="#">API</a>
      </li>
      <li>
        <a href="#">关于</a>
      </li>
      <li>
        <a href="#">注册</a>
      </li>
      <li>
        <a href="#">登录</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.nav-bar {
  background-color: #444;
  height: 40px;
  padding: 5px;
}
img {
  max-width: 120px;
  margin-left: 67px;
  margin-top: 3px;
}
ul {
  list-style: none;
  float: right;
  margin-right: 67px;
  margin-top: -8px;
}
li {
  float: left;
  padding: 15px;
}
a {
  font-size: 13px;
  color: #ccc;
  text-decoration: none;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>


