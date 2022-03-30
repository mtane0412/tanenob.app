const checkTime24 = (time: number): boolean => {
    // HHチェック 0-23
    return 0 <= time && time <= 23;
}

const checkTime60 = (time: number): boolean => {
    // MM & SSチェック 0-59
    return 0 <= time && time <= 59;
}

export const timer = (hour:number = 0, minute:number = 0, second:number = 0):any=> {
    // 
    if (!checkTime24(hour) || !checkTime60(minute) || !checkTime60(second)) throw new Error('time is invalid');
    let remainSec:number = hour * 60 * 60 + minute * 60 + second;
    const counting = setInterval(() => {
        const remainTime = new Date(remainSec * 1000).toISOString().substring(11, 19);
        console.log(remainTime);
        remainSec = remainSec - 1;
        if (remainSec < 0) clearInterval(counting);
        return remainTime.split(':');
    }, 1000)
}