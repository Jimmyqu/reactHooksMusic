import React, { useState, useEffect } from 'react';
import { Drawer, NavBar, List, Icon, Carousel } from 'antd-mobile';
import styled from 'styled-components'
import bg1 from '../../static/bg1.png'
import { useHistory, useLocation } from "react-router-dom";
import { Store } from "../../store/index";


// @ts-ignore
import http from '../../apis/http'


interface Props {
    color: string;
}

interface ResType {
    code: number;
    banners: []
}

interface ImgType {
    imageUrl: string;
}


const Sidebar = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 89;
`
const BgSider = styled.div<Props>`
    height: 45vw;
    text-align: center;
    line-height: 44.44444vw;
    width: 60vw;
    opacity: .8;
    background-image: url(${bg1});
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: ${p => p.color}
`

const HomeView: React.FC = (props) => {
    const history = useHistory()

    const store = Store.useContainer()
    const [isShow, toggleShow] = useState(false);
    const [imgList, setList] = useState([])

    useEffect(() => {
        http.get<ResType>('banner').then((res: ResType) => {
            console.log(res)
            setList(res.banners)
        }).catch((e: any) => console.log(e))
    }, [])


    const handleClick = () => {
        console.log(isShow)
        isShow ? toggleShow(false) : toggleShow(true)
    }

    const SidebarComponent = <Sidebar><BgSider color={store.themColor} /><List><List.Item arrow="horizontal" onClick={() => history.push('/skin')}>皮肤中心</List.Item></List></Sidebar>

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', display: 'inline-block' }}>
            <NavBar
                icon={<Icon type='ellipsis'></Icon>}
                onLeftClick={() => handleClick()}
                style={{ backgroundColor: store.themColor }}
                rightContent={[
                    <Icon key="0" type="search" onClick={() => history.push('/search')} />,
                ]}
               
            >
                music
            </NavBar>
            <Drawer
                style={{ minHeight: document.documentElement.clientHeight * 0.8, top: '45px' }}
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0 }}
                sidebar={SidebarComponent}
                open={isShow}
                onOpenChange={() => handleClick()}
            >
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {
                        imgList.map((val: ImgType, key) => (
                            <a
                                key={key}
                                style={{ display: 'inline-block', width: '100%', height: "100%" }}
                            >
                                <img
                                    src={val.imageUrl}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />
                            </a>
                        ))
                    }
                </Carousel>
            </Drawer>
        </div>
    )
}

export default HomeView;