import React from 'react';
import { NavBar,List,Icon } from 'antd-mobile';
import { useHistory } from "react-router-dom";
import  {Store} from "../../store/index";

const HomeView: React.FC = ()=>{
    
    let  history = useHistory()
    const store = Store.useContainer()
    return (<div>

        <NavBar
                icon={<Icon type='left'></Icon>}
                onLeftClick={() => {history.go(-1)}}
                style={{backgroundColor:store.themColor}}
            >
            搜索
        </NavBar>
    </div>)
}
export default HomeView;