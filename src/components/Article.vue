<template>
  <div class="article">
    <!-- 设置加载动画 -->
    <div v-if="isLoading === true" class="loadoing">
      <img src="../assets/loading.gif" alt class="limg" />
    </div>
    <div v-else>
      <!-- 设置题目信息 -->
      <div class="topic_header">
        <div>
          <!-- 获取当前文章的tab -->
          <span
            :class="[{put_good:(post.good  == true),put_top:(post.top  == true),
        'topiclist-tab':(post.good  != true && post.top  != true)}]"
          >{{post | formatTab}}</span>
          <span class="topic_title">{{post.title}}</span>
        </div>
        <!-- 作者信息 -->
        <ul class="clearfix">
          <li>•发布于：{{post.create_at | formatDate}}</li>
          <li>•作者：{{post.author.loginname}}</li>
          <li>•{{post.visit_count}}次浏览</li>
          <li>•来自{{post | formatTab}}</li>
        </ul>
        <div class="markdown-body">
          <div v-html="post.content" class="topic_content"></div>
        </div>
      </div>
      <!-- 设置回复 -->
      <div class="reply">
        <div class="topbar">{{post.replies.length}} 回复</div>
        <div v-for="(reply,index)  in post.replies" class="replySec">
          <router-link
            :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }"
          >
            <img :src="reply.author.avatar_url" alt />
          </router-link>
          <router-link
            :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }"
          >
            <span class="author_name">{{reply.author.loginname}}</span>
          </router-link>
          <span>{{index+1}}楼</span>
          <span>•{{reply.create_at | formatDate}}</span>
          <p v-html="reply.content" class="reply_content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      post: {
        author: {},
        replies: {}
      },
      isLoading: true
    };
  },
  methods: {
    getAticleData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(result => {
          if (result.data.success == true) {
            this.isLoading = false; //加载成功去除loading
            this.post = result.data.data;
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getAticleData();
  },
  watch: {
    $route(to, from) {
      this.isLoading = true;
      this.getAticleData();
    }
  }
};
</script>

<style>
@import url("../assets/github-markdown");
.article {
  margin-right: 300px;
  margin-top: 15px;
}
.topic_header {
  background-color: white;
  padding: 12px;
  border-radius: 3px 3px 0 0;
}
.topic_title {
  font-size: 22px;
  font-weight: 700;
}
.topic_header ul {
  margin: 10px 0;
  list-style: none;
  height: 40px;
}
.topic_header li {
  float: left;
  color: #838383;
  font-size: 12px;
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
.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.reply img {
  width: 30px;
  height: 30px;
  border-radius: 4px;
}
.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  color: #444444;
  height: 16px;
  font-size: 14px;
  margin-top: 10px;
}
.replySec {
  background-color: white;
  padding: 15px 10px;
  margin-top: 1px;
  font-size: 15px;
}
.replySec span {
  color: #0088cc;
  font-size: 12px;
  vertical-align: top;
}
.replySec .author_name {
  color: #666666;
  font-weight: 900;
}
.replySec .reply_content {
  margin-left: 40px;
  margin-top: -16px;
}
.replySec .reply_content a {
  text-decoration: none;
  color: #0088cc;
}
router-link {
  text-decoration: none;
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
