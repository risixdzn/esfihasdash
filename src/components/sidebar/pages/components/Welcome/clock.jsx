import React, { useEffect, useState } from 'react'

const Clock = () => {

    const [ time, setTime ] = useState('');

    function formatTime(val){
        if(val < 10){
            return '0';
        }else{
            return '';
        }
    }

    useEffect(()=> {
        //interval
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
    }
  return (
    <h1 className='clock' style={{color: "#fff", fontSize: 45, fontWeight: 600, lineHeight: "50px"}}>{time}</h1>
  )
}

export default Clock