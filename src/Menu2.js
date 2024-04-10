//import React from 'react';
//import ReactDOM from 'react-dom/client';
import { useState } from "react";
import Keyboard from "./keyboard";
//import Keyboard from "./Keyboard_simple";

export default function Menu() {
    ////=======
    const { myVariable, inputText, setInputText } = Keyboard();

    const [inputStateWeekChoose, setInputStateWeekChoose] = useState('');
    const [inputStateDailyChoise, setInputStateDailyChoise] = useState('');
    const [inputStateMounthlyChoose, setInputStateMounthlyChoose] = useState('');
    const [inputStateCustomChoise, setInputStateCustomChoise] = useState('');


    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputState, setInputState] = useState('enable');
    const [selectedDay, setSelectedDay] = useState('');

    const handleInputCustomChange = (e) => {
        setInputStateCustomChoise(e.target.value);
        setInputStateMounthlyChoose('disable');
        setInputStateWeekChoose('disable');
        setInputStateDailyChoise('disable');
    };
    const handleInputMounthlyChange = (e) => {
        setInputStateMounthlyChoose(e.target.value);
        setInputStateCustomChoise('disable');
        setInputStateWeekChoose('disable');
        setInputStateDailyChoise('disable');
    };

    const handleInputWeekChange = (e) => {
        setInputStateWeekChoose(e.target.value);
        setInputStateDailyChoise('disable');
        setInputStateCustomChoise('disable');
        setInputStateMounthlyChoose('disable');
    };
    const handleInputStateDailyChoise = (e) => {
        setInputStateDailyChoise(e.target.value);
        setInputStateWeekChoose('disable');
        setInputStateCustomChoise('disable');
        setInputStateMounthlyChoose('disable');
    };
    const handleDayOfWeekChange = (e) => {
        setSelectedDay(e.target.value);
    };

    const generateCron = () => {
        const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
        let cronString = "";
        let true_value_time, dayOfWeek, numDayOfWeek;


        if (document.getElementById("weekly_choise").checked) {
            true_value_time = inputText;

            //cronString = inputText;
            if (!timePattern.test(true_value_time)) {
                alert('Please enter time in format HH:MM:SS');
                return;
            }
            const [hours, minutes, seconds] = true_value_time.split(':');

            //dayOfWeek = document.getElementById("selectorDayOfWeek").value;
            numDayOfWeek = parseInt(selectedDay);

            cronString = `${parseInt(minutes)} ${parseInt(hours)} * * ${numDayOfWeek}`;

        }
        else if (document.getElementById("daily_choise").checked) {
            true_value_time = inputMinitsText;
            cronString = ` ${parseInt(true_value_time)} * * * *`;
        }
        else { cronString = ' * * * * *'; }


        setInputValue2(cronString);

    };


    const handleRadioChange = (e) => {
        setInputState(e.target.value);
        if (e.target.value === 'hideFields') {
            setInputValue1('');
            setInputValue2('');
        }
    };
    const handleInputChange = (e) => {
        setInputValue1(e.target.value);
    };
    const loadValuesFromCronString = () => {

        const [mm, hh, dayOfMonth, Month, dayOfWeek] = inputValue2.split(' ');
        setSelectedDay(dayOfWeek);
        setInputText(`${hh} ${mm}`);

    };

    ///-=====
    const myStyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "0px",
        margin: "0px 0px 0px px",
        fontFamily: "Sans-Serif"
    };
    const marginWeeklyStyle = {
        padding: "10px 100px",
        fontFamily: "Arial"
    };
    const marginSelectStyle = {
        padding: "0px 20px",
        fontFamily: "Arial"
    };
    const littleMarginLeftStyle = {
        padding: "0px 20px",
        fontFamily: "Arial"
    }

    const [inputMinitsText, setInputMinitsText] = useState('');



    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n .fieldset {\n            width: 60%;\n            margin: 0 auto;\n        }\n\n        .legend {\n            text-align: center;\n            font-size: 24px;\n            font-weight: bold;\n            padding: 0 20px;\n    }\n\n     .container {\n            border: 1px solid #ccc;\n            padding: 10px;\n            display: inline-block;\n        }\n\n        .time-input {\n            position: relative;\n            display: inline-block;\n        }\n\n        .time-input input {\n            padding-right: 30px;\n            /* добавляем место для значка клавиатуры */\n        }\n\n        .time-input button {\n            position: absolute;\n            top: 0;\n            right: 0;\n            padding: 5px;\n            font-size: 16px;\n        }\n\n        .keyboard-container {\n            display: none;\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            width: 100%;\n            background-color: #f9f9f9;\n            border: 1px solid #ccc;\n            padding: 10px;\n        }\n\n        .keyboard-button {\n            display: inline-block;\n            margin: 5px;\n            padding: 10px;\n            font-size: 16px;\n            cursor: pointer;\n        }\n    "
                }}
            />

            <fieldset>
                <legend><h2>Schedule Editor</h2></legend>



                <div className="first">
                    <div>
                        {inputState !== 'hideFields' && (
                            <div>
                                <input
                                    type="text"
                                    id="Input1"
                                    value={inputValue1}
                                    onChange={handleInputChange}
                                    disabled={inputState !== 'enable'}
                                    placeholder="Enter time (HH:MM:SS)"
                                    pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]"
                                />

                            </div>
                        )}
                        <br />
                        <label>
                            <input
                                type="radio"
                                id="radioEnable"
                                value="enable"
                                checked={inputState === 'enable'}
                                onChange={handleRadioChange}
                            />
                            Enable Input
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="disable"
                                checked={inputState === 'disable'}
                                onChange={handleRadioChange}
                            />
                            Disable Input
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="enableField1"
                                checked={inputState === 'enableField1'}
                                onChange={handleRadioChange}
                            />
                            Enable Input Field 1
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="hideFields"
                                checked={inputState === 'hideFields'}
                                onChange={handleRadioChange}
                            />
                            Hide Fields
                        </label>
                        <br />
                    </div>

                    <br />


                    <label>
                        <input type="radio" id="weekly_choise" name="category"
                            value="enable"
                            checked={inputStateWeekChoose === 'enable'}
                            onChange={handleInputWeekChange}
                        />
                        <span className="new_weekly_choise" style={myStyle}>
                            Weekly
                        </span>

                    </label>
                    <div style={marginWeeklyStyle}>
                        EveryDay
                        <span style={marginSelectStyle}>
                            <select
                                id="selectorDayOfWeek"
                                //disabled={inputState !== 'enable'}
                                onChange={handleDayOfWeekChange}
                                value={selectedDay}
                                disabled={inputStateWeekChoose !== 'enable'}
                            >
                                <option value="0">Monday</option>
                                <option value="1">Tuesday</option>
                                <option value="2">Wednesday</option>
                                <option value="3">Thursday</option>
                                <option value="4">Friday</option>
                                <option value="5">Saturday</option>
                                <option value="6">Sunday</option>
                            </select>
                            <div className="App">
                                At
                                <span style={littleMarginLeftStyle}>
                                    {myVariable}
                                </span>
                            </div>
                        </span>
                    </div>

                    <div id="daily_div" >
                        <span style={myStyle}>
                            <input type="radio" id="daily_choise" name="category"
                                value="enable"
                                checked={inputStateDailyChoise === 'enable'}
                                onChange={handleInputStateDailyChoise}
                            /> <label for="daily_choise">Daily</label>
                        </span>
                        <span style={littleMarginLeftStyle}>
                            Each
                            <input type="text" id="timaeZ" value={inputMinitsText} maxLength={2} placeholder="ММ" disabled={inputStateDailyChoise !== 'enable'} onChange={(e) => setInputMinitsText(e.target.value)} />
                            Minits
                        </span>
                    </div>
                    <div id="mounthly_div">
                        <span style={myStyle}>
                            <input type="radio" id="mounthly_choise" name="category"
                                value="enable"
                                checked={inputStateMounthlyChoose === 'enable'}
                                onChange={handleInputMounthlyChange}
                            />
                            <label for="mounthly_choise">Mounthly</label>
                        </span>
                    </div>
                    <div id="custom_div">
                        <span style={myStyle}>
                            <input type="radio" id="custom_choise" name="category"
                                value="enable"
                                checked={inputStateCustomChoise === 'enable'}
                                onChange={handleInputCustomChange}
                            />
                            <label for="custom_choise">Custom</label>
                        </span>
                    </div>
                </div>
            </fieldset>
            <button onClick={loadValuesFromCronString}>
                LOAD
            </button>
            <button onClick={generateCron}>
                SAVE
            </button>
            <br />
            <input
                type="text"
                value={inputValue2}

                readOnly
                placeholder="Cron string"
            />


        </>
    );
}

