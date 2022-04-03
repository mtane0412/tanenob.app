import { useRouter } from 'next/router'
import Timer from '../../components/timer'

const TimerPage = () => {
    const router = useRouter();
    const isReady = router.isReady;
    if (!isReady) {
        return null;
    }
    const minute = router.query.minute;
    const title = router.query.title;
    const end = router.query.end;
    const ribenchi = router.query.ribenchi === 'true' ? true : false;
    return (
        <>
        <Timer minute={Number(minute)} title={title} end={end} ribenchi={ribenchi} />
        </>
    )
}

export default TimerPage
