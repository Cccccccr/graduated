// needUserLogin: 需要用户登录态
// adminRole: 需要的管理员权限
import { adminRole, adminRoleArr } from './adminRoles';

const adminRouter = [
  {
    path: '/admin',
    redirect: '/admin/home',
  },
  {
    path: '/admin/login',
    loader: () => import('@/pages/admin/Login'),
  },
  {
    path: '/admin/home',
    loader: () => import('@/pages/admin/Home'),
    routerConfig: {
      adminRoles: [...adminRoleArr],
    },
  },
  {
    path: '/admin/unreachable',
    loader: () => import('@/pages/admin/Login'),
    routerConfig: {
      adminRoles: [],
    },
  },
]

const router = [
  {
    path: '/',
    exact: true,
    redirect: '/home',
  },
  {
    path: '/transit',
    loader: () => import('@/pages/TransitPage')
  },
  {
    path: '/login',
    loader: () => import('@/pages/Login'),
    routerConfig: {
      needUserLogin: false,
    },
  },
  {
    path: '/editor',
    loader: () => import('@/pages/Editor'),
    routerConfig: {
      needUserLogin: true,
    },
  },
  {
    path: '/user',
    loader: () => import('@/pages/User'),
    routerConfig: {
      needUserLogin: true,
    },
    childRoutes: [
      {
        path: '/user/article',
        loader: () => import('@/pages/Login'),
        routerConfig: {
          needUserLogin: true,
        },
      },
    ],
  },
  {
    path: '/home',
    loader: () => import('@/pages/Home'),
    childRoutes: [
      {
        path: '/home/login',
        loader: () => import('@/pages/Login'),
      },
      {
        path: '/home/next',
        loader: () => import('@/pages/Lazy'),
        childRoutes: [
          {
            path: '/home/next/abc',
            loader: () => import('@/pages/About'),
          },
        ],
      },
    ],
  },
  ...adminRouter
];
const { routerArr: normalRouter, redirectArr: redirectRouter } = handleRouter(
  router
);

export { normalRouter, redirectRouter };
export default router;

function handleRouter(router) {
  const routerArr = [],
    redirectArr = [];
  // 第四个参数是标识对childRoutes进行遍历
  handleRouterArr(router, routerArr, redirectArr);
  console.log(routerArr, redirectArr);
  return { routerArr, redirectArr };
}

// 如果判断到时childRoutes时进行
function handleRouterArr(router, targetRouter, redirectArr) {
  router.forEach(item => {
    if (item.redirect && !item.exact) {
      // console.log('redirect', item);
      // 是重定向的放到重定向数组中（把exact当正常的路由进行处理）
      redirectArr.push(item);
      if (item.childRoutes) {
        // 如果有子路由，对子路由进行遍历
        item.childRoutes.forEach(childitem => {
          if (childitem.redirect) {
            // 如果子路由还是重定向，把它加入到重定向数组
            redirectArr.push(childitem);
          } else {
            // 不是重定向，把路由路径加到重定向路由的同层级
            targetRouter.push(childitem);
          }
          // 如果子路由有childRoutes进行handleRouterArr操作
          if (childitem.childRoutes) {
            handleRouterArr(childitem.childRoutes, targetRouter, redirectArr);
          }
        });
        // 不删除更好，以后获取的router还是完整的结构
        // 如果是redirect，删除此属性
        // if (item.redirect) {
        //   delete item.childRoutes;
        // }
      }
    } else {
      // console.log('unredirect', item);
      // 如果不是重定向路由，push到targetRouter中
      // 先进行判断targetRouter中有没有相同的元素，有的话不进行push, ===地址级别的判断
      let flag = false;
      for (let i = 0; i < targetRouter.length; i++) {
        if (targetRouter[i] === item) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        targetRouter.push(item);
      }
      // 如果存在childRoutes进行handleRouterArr操作
      if (item.childRoutes) {
        handleRouterArr(item.childRoutes, item.childRoutes, redirectArr);
      }
    }
  });
}
