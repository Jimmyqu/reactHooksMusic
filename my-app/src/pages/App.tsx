import React, { lazy, Suspense } from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route, Switch,withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Loading from '../component/loading'
import SearchView from '../pages/search/search'
import SkinView from '../pages/skin/skin'
import PlayListView from '../pages/playList/playList'
import scrollView from '../pages/srcollPage/index'
import Player from '../component/player/index'
import './App.css';
import { Store } from "../store/index";

const HomeView = lazy(() => import('./home/home'))
const MusicView = lazy(() => import('./music/music'))
const TestView = lazy(() => import('./transitonPage/index'))

// const SkinView = lazy(() => import('./skin/skin'))

const App: React.FC = (p) => {
    let store  =  Store.useContainer()

  return (
    <BrowserRouter >
      <Suspense fallback={<Loading />}>
      <AnimationApp></AnimationApp>
      </Suspense>
      {store.isPlaying?<Player></Player>:null} 
    </BrowserRouter>
  )
}

const AnimationApp = withRouter(({location,history}) => (

  <TransitionGroup className={'router-wrapper'}
  childFactory={child => React.cloneElement(
    child,
    {classNames: history.action==='POP'?'back':'forward'}  //通过Actions 判断使用何种动画
  )}
  >
    <CSSTransition
      timeout={500}
      classNames={'fade'}
      key={location.pathname}
    >
       
      <Switch location={location}> 
      //TransitionGroup组件虽然会保留即将被remove的Switch节点，但是当location变化时，旧的Switch节点会用变化后的location去匹配其children中的路由。由于location都是最新的，所以两个Switch匹配出来的页面是相同的。好在我们可以改变Switch的location属性，
      <Route path="/" exact component={HomeView} >
            </Route>
            <Route path="/music" component={MusicView} >
            </Route>
            <Route path="/skin" component={SkinView} >
            </Route>
            <Route path="/test" component={TestView} >
            </Route>
            <Route path="/search" component={SearchView} >
            </Route>
            <Route path="/playList/:id" component={PlayListView} >
            </Route>
            <Route path="/scroll" component={scrollView} >
            </Route>
      </Switch>
    </CSSTransition>
  </TransitionGroup>

  
));


// function AnimationApp() {
//   let location = useLocation(); //useLocation不能跟Router在同一组件内
//   console.log(location)
//   return (
//     <div>
//       <TransitionGroup>
//         <CSSTransition
//           key={location.key}
//           classNames="fade"
//           timeout={500}
//         >
//           <Switch location={location}>
//             <Route path="/" exact component={HomeView} >
//             </Route>
//             <Route path="/music" component={MusicView} >
//             </Route>
//             <Route path="/skin" component={SkinView} >
//             </Route>
//             <Route path="/test" component={TestView} >
//             </Route>
//           </Switch>
//         </CSSTransition>
//       </TransitionGroup>
//     </div>
//   );
// }

export default App;
