import React,{useState} from 'react';
import {
    TransitionGroup,
    CSSTransition
  } from "react-transition-group";
import styled from 'styled-components'
import './index.css'

interface Props {
    count: number;
}
// display:inline-block;
const Square = styled.div<Props>`
    position: absolute;
    top: 20px;
    left: 50%; 
    margin-left:-50px;
  background-color:${(p)=>p.count%2?'red':'blue'};
  width:100px;
  height:100px;
`

const TestView: React.FC = ()=>{
    const [show,toggleShow] = useState(true)
    let [count,addCount] = useState(1)

    return (<div>
          <div style={{height:'200px'}}>
          <TransitionGroup>
              <CSSTransition
            key={count}
            timeout={500}
            classNames={'fade'}

          >
             <Square count={count}>{count}</Square>
          </CSSTransition>
          </TransitionGroup>
          </div>  
        <div>{count}</div>
        <button onClick={()=>addCount((count+1)%2)}>toggle</button>

    </div>)
}
export default TestView;