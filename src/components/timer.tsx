
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { tmpdir } from 'os';

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
    title: string|string[]|undefined
}

class CurrentTime {
    now: string;
    HH: string;
    MM: string;
    SS: string;
    constructor(sec:number) {
        this.now = new Date(sec * 1000).toISOString();
        this.HH = this.now.substring(9, 10) === '2' ? '24' : this.now.substring(11, 13);
        this.MM = this.now.substring(14, 16);
        this.SS = this.now.substring(17, 19);
    }
}
const ClockFace = ({HH, MM, SS, title}:ClockProps) => {
    return (
        <>
            <div className="whitespace-nowrap">
                {HH !== '00' && HH + ':'}{MM}:{SS}
            </div>
            {title &&
                <div className="font-Zen text-8xl pt-5">{title}</div>
            }
        </>
        );
}

const Timer = ({minute, title, end, ribenchi}: Props) => {
    let sec:number;
    if (Number.isNaN(minute) || minute > 1440) {
        sec = -1;
    } else {
        sec = minute * 60;
    }
    const audioFile:string = ribenchi ? '/ribenchi-alarm.mp3' : '/alarm.mp3';
    const [time, setTime] = useState(sec);
    const [percentage, setPercentage] = useState(100);
    const [isPaused, setIsPaused] = useState(false);
    let pause:MutableRefObject<boolean> = useRef(false);
    const toggleTimer = () => {
        pause.current = isPaused ? false : true;
        setIsPaused(pause.current);
        console.log(`isPaused is ${isPaused}`);
    }
    
    let remainSec:MutableRefObject<number> = useRef(time);
    let currentTime = new CurrentTime(remainSec.current);
    let HH:MutableRefObject<string> = useRef(currentTime.HH);
    let MM:MutableRefObject<string> = useRef(currentTime.MM);
    let SS:MutableRefObject<string> = useRef(currentTime.SS);
    const progressStyle = {
        // Colors
        textColor: ribenchi ? '#daa3ff' :'#f88',
        trailColor: ribenchi ? '#daa3ff' : '#d6d6d6',
        backgroundColor: '#fff',
    };
    useEffect(()=> {
        const counting = setInterval(() => {
            if (!pause.current && remainSec.current > 0) {
                remainSec.current = remainSec.current - 1 >= 1 ? remainSec.current - 1 : 0;
                currentTime = new CurrentTime(remainSec.current);
                HH.current = currentTime.HH
                MM.current = currentTime.MM;
                SS.current = currentTime.SS;
                console.log(`${Math.round(remainSec.current / sec * 100)}%`);
                setTime(remainSec.current);
                setPercentage(remainSec.current / sec * 100);
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
                <div className={`w-full m-auto p-14 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                    <div className="font-mono text-9xl">
                        {remainSec.current > 0
                            && <ClockFace HH={HH.current} MM={MM.current} SS={SS.current} title={title} />
                        }
                        {remainSec.current === 0
                            && <div><span>{end ? end : 'finish'}</span><audio autoPlay={true} src={audioFile} /></div>
                        }
                        {remainSec.current < 0
                            && <div><span className=" text-red-400">Error</span></div>
                        }
                    </div>
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