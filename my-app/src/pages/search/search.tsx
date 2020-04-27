import React, { useState, useEffect } from 'react';
import { NavBar, Tag, Icon, SearchBar, Tabs } from 'antd-mobile';
import { useHistory } from "react-router-dom";
import { Store } from "../../store/index";
// @ts-ignore
import http from '../../apis/http'
import { callbackify } from 'util';
import styled from 'styled-components'

const SongList = styled.div`
    padding:5px 10px;
    height:60px;
    display:flex;
    flex-direction:column;
    justify-content: center;
`

const HomeView: React.FC = () => {
    let history = useHistory()
    const store = Store.useContainer()
    let [inputText, changText] = useState('')
    let [resShow, changShow] = useState(false)
    let [hotList, initList] = useState([])
    let [resList, initRes] = useState([])
    let [noteList, initnote] = useState([])

    const handleSubmit = function (val: any) {
        
        http.get<any>('search', {
            params: {
                offset: 0,
                type: 1,
                limit: 20,
                keywords: val
            }
        }).then((res: any) => {
            initRes(res.result.songs)
            changShow(true)
           
        }).catch((e: any) => console.log(e))

        http.get<any>('search', {
            params: {
                offset: 0,
                type: 1000,
                limit: 20,
                keywords: val
            }
        }).then((res: any) => {
            initnote(res.result.playlists)
        }).catch((e: any) => console.log(e))
    }

    useEffect(() => {
        http.get<any>('search/hot').then((res: any) => {
            initList(res.result.hots)
        }).catch((e: any) => console.log(e))
    }, [])

    return (<div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', display: 'inline-block' }}>
        <NavBar
            icon={<Icon type='left'></Icon>}
            onLeftClick={() => { history.go(-1) }}
            style={{ backgroundColor: store.themColor }}
        >
            搜索
        </NavBar>
        <SearchBar onSubmit={value => value?handleSubmit(value):changShow(false)} placeholder="搜索你喜欢的歌手或歌曲" ref={(el: any) => changText(el)} />
        {resShow ? <TabView resList={resList} noteList={noteList} /> : <TagView changShow={handleSubmit} hotList={hotList} />}
    </div>)
}

const TabView = function (props: any) {
    const store = Store.useContainer()
    let history = useHistory()

    const handleSelectSong =async function(ids:number){
     let res =   await http.get<any>('song/detail',{params:{ids}})
     store.setplayInfo(res)
     store.setPlaying(true)
     store.setPause(false)
     store.setStauts('min')
    }

    const tabs = [
        { title: '单曲', sub: '1' },
        { title: '歌单', sub: '2' },
    ];
    return (
        <div style={{ height: window.innerHeight-89}}>
            <Tabs tabs={tabs}
                tabBarUnderlineStyle={{border:`1px ${store.themColor} solid`}}
                tabBarActiveTextColor={store.themColor}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
                <div style={{  backgroundColor: '#fff' }}>
                    {props.resList.map((item: any, index: number) => {
                        return (<SongList onClick={()=>{handleSelectSong(item.id)}}  key={index}>
                        <div style={{fontSize:'20px',paddingBottom:'5px'}}>{item.name.length<15?item.name:item.name.slice(0,14)}</div>
                        <div style={{color:'#888'}}>{item.artists[0].name} - {item.album.name}</div>
                         </SongList>)
                    })}
                </div>
                <div style={{  backgroundColor: '#fff' }}>
                    {props.noteList.map((item: any, index: number) => {
                        return <SongList key={index} onClick={() => { history.push({pathname :`/playList/${item.id}`}) }}>
                         <div style={{fontSize:'20px',paddingBottom:'5px'}}>{item.name.length<15?item.name:item.name.slice(0,14)}</div>
                        <div style={{color:'#888'}}>{item.trackCount}首 by {item.creator.nickname} {item.playCount>100000?Math.floor(item.playCount/100000)+'万次':item.playCount+'次'}播放</div>
                        </SongList>
                    })}
                </div>
            </Tabs>
        </div>
    )
}

const TagView = function (props: any) {
    return (
        <div>
            {props.hotList.map((item: any, index: number) => {
                return <Tag onChange={(val) => props.changShow(item.first)} style={{ marginLeft: '9px', marginTop: '5px' }} key={index}>{item.first}</Tag>
            })}
        </div>
    )
}
export default HomeView;