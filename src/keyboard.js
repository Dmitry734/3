// keyboard.js 
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './keyboard.css';

export default function Keyboard() {
    const [inputText, setInputText] = useState('');



    //====

    const [fieldsVisible, setFieldsVisible] = useState(false);



    const toggleFieldsVisibility = () => {
        setFieldsVisible(!fieldsVisible);
    };

    ///====

    const handleKeyClick = (key) => {
        if (key === '<i className="fa-solid fa-delete-left"></i>') {
            handleDeleteKey();
        }
        else {
            handleRegularKey(key);
        }
    };



    const handleDeleteKey = () => {
        if (inputText.length === 0) {
            return;
        }
        const newContent = inputText.slice(0, inputText.length - 1);
        setInputText(newContent);
    };



    const handleRegularKey = (key) => {

        let newContent;
        newContent = inputText + key;
        setInputText(newContent);
    };

    let myVariable = (
        <>
            <span>
                <input type="text" id="timeZ" value={inputText} maxLength={8} placeholder="HH/ММ/SS" onChange={(e) => setInputText(e.target.value)} />
                <button id="keyboard-btnZ" onClick={toggleFieldsVisibility}>🎹</button>
            </span>

            <div className='keyboard'>

                <div id='nothing'>


                    {fieldsVisible && (

                        <div className="keyboardcontainer">
                            <div className="container">
                                <div className="row">
                                    {['1', '2', '3', '4', '5',
                                        '6', '7', '8', '9', '0',
                                        '<i className="fa-solid fa-delete-left"></i>']
                                        .map((keyvalue) =>
                                        (
                                            <div key={keyvalue} className='key'
                                                onClick={() => handleKeyClick(keyvalue)}>
                                                {(
                                                    keyvalue ===
                                                        '<i className="fa-solid fa-delete-left"></i>'
                                                        ? (
                                                            <i className="fa-solid fa-delete-left"></i>
                                                        ) : (
                                                            <span>{keyvalue}</span>
                                                        )
                                                )}
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>


                    )}
                </div>




            </div>


        </>)
    return { myVariable, inputText, setInputText};
}

