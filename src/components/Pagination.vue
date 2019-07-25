<template>
  <div>
    <button @click="changeBtn">首页</button>
    <button class="pre" @click="changeBtn">上一页</button>
    <button
      v-for=" btn in pagebtns"
      @click="changeBtn(btn)"
      :class="[{currentpage:currentpage === btn}]"
    >{{btn}}</button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "pagination",
  data() {
    return {
      pagebtns: [1, 2, 3, 4, 5, "....."],
      currentpage: 1
    };
  },
  methods: {
    changeBtn(page) {
      if (typeof page != "number") {
        switch (page.target.innerText) {
          case "首页":
            this.pagebtns = [1, 2, 3, 4, 5, "....."];
            this.changeBtn(1);
            break;
          case "下一页":
            $("button.currentpage")
              .next()
              .click();
            break;
          case "上一页":
            $("button.currentpage")
              .prev()
              .click();
            break;
          default:
            break;
        }
        return;
      }
      this.currentpage = page;
      if (page == this.pagebtns[4]) {
        this.pagebtns.shift();
        this.pagebtns.splice(4, 0, this.pagebtns[3] + 1);
      } else if (page == this.pagebtns[0] && page != 1) {
        this.pagebtns.unshift(this.pagebtns[0] - 1);
        this.pagebtns.splice(5, 1);
      }
      this.$emit("handelList", this.currentpage);
    }
  }
};
</script>

<style scoped>
button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  height: 21px;
  cursor: pointer;
  padding: 0 2px;
  width: 55px;
  height: 29px;
}
.currentpage {
  background-color: #80bd01;
  color: white;
}
</style>
