import React,{createRef} from 'react';
import { NavBar,List,Icon } from 'antd-mobile';
import { useHistory } from "react-router-dom";
import  {Store} from "../../store/index";

// @ts-ignore
const HomeView: React.FC = ()=>{
    
    let  history = useHistory()
    const store = Store.useContainer()
    const myRef = React.useRef<HTMLDivElement>(null);

    let height = myRef.current?.clientHeight||0
    let start:any = null;
    let last_distance = 0;
    let distance_border = 100


    const handleTouchStart = function(e:any){
        e.persist()
        start = e.changedTouches[0].pageY;
    }

    const handleTouchMove = function(e:any){
        e.persist()
        const cur_move = e.changedTouches[0].pageY - start;
        const move_distance = last_distance + cur_move;
        let currentTarget = e.currentTarget
        if(move_distance<distance_border&&move_distance>0){
            currentTarget.style.transform=`translateY(${move_distance}px)`
            let box = myRef.current||currentTarget
            box.style.height =`${height+move_distance}px`
            let img = myRef.current?.children[0]||currentTarget
            img.style.transform=`scale(3)`
            console.log()
        }
    }

    const handleTouchEnd= function(e:any){
        e.persist()
        let currentTarget = e.currentTarget
        currentTarget.style.transform=`translateY(0px)`
        currentTarget.style.transitionDuration=`200ms`
        let box = myRef.current||currentTarget
        box.style.height =`156px`
        currentTarget.style.transform=`height`
        currentTarget.style.transitionDuration=`200ms`

        let img = myRef.current?.children[0]||currentTarget
        img.style.transform=`scale(1)`
        img.style.transitionDuration=`200ms`

        
    }
 
    return (<div>
       <div ref={myRef} style={{overflow:'hidden'}}>
           <img width='100%' src="http://p1.music.126.net/JxRp5J0p8IudOT7Kxomr6A==/109951164933269632.jpg" alt=""/>
       </div>
       <div onTouchStart={(e)=>handleTouchStart(e)} onTouchMove={(e)=>handleTouchMove(e)} onTouchEnd={(e)=>handleTouchEnd(e)}>
           {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item,index)=>{
               return <p style={{height:'50px'}} key={index}>{item}</p>
           })}
       </div>
    </div>)
}
export default HomeView;