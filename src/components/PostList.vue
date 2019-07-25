<template>
  <div class="PostList">
    <!-- 设置加载动画 -->
    <div v-if="isLoading === true" class="loadoing">
      <img src="../assets/loading.gif" alt class="limg" />
    </div>
    <!-- 设置poslist -->
    <div class="posts" v-else>
      <ul>
        <li>
          <div class="topbar">
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'all'
              }
              }"
              class="tag_item"
            >
              <span class="tab_link">全部</span>
            </router-link>
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'good'
              }
            }"
            >
              <span class="tab_link">精华</span>
            </router-link>
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'share'
              }
            }"
              class="tag_item"
            >
              <span class="tab_link">分享</span>
            </router-link>
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'ask'
              }
            }"
              class="tag_item"
            >
              <span class="tab_link">问答</span>
            </router-link>
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'job'
              }
            }"
              class="tag_item"
            >
              <span class="tab_link">招聘</span>
            </router-link>
          </div>
        </li>
        <li v-for="post in post">
          <!-- 动态绑定加载头像 -->
          <img :src="post.author.avatar_url" alt />
          <span class="all_count">
            <span class="reply_count">{{post.reply_count}}</span>
            /
            <span class="visit_count">{{post.visit_count}}</span>
          </span>
          <span
            :class="[{put_good:(post.good  == true),put_top:(post.top  == true),
        'topiclist-tab':(post.good  != true && post.top  != true)}]"
          >{{post | formatTab}}</span>
          <router-link
            :to="{
            name:'post_content',
            params:{
              id:post.id,
              name:post.author.loginname
            }
          }"
          >
            <a class="post_title">{{post.title}}</a>
          </router-link>

          <span class="last_replytime">{{post.last_reply_at|formatDate}}</span>
        </li>
        <li>
          <pagination @handelList="renderList"></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "./Pagination";
export default {
  name: "postList",
  data() {
    return {
      isLoading: true,
      post: [],
      put_top: true,
      put_good: false,
      postpage: 1,
      goodpost: []
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            tab: this.$route.params.tab,
            page: this.postpage,
            limit: 20
          }
        })
        .then(result => {
          this.isLoading = false; //加载成功去除loading
          this.post = result.data.data;
          console.log(this.post);
        })
        .catch(err => {
          console.log(err);
        });
    },
    renderList(value) {
      this.postpage = value;
      this.getData();
    },
    changeActive() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
  components: {
    pagination
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
</script>

<style scoped>
.PostList {
  background-color: #e1e1e1;
}
.posts {
  margin-top: 10px;
}
.PostList img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.all_count {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.reply_count {
  color: #9e78c0;
  margin-right: -4px;
}
.visit_count {
  color: #b4b4b4;
  margin-left: -4px;
  font-size: 13px;
}
.posts ul {
  width: 1296px;
  margin: 0 auto;
  list-style: none;
  width: 100%;
  height: 30px;
}
.posts li:not(:first-child) {
  padding: 9px;
  background-color: #fff;
  margin-top: 2px;
  font-size: 14px;
}
.last_replytime {
  float: right;
  color: #778087;
  font-size: 12px;
  white-space: nowrap;
}
.topbar {
  height: 40px;
  background-color: #f5f5f5;
}

.topbar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}
.router-link-active .tab_link {
  background: #80bd01;
  padding: 2px 2px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: white !important;
  font-size: 14px;
  margin-right: 10px;
}
.topbar span:hover {
  color: #005580;
}

a {
  text-decoration: none;
  color: black;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}
.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}
.loadoing {
  text-align: center;
  padding-top: 300px;
}
.loadoing .limg {
  width: 250px;
  height: 200px;
}
</style>
