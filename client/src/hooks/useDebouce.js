import {useState, useEffect} from 'react'

const useDebouce = (value, delay) => {
    const [debouceValue, setDebouceValue] = useState(value)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouceValue(value)
        },delay)

        return () => clearTimeout(timerId)
    },[value])

    return debouceValue
}

export default useDebouce