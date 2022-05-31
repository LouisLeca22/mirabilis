import {useState, useEffect, useRef} from "react"

function useFetch(url, options, type) {
   
    const optionsRef = useRef(options)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await fetch(url, optionsRef.current)
                const data = await res.json()

                setData(data)
                setLoading(false)
            } catch (error) {
                setData(null)
                setError(error)
                setLoading(false)
            }
        }

        fetchData()

    }, [url,type, optionsRef])

    const reFetch = async () => {
        try{
            const res = await fetch.get(url, options)
            const data = await res.json()
            setData(data)
        } catch(error){
            setError(error)
        }
    }

    return {loading, error, data, reFetch}
}

export default useFetch