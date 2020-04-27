import { useState } from "react"

const usePlay = () => {
    // Let's set a legen -- wait for it -- dary default name that updates on form submit


    const [playInfo, setplayInfo] = useState({});
    const [isPlaying, setPlaying] = useState(false);
    const [isPause, setPause] = useState(false);
    const [showStauts, setStauts] = useState('min');

    return {
        playInfo,
        setplayInfo,
        isPlaying,
        setPlaying,
        showStauts,
        setStauts,
        isPause,
        setPause
    };
}

export default usePlay