import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'root',
    path: '/',
    components: {
      main: PostList
    }
  }, {
    name: 'post_content',
    path: '/topic/:id&author=:name',
    components: {
      main: Article,
      SlideBar
    }
  }, {
    name: 'user_info',
    path: 'userinfo/:name',
    components: {
      main: UserInfo
    }
  }, {
    name: 'tab',
    path: '/:tab',
    components: {
      main: PostList
    }
  }]
})
