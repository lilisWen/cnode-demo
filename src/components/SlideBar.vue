<template>
  <div class="slidebar">
    <div class="authersummay">
      <div class="toobar">作者</div>
      <router-link
        :to="{
          name:'user_info',
          params:{
              name:user.loginname
          }
        }
          "
      >
        <img :src="user.avatar_url" alt />
      </router-link>
      <router-link
        :to="{
          name:'user_info',
          params:{
              name:user.loginname
          }
        }
          "
      >
        <span class="username">{{user.loginname}}</span>
      </router-link>
      <p class="score">积分：{{user.score}}</p>
    </div>
    <div class="rencent_topics">
      <div class="toobar">作者最近创建话题</div>
      <ul>
        <li v-for="topic in topcilimitby5">
          <router-link
            :to="{
            name:'post_content',
            params:{
              id:topic.id,
              name:topic.author.loginname
            }
          }"
          >{{topic.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="toobar">作者最近参加话题</div>
      <ul>
        <li v-for="topic in replylimitby5">
          <router-link
            :to="{
              name:'post_content',
              params:{
                  id:topic.id,
                  name:topic.author.loginname
              }
              }"
          >{{topic.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "slidebar",
  data() {
    return {
      user: {
        author: {}
      }
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
          console.log(this.user.recent_topics);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    topcilimitby5() {
      if (this.user.recent_topics) {
        return this.user.recent_topics.slice(0, 5);
      }
    },
    replylimitby5() {
      if (this.user.recent_replies) {
        return this.user.recent_replies.slice(0, 5);
      }
    }
  },
  beforeMount() {
    this.getuserData();
  }
};
</script>

<style scoped>
.slidebar {
  width: 280px;
  float: right;
  margin-top: 0;
}
.authersummay,
.recent_replies,
.rencent_topics {
  margin-bottom: 5px;
}
.authersummay {
  background-color: #fff;
}
.toobar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 13px;
}
img {
  width: 48px;
  height: 48px;
  margin: 10px;
}
.username {
  display: inline-block;
  color: #778087;
  vertical-align: top;
  margin-top: 15px;
}
.authersummay .score {
  font-size: 14px;
  margin-left: 10px;
}
.rencent_topics li,
.recent_replies li {
  background-color: #fff;
  font-size: 14px;
  padding: 10px;
  margin-bottom: 1px;
}
</style>
