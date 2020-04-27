// 补0函数
export const addZero = s => {
    return s < 10 ? '0' + s : s
}

// 播放时间
export const formatTime = s => {
    let minute = Math.floor(s / 60)
    let second = Math.floor(s % 60)
    return `${addZero(minute)}:${addZero(second)}`
}