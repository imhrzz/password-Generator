// Import necessary hooks from React
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  // useState hook to manage the length of the password
  const [length, setLength] = useState(8);

  // useState hook to manage whether numbers are allowed in the password
  const [numberAllowed, setNumberAllowed] = useState(false);

  // useState hook to manage whether special characters are allowed in the password
  const [charAllowed, setCharAllowed] = useState(false);

  // useState hook to store the generated password
  const [password, setPassword] = useState("");

  // useRef hook to create a reference for the password input field
  const passwordRef = useRef(null);

  // useCallback hook to memoize the password generation function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    // Add numbers to the character set if allowed
    if (numberAllowed) str += "0123456789";
    
    // Add special characters to the character set if allowed
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    // Generate a random password based on the specified length and character set
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    // Set the generated password
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  // useCallback hook to memoize the function for copying the password to the clipboard
  const copyPasswordToClipboard = useCallback(() => {
    // Select the password text
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);

    // Write the selected text to the clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect hook to generate a new password whenever length, numberAllowed, or charAllowed changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>

      {/* Password input field and copy button */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >
          Copy
        </button>
      </div>

      {/* Controls for password length and options */}
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
