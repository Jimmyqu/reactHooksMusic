import React, { useState, useEffect } from 'react';
import { NavBar, Tag, Icon, SearchBar, Tabs } from 'antd-mobile';
import { useHistory,useRouteMatch } from "react-router-dom";
import { Store } from "../../store/index";
// @ts-ignore
import http from '../../apis/http'

import styled from 'styled-components'

const AnimatedWarpper=styled.div`
  
`
// backgroundImage:`url(${listData?.coverImgUrl})`,

interface Props1 {
    d: number;
    url:string|undefined
}
const ImgWarpper=styled.div<Props1>`
    height:${p=>150+p.d}px;
    transition:all .2s;
    overflow: hidden;
    &:after{
        content: '';
        display: block;
        height: 100%;
        background:url('${p=>p.url}');
        background-size: 100%;
        filter: blur(${p=>10-p.d*0.1}px);
        background-repeat: no-repeat;
        background-position: center;
        transform: scale(1.1);
    }
`
const ImgWarpperContent=styled.div`
    position: absolute;
    width:90%;
    height:120px;
    top: 60px;
    left:5%;
    display: flex;
    flex-direction: row;
`

interface Props {
    d: number;
    id:string
}
const ListWarpper=styled.div<Props>`
    overflow:auto;
    height:calc(100vh - 195px);
    transition-duration:200ms
`

interface ResType {
    coverImgUrl: string;
    tracks:Array<any>;
    playCount:number;
    name:string,
    creator:any
}

const HomeView: React.FC = () => {
    let history = useHistory()
    let match:any = useRouteMatch()
    const store = Store.useContainer()
    let [listData,InitSongList] = useState<ResType | null>(null)
    let [d,setD] = useState(0)
    let [start,setStart] = useState(0)

    useEffect(() => {
        const fetchData = async ()=>{
           const data =  await http.get<any>('playlist/detail',{params:{id:match.params.id}})
           console.log(data.playlist)
           InitSongList(data.playlist)
           console.log(listData)
        }
        fetchData()
    }, [])

    let last_distance = 0;

    const handleTouchStart = function(e:any){
        e.persist()
        setStart(e.changedTouches[0].pageY)
    }

    const handleTouchMove = function(e:any){
        e.persist()
        const cur_move = e.changedTouches[0].pageY - start;
        const move_distance = last_distance + cur_move;
        if((move_distance>0)&&(move_distance<150)){
            if(e.nativeEvent.path[1].scrollTop==0){
                setD(move_distance)
            }
        }
    }

    const handleTouchEnd= function(e:any){
        e.persist()
        setD(0)
       
    }
    
    return (<div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', display: 'inline-block' }}>
        <NavBar
            icon={<Icon type='left'></Icon>}
            onLeftClick={() => { history.go(-1) }}
            style={{ backgroundColor: store.themColor }}
        >
        歌单详情
        </NavBar>
        <AnimatedWarpper  onTouchStart={(e)=>handleTouchStart(e)}  onTouchMove={(e)=>handleTouchMove(e)} onTouchEnd={(e)=>handleTouchEnd(e)}>
            <ImgWarpper d={d} url={listData?.coverImgUrl}>
            </ImgWarpper>
            <ImgWarpperContent>
                <div style={{
                    width:'40%',
                    backgroundImage:`url(${listData?.coverImgUrl})`,
                    backgroundSize: '90%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                    }}>
                    <div style={{
                        width:'90%',
                        margin:'0 auto',
                        direction:'rtl',
                        color:'#fff',
                        padding:'10px 0',
                        textIndent:'10px',
                        backgroundColor:'rgba(0,0,0,.2)'
                    }}>
                        {Math.round((listData?.playCount||1)/10000)}万次
                    </div>    
                </div>
                <div style={{flex:'1'}}>
                    <div style={{
                        fontSize:'16px',
                        fontWeight:'normal',
                        color:'#fff'
                    }}>
                    {listData?.name}
                    </div>
                    <div style={{
                        paddingTop:'30px',
                        textAlign: 'center'
                    }}>
                    <img style={{width:'30px',verticalAlign:'middle',borderRadius:'50%'}} src={listData?.creator.avatarUrl} alt="头像"/>{listData?.creator.nickname}
                    </div>
                </div>
            </ImgWarpperContent>
            <ListWarpper id='scroll' d={d}>
                 {listData?.tracks.map((item,index)=>{
                   return <div key={index} style={{padding:'10px'}} onClick={()=>store.setPlaying(true)}>
                        <div style={{fontSize:'20px',paddingBottom:'5px'}}>{item.name.length<15?item.name:item.name.slice(0,20)}</div>
                        <div style={{color:'#888'}}>{item.ar[0].name} - {item.al.name}</div>
                       {/* {item.name} */}
                   </div>
               })}
            </ListWarpper>
              
        </AnimatedWarpper>

     
    </div>)
}

export default HomeView;