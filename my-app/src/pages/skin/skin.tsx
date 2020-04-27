import React from 'react';
import { NavBar,List,Icon } from 'antd-mobile';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import  {Store} from "../../store/index";

const Pcolor = styled.p`
    padding:5px 0;
`

const HomeView: React.FC = (p) => {

    let  history = useHistory()
    const store = Store.useContainer()

    console.log(p)

    const colorList = ['e5473c','31c27c','0c8ed9','ff6600','ff87d4']
    return (  <div style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',display:'inline-block'}}>
         <NavBar
                icon={<Icon type='left'></Icon>}
                onLeftClick={() => {history.go(-1)}}
                style={{backgroundColor:store.themColor}}
            >
            主题色
        </NavBar>
        <List>
                {colorList.map((item)=>{
                  return  <List.Item onClick={()=>{store.setThem(`#${item}`)}} key={item} style={{backgroundColor:'#'+item}}><Pcolor>{item}</Pcolor></List.Item>
                })}
            
        </List>
    </div>)
}
export default HomeView;