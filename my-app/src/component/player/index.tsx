import React, { useState, useEffect, useRef } from 'react';
import { Store } from "../../store/index";
import styled, { keyframes } from 'styled-components'
import play from '../../static/play.svg'
import puase from '../../static/puase.svg'
import setting from '../../static/setting.svg'
import playb from '../../static/playb.svg'
import next from '../../static/next.svg'
import pauseb from '../../static/pauseb.svg'
import pre from '../../static/pre.svg'
import loop from '../../static/loop.svg'
import needle from '../../static/needle.png'
import { Icon } from 'antd-mobile';
import { formatTime} from '../../utils/utils'


interface Props {
    isFull: string;
}

const PlayerWarpper = styled.div<Props>`
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: ${p => p.isFull !== 'min' ? '100' : '8'}vh;
    transition: height 100ms;

`
const FullPlayer = styled.div`
    height: 100%;
    background-color: rgba(0,0,0,.6);
    color:#fff
`

const FullPlayerHeader = styled.div`
    position: absolute;
    top: 0;
    width:100%;
    height: 8vh;
    z-index:2;
    display:flex;
    & > .icon{
        width:15vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & > .title{
        flex:1;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
`

interface ImgP {
    bgImg: string;
    isRotate: boolean
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const FullPlayerContent = styled.div<ImgP>`
    height: 77vh;
    &:after{
        content:'';
        height:100%;
        display:block;
        background-image:url(${(p) => p.bgImg}?param=200y200);
        filter: blur(2.77778vw);
        transform: scale(1.5);
        background-position: 50%;
        background-size: contain;
        background-repeat: no-repeat;
    }
    &>.needle{
        position: absolute;
        top:10vh;
        left:50vw;
        z-index:3;
        transform-origin:top left;
        transform:rotate(${(p) => p.isRotate ?'0':'-20'}deg);
        transition:all 1s;
    }
    &>.discBox{
        box-sizing: border-box;
        height:80vw;
        width:80vw;
        position: absolute;
        top:20vh;
        left:10vw;
        z-index: 2;
        border-radius: 50%;
        border: 50px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: ${rotate} 5s linear infinite;
        animation-play-state:${(p) => p.isRotate ? 'play' : 'paused'};
        & >img{
            border-radius: 50%;
        }
    }
`
interface timeProps {
    prcent: number;
    color:string
}

const FullPlayerPorcess = styled.div<timeProps>`
    position: absolute;
    bottom: 12vh;
    height: 5vh;
    width:100%;
    display: flex;
    line-height: 5vh;
    justify-content: center;
    & > .porcessBar{
        position: relative;
        width:70%;
        height: 5px;
        background-color: #9f9898;
        margin-top: 15px;
        border-radius: 2px;
         &::after{
            content:'';
            position: absolute;
            top:0;
            left:0;
            height: 5px;
            width:${p=>p.prcent*100}%;
            background-color:${p=>p.color};
        }
    }
`

const FullPlayerFooter = styled.div`
    position: absolute;
    bottom: 0;
    width:100%;
    height: 12vh;
    display: flex;
    & > div{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        &>img{
            width:50px
        }
    }
`

const MiniPlayer = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    height: 48px;
    padding:5px;
    background-color: #fff;
    & > .left,.right{
        width:13%;
        & >img{
            border-radius: 5px;
        }
    }
    &>.center{
        flex:1;
        display: flex;
        justify-content: space-between;
        & > .info{
            padding-left:20px
        }
        & > .info div{
            padding-top:5px
        }
    }
`
const ListPlayer = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.6);
    color:#fff
    z-index:99
`

const ListWarpper = styled.div`
   position: absolute;
    bottom: 0;
    height:60%;
    width: 100%;
    background-color:#fff;
    border-radius: 15px 15px 0 0;
`

const Player: React.FC = () => {
    const store = Store.useContainer()
    const audioEl = useRef<HTMLAudioElement>(null)
    const { songs } = store.playInfo
    const [nowTime,setTime] = useState(0)

    const MiniPlayer1 = <MiniPlayer>
        <div className={'left'}>
            <img width={'100%'} height={'100%'} onClick={() => store.setStauts('full')} src={songs[0].al.picUrl} alt="" />
        </div>
        <div className={'center'}>
            <div className={'info'}>
                <div>
                    {songs[0].name}
                </div>
                <div style={{ color: '#888' }}>
                    {songs[0].ar[0].name}
                </div>
            </div>
            <div className={'btn'} onClick={() => store.setPause(!store.isPause)}>
                <img height={'40px'} style={{ marginTop: ' 10%' }} src={!store.isPause ? play : puase} alt="" />
            </div>
        </div>
        <div className={'right'} style={{ textAlign: 'center' }} onClick={() => store.setStauts('list')}>
            <img height={'60%'} style={{ marginTop: '20%' }} src={setting} alt="" />
        </div>
    </MiniPlayer>

    const FullPlayer1 = <FullPlayer>
        <FullPlayerHeader>
            {/* <div className={'icon'} onClick={() => {store.setStauts('min');console.log(store.showStauts)}}> */}
            <div className={'icon'} onClick={() => store.setStauts('min')}>
                <Icon type='left'></Icon>
            </div>
            <div className={'title'}>
                <div style={{ fontSize: '16px' }}>
                    {songs[0].name}
                </div>
                <div >
                    {songs[0].ar[0].name}
                </div>
            </div>
        </FullPlayerHeader>
        <FullPlayerContent bgImg={songs[0].al.picUrl} isRotate={!store.isPause}>
            <div className='needle'>
                <img width={'50%'} src={needle} alt=""/>
            </div>
            <div className="discBox">
                <img src={`${songs[0].al.picUrl}?param=200y200`} alt="" />
            </div>
        </FullPlayerContent>
        {
        audioEl.current?
        <FullPlayerPorcess color={store.themColor} prcent={nowTime/audioEl.current?.duration}>
        <div>{formatTime(nowTime)}</div>
        <div className={'porcessBar'}></div>
        <div>{formatTime(audioEl.current?.duration)}</div>
        </FullPlayerPorcess>:<p></p>
        }
        {/* <FullPlayerPorcess prcent={nowTime/audioEl.current?.duration}>
            <div>{formatTime(nowTime)}</div>
            <div className={'porcessBar'}></div>
            <div>{formatTime(audioEl.current?.duration)}</div>
        </FullPlayerPorcess> */}
        <FullPlayerFooter>
            <div><img src={pre} alt="" /></div>
            <div><img src={!store.isPause ? pauseb : playb} onClick={() => store.setPause(!store.isPause)} alt="" /></div>
            <div><img src={next} alt="" /></div>
            <div><img src={loop} alt="" /></div>
        </FullPlayerFooter>
    </FullPlayer>



    const ListPlayer1 = <ListPlayer onClick={(e) => {
        e.persist()
        let id = (e.target as HTMLDivElement).id
        if (!id) {
            store.setStauts('min')
        }
    }}>
        <ListWarpper id={'ListWarpper'}>
            {[1, 2, 3, 4, 5].map(item => { })}
        </ListWarpper>
    </ListPlayer>

    const showComponent: any = {
        'min': MiniPlayer1,
        'full': FullPlayer1,
        'list': ListPlayer1
    }


    useEffect(() => {

        if (!store.isPause) {
            audioEl.current?.play()
        } else {
            audioEl.current?.pause()
        }

    })

    const hanldePlaying = function(e:any,target:any){
       setTime(target.current?.currentTime)
    }
    return (<PlayerWarpper isFull={store.showStauts}>
        {showComponent[store.showStauts]}
        <audio onTimeUpdate={()=>hanldePlaying('$e',audioEl)} ref={audioEl} src={`https://music.163.com/song/media/outer/url?id=${songs[0].id}.mp3`}></audio>
    </PlayerWarpper>)
}
export default Player;