<template>
  <div class="user_info">
    <p class="bar zhuye">主页</p>
    <section class="info">
      <img :src="user.avatar_url" alt />
      <span class="name">{{user.loginname}}</span>
      <p class="score">{{user.score}}积分</p>
      <p>github {{user.githubUsername}}</p>
      <p class="create_at">注册时间：{{user.create_at | formatDate}}</p>
    </section>
    <div class="topics">
      <p class="bar">最近创建的主题</p>
      <ul>
        <li v-for="item in user.recent_topics">
          <img :src="item.author.avatar_url" alt />
          <router-link
            :to="{
            name:'post_content',
            params:{
              id:item.id,
             name:item.author.loginname
            }
            }"
          >
            <span class="title">{{item.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="replies">
      <p class="bar">最近参与的话题</p>
      <ul>
        <li v-for="item in user.recent_replies">
          <img :src="item.author.avatar_url" alt />
          <router-link
            :to="{
            name:'post_content',
            params:{
              id:item.id,
              name:item.author.loginname
            }
            }"
          >
            <span class="title">{{item.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "user_info",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getuserData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(result => {
          if (result.data.success) {
            this.user = result.data.data;
          }
          console.log(this.user);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getuserData();
  }
};
</script>

<style scoped>
.user_info {
  margin-right: 300px;
  margin-top: 15px;
}
.bar {
  padding: 10px;
  background-color: #f6f6f6;
  color: #444444;
  height: 16px;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 3px 3px 0 0;
  margin-bottom: 1px;
}
.zhuye {
  color: #80bd01;
}
.info {
  background-color: #fff;
  padding: 10px;
  font-size: 14px;
  color: #778087;
}
img {
  width: 40px;
  height: 40px;
}
.info .name {
  vertical-align: top;
  margin-left: 5px;
}
.info .score {
  color: #333333;
  margin: 5px 0;
}
.info .create_at {
  color: #ababab;
  margin: 10px 0;
}
ul {
  list-style: none;
}
li {
  background-color: #fff;
  margin-top: 1px;
  padding: 10px;
}
.title {
  display: inline-block;
  color: #0088cc;
  cursor: pointer;
  vertical-align: top;
  margin-top: 10px;
  margin-left: 10px;
}
.title:hover {
  color: #005580;
}
</style>
