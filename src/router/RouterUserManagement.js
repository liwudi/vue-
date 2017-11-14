/**
 * Created by cryst on 2017/11/14.
 */
import Home from '../views/Home.vue';
const UserAdd = () => import ('../views/UserManagement/UserAdd.vue');
const UserList = () => import ('../views/UserManagement/UserList.vue');
const UserUpdate = () => import ('../views/UserManagement/UserUpdate.vue');
const rootPath = '/um/';
const routers = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path: `${rootPath}list`,
        name: 'UserList',
        component: UserList
      },
      {
        path: `${rootPath}add`,
        name: 'UserAdd',
        component: UserAdd
      },
      {
        path: `${rootPath}update`,
        name: 'UserModify',
        component: UserUpdate
      }
    ]
  }
]
function setRouter (router) {
  window.r = router;
  console.info('router', router);
  router.addRoutes(routers);
  console.info(123)
}

export default {setRouter}
