
// import Home from '../pages';
// // import baseRouters from './base'
  
//   export type RouterType = {
//     path: string,
//     component: React.LazyExoticComponent<any>,
//     root: string[],
//     notExect?: boolean,
//   };
  
//   const HomeRouter: RouterType = {
//     path: '/home',
//     component: Home,
//     root: [],
//   };
//   // 总路由
//   const Routers: RouterType[] = ([
//     HomeRouter,
//     // ...baseRouters,
//   ]);
  
  export {
    // Routers
  }


  // <Switch>
  //   {
  //     Routers.map(router => (
  //       <Route
  //         exact={!router.notExect}
  //         key={router.path}
  //         path={router.path}
  //         component={router.component}
  //       >
  //       </Route>
  //     ))
  //   }
  //   {/* 设置默认路由 推荐方法一*/}
  //   {/* 方法一 */}
  //   {/* <Route path="/" component={Home} exact></Route> */}
  //   {/* 方法二 重定向*/}
  //   <Redirect path="/" to="/home" />
  // </Switch>