import { useRouter } from 'next/router'
import Timer from '../../components/timer'

// https://localhost:3000/timer/3?title=ribenchi&ribenchi=true

const TimerPage = () => {
    const router = useRouter();
    const minute = router.query.minute;
    const title = router.query.title;
    const end = router.query.end;
    const ribenchi = router.query.ribenchi === 'true' ? true : false;
    if (!minute) {
        return null;
    }
    return (
        <>
        <Timer minute={Number(minute)} title={title} end={end} ribenchi={ribenchi} />
        </>
    )
}

export default TimerPage
