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
        path: `${rootPath}UserList`,
        name: 'UserList',
        component: UserList
      },
      {
        path: `${rootPath}UserAdd`,
        name: 'UserAdd',
        component: UserAdd
      },
      {
        path: `${rootPath}UserUpdate`,
        name: 'UserUpdate',
        component: UserUpdate
      }
    ];


export default {routers}
