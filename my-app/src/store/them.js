import { useState } from "react"

const useThem = () => {
    // Let's set a legen -- wait for it -- dary default name that updates on form submit
    const [themColor, setThem] = useState("#e5473c");
    return {
        themColor,
        setThem
    };
}

export default useThem