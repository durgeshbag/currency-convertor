import {useEffect, useState} from "react"

function useCurrencyConvertor(currency){
    const [data, setData] = useState({})
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`
    useEffect(() => {
        fetch(url)
        .then((resp) => resp.json())
        .then((jsonResp) => jsonResp[currency])
        .then((currData) => setData(currData))
        .catch((error) => console.log(error))
    }, [currency])
    // console.log("data");
    // console.log(data);
    return data
}

export default useCurrencyConvertor;