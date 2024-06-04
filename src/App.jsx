import { useState } from 'react'
import './App.css'
import { InputBox } from './components'
import useCurrencyConvertor from './hooks/currency'


// TODO on input box entering value should be replace by initial 0 -- Done
// TODO no negative input value  -- Done

function App() {

  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState("usd")
  const [to , setTo] = useState("inr")
  const [convertedData, setConvertedData] = useState(null)

  const resData = useCurrencyConvertor(from)
  const keys = Object.keys(resData)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedData)
    setConvertedData(amount)  
  }

  const convert = () => {
    setConvertedData(amount * resData[to] )
  }
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://media.istockphoto.com/id/1322201350/photo/digitally-enhanced-shot-of-a-graph-showing-the-ups-and-downs-shares-on-the-stock-market.jpg?s=2048x2048&w=is&k=20&c=DDg0t03dYHMlPKaQGfIrQx9xZ30iPv_KBwju_LgKvkU=')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={keys}
                            selectCurrency={from}
                            onAmountChange={(amt) => {
                                if(amt == 0) setAmount(null)
                                else amt>0?setAmount(amt):null
                                
                            }}
                            onCurrencyChange={(frVal) => setFrom(frVal)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedData}
                            currencyOptions={keys}
                            onCurrencyChange={(toVal) => setTo(toVal)}
                            selectCurrency={to}
                            isAmountDisable={true}
                            
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert 
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
