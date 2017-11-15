/**
 * Created by cryst on 2017/11/14.
 */
import Home from '../views/Home.vue';
const UserAdd = () => import ('../views/UserManagement/UserAdd.vue');
const UserList = () => import ('../views/UserManagement/UserList.vue');
const UserUpdate = () => import ('../views/UserManagement/UserUpdate.vue');
const rootPath = '';
const routers = [
  {
    path: '',
    name: 'home',
    component: Home,
    children:[
      {
        path: `${rootPath}UserList`,
        name: 'userList',
        component: UserList
      },
      {
        path: `${rootPath}UserAdd`,
        name: 'userAdd',
        component: UserAdd
      },
      {
        path: `${rootPath}UserUpdate`,
        name: 'userUpdate',
        component: UserUpdate
      }
    ]
  }
];
function setRouter (router) {
  window.r = router;
  console.info('router', router);
  router.addRoutes(routers);
  console.info(123)
}

export default {setRouter}
