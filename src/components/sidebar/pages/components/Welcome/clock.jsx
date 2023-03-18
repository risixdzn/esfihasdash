import React, { useEffect, useState } from 'react'
import './clock.css'

const Clock = (props) => {

    const [ time, setTime ] = useState('');
    const [ loading, setIsloading ] = useState(props.isLoading);

    function formatTime(val){
        if(val < 10){
            return '0';
        }else{
            return '';
        }
    }

    useEffect(()=> {        
        //interval
        //console.log(loading);
        const timerID = setInterval(
            ()=> tick(),1000)
            return function cleanup() {
                clearInterval(timerID)                
            }
    })

    function tick(){
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes()

        setTime(formatTime(h)+ h + ':' + formatTime(m) + m);
        setIsloading(false);        
    }
        
    return (
    <div>
        <h1 className='clock' style={{color: "#fff", fontSize: 45, fontWeight: 600, lineHeight: "50px"}}>{time}</h1>
        <div className={ loading ? "clockskeleton" : "clockhidden"}></div>
    </div>
    
  )
}

export default Clock