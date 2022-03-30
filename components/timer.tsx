
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GetWindowSize } from "../hooks/GetWindowSize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPause } from '@fortawesome/free-solid-svg-icons';

type Props = {
    minute: number
    title?: string|string[]|undefined
    end?: string|string[]|undefined
    ribenchi?: boolean
}
type ClockProps = {
    HH: string
    MM: string
    SS: string
}
const Clock = ({HH, MM, SS}:ClockProps) => {
    return (
        <div className="whitespace-nowrap">
            {HH !== '00' && HH + ':'}{MM}:{SS}
        </div>
        );
}

const Timer = ({minute=0, title, end, ribenchi}: Props) => {
    const audioFile = ribenchi ? '/ribenchi-alarm.mp3' : '/alarm.mp3';
    let sec:number = minute * 60;
    const [time, setTime] = useState(sec);
    const [percentage, setPercentage] = useState(100);
    const { height, width } = GetWindowSize();
    const [isPaused, setIsPaused] = useState(false);
    let pause:MutableRefObject<boolean> = useRef(false);
    const toggleTimer = () => {
        pause.current = isPaused ? false : true;
        setIsPaused(pause.current);
        console.log(`isPaused is ${isPaused}`);
    }
    
    let remainSec:MutableRefObject<number> = useRef(time);
    let HH:MutableRefObject<string> = useRef(new Date(remainSec.current * 1000).toISOString().substring(11, 13));
    let MM:MutableRefObject<string> = useRef(new Date(remainSec.current * 1000).toISOString().substring(14, 16));
    let SS:MutableRefObject<string> = useRef(new Date(remainSec.current * 1000).toISOString().substring(17, 19));
    const progressStyle = {
        // Colors
        textColor: ribenchi ? '#daa3ff' :'#f88',
        trailColor: ribenchi ? '#daa3ff' : '#d6d6d6',
        backgroundColor: '#fff',
    };
    useEffect(()=> {
        const counting = setInterval(() => {
            if (!pause.current) {
                remainSec.current = remainSec.current - 1 >= 1 ? remainSec.current - 1 : 0;
                setTime(remainSec.current);
                setPercentage(remainSec.current / sec * 100);
                const ct = new Date(remainSec.current * 1000).toISOString();
                HH.current = ct.substring(11, 13);
                MM.current = ct.substring(14, 16);
                SS.current = ct.substring(17, 19);
                console.log(`${Math.round(remainSec.current / sec * 100)}%`);
            }
            if (remainSec.current <= 0) {
                clearInterval(counting);
            }
        }, 1000);
    }, []);

    
    
    
    return (
        <div className="text-gray-800 whitespace-nowrap">
            <CircularProgressbar value={percentage} background={true} styles={buildStyles(progressStyle)} className="font-mono h-screen absolute inset-0 z-0" />
            {!isPaused &&
                <div className={`w-[${height}] m-auto p-14 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                    <div className="font-mono text-9xl">
                        {remainSec.current > 0
                            ? <Clock HH={HH.current} MM={MM.current} SS={SS.current} />
                            : <div><span>{end ? end : 'finish'}</span><audio autoPlay={true} src={audioFile} /></div>
                        }
                    </div>
                    {title &&
                        <div className="font-Zen text-8xl pt-5">{title}</div>
                    }
                </div>
            }
            <div onClick={()=>toggleTimer()} className="w-full h-full text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                {isPaused &&
                    <FontAwesomeIcon icon={faPause} className="text-[200px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                }
            </div>
        </div>
    )
}

export default Timer