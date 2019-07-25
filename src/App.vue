<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="SlideBar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
.main {
  width: 90%;
  margin: 0 auto;
}
body {
  background-color: #e1e1e1;
}
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>