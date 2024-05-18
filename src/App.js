import logo from './logo.svg';
import {useState, useCallback, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8)
  const [charallowed, setcharallowed] = useState(false)
  const [number, setnumberallowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator = useCallback(() => { 
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz"

    if(number) str += "0123456789"
    if(charallowed) str += "!@#$%^&*(){}[]~?/<>.,"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)  
    }

    setpassword(pass)
  }, [length, charallowed, number])

  useEffect(() => {
    passwordGenerator();


  }, [length, charallowed, number, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8 py-3 px-4 text-orange-400 bg-slate-700'>
      <h1 className='text-white text-3xl text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type='text'
        value={password}
        className='outline-none w-full py-1 px-2'
        placeholder='password'
        readOnly
        ref={passwordRef} />
        <button className='bg-blue-700 text-white outline-none px-3 py-0.5 shrink-0' onClick={copyPassword}>Copy</button>

      </div>

      <div className='flex text-sm gap-x-3'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={6}
          max={35}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> {setlength(e.target.value)}}
           />
           <label>Length:{length}</label> 
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={number}
          id="numberInput"
          className='cursor-pointer'
          onChange={()=>{
            setnumberallowed((prev)=>!prev);
          }}
           />
           <label>Numbers</label> 
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={number}
          id="numberInput"
          className='cursor-pointer'
          onChange={()=>{
            setcharallowed((prev)=>!prev);
          }

          }
           />
           <label>Characters</label> 
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
