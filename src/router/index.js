import Vue from 'vue'
import Router from 'vue-router'
const Recommend = r => require.ensure([], () => (require('@/components/knowledge/children/Recommend')) , 'Recommend')
const Category = r => require.ensure([], () => (require('@/components/knowledge/children/Category')) , 'Category')
const Test  = r => require.ensure([], () => (require('@/components/test/Test')) , 'Test');
const SongList  = r => require.ensure([], () => (require('@/components/songlist/SongList')) , 'SongList'); //专辑列表
const TagList = r => require.ensure([], () => (require('@/components/tag/TagList')) , 'TagList'); // 标签列表

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/knowledge/category',
        component: Category
    },{
        path: '/knowledge/recommend',
        component: Recommend
    },
    {
        path: '/test',
        component: Test,
        meta: {
            title: '测试组件'
        }
    },
    {
        path: '/songlist',
        component: SongList
    },
    {
        path: '/taglist',
        component: TagList
    },


    { path: "/", redirect: '/knowledge/recommend' }
  ]
})
