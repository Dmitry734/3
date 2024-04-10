import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';


export default function Menu() {


    const [selectedOption, setSelectedOption] = useState('');
    const [cronString, setCronString] = useState('');
    const [weeklyTime, setWeeklyTime] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [showTimeInput, setShowTimeInput] = useState({
        weekly: false,
        daily: false,
        monthly: false,
        yearly: false
    });

    const weekly = ["DayOfWeek", "Time"];
    const daily = ["Time"];
    const monthly = ["Day", "DayOfWeek", "Time"];
    const early = ["Month", "Day", "DayOfWeek", "Time"];

    const [showNumberPad, setShowNumberPad] = useState(false);

    const handleOptionChange = (e) => {
        const { value } = e.target;
        setSelectedOption(value);
        setShowTimeInput({
            weekly: value === 'weekly',
            daily: value === 'daily',
            monthly: value === 'monthly',
            yearly: value === 'yearly'
        });
    };

    const handleTimeChange = (e) => {
        setWeeklyTime(e.target.value);
    };

    const handleDayOfWeekChange = (e) => {
        setSelectedDayOfWeek(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleButtonClick = () => {
        setShowNumberPad(!showNumberPad);
    };

    const handleNumberClick = (number) => {
        setSelectedDay(number);
    };

    const renderInputOfWeekDay = () => {
        return (<select onChange={handleDayOfWeekChange} value={selectedDayOfWeek} id="selectionDayOfWeek">
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
        </select>
        );
    };
    const renderInputMonth = () => {
        return (
            <select onChange={handleMonthChange} value={selectedMonth} id="inputMonth">
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        );
    };

    const renderInputDayOfMonth = () => {
        return (
            <>
                <input
                    type="text"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    placeholder="Enter day of Month"
                    id="inputDay"
                />
                <button onClick={handleButtonClick}>Choose a day</button>
                {showNumberPad && (
                    <div>
                        {[...Array(31).keys()].map((number) => (
                            <button key={number} onClick={() => handleNumberClick(number + 1)}>{number + 1}</button>
                        ))}
                    </div>
                )}
            </>
        );
    };

    const renderInputOfTime = () => {
        return (
            <input
                type="time"
                value={weeklyTime}
                onChange={handleTimeChange}
                id="input_time"
            />
        )
    };

    // Словарь с массивами функций
    const struct_render = {
        weekly: [renderInputOfTime, renderInputOfWeekDay],
        daily: [renderInputOfTime],
        monthly: [renderInputOfTime, renderInputOfWeekDay, renderInputDayOfMonth],
        yearly: [renderInputMonth, renderInputOfTime, renderInputOfWeekDay, renderInputDayOfMonth]
    };
    const weeklyArr = [renderInputOfTime];


    const MyComponent = () => {
        const [results, setResults] = useState([]);

        useEffect(() => {
            // Вызов функций по ключам словаря
            const newResults = [];
            // Проверяем булево значение для каждого ключа
            Object.keys(showTimeInput).forEach(key => {
                if (showTimeInput[key]) {
                    // Если значение true, выполняем функции из соответствующего массива в functionDictionary

                    struct_render[key].forEach(func => {
                        const result = func();
                        newResults.push(result);
                    });
                }
            });
            setResults(newResults);
        }, []);

        return (
            <div>
                {results.map((result, index) => (
                    <>{result}</>
                ))}
            </div>
        );
    };

    const generateCron = () => {

        let cronString_pre;

        const [hours, minutes] = weeklyTime.split(':');
        if (showTimeInput.weekly) {
            cronString_pre = `${parseInt(minutes)} ${parseInt(hours)} * * * ${selectedDayOfWeek}`;
        }
        else if (showTimeInput.daily) {
            cronString_pre = `${parseInt(minutes)} ${parseInt(hours)} * * *`;
        }
        else if (showTimeInput.monthly) {
            cronString_pre = `${parseInt(minutes)} ${parseInt(hours)} ${parseInt(selectedDay)} * ${selectedDayOfWeek}`;
        }
        else if (showTimeInput.yearly) {
            cronString_pre = `${parseInt(minutes)} ${parseInt(hours)} ${parseInt(selectedDay)} ${selectedMonth} ${selectedDayOfWeek}`;
        }
        setCronString(cronString_pre);

    };
    const loadValuesFromCronString = () => {

        const [mm, hh, dayOfMonth, Month, dayOfWeek] = cronString.split(' ');

        setSelectedDay(dayOfWeek);
        if (mm !== '*' & hh !== '*') {
            setWeeklyTime(`${hh}:${mm}`);
        }

        if (dayOfMonth !== '*') { setSelectedDay(dayOfMonth); }
        if (Month !== '*') { setSelectedMonth(Month); }
        if (dayOfWeek !== '*') { setSelectedDayOfWeek(dayOfWeek); }
    };

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



                <div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="schedule"
                                value="weekly"
                                checked={selectedOption === 'weekly'}
                                onChange={handleOptionChange}
                            />
                            Weekly
                            {showTimeInput.weekly && <MyComponent />}
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="schedule"
                                value="daily"
                                checked={selectedOption === 'daily'}
                                onChange={handleOptionChange}
                            />
                            Daily
                        </label>
                        {//showTimeInput.daily && renderTimeInput()
                            showTimeInput.daily && <MyComponent />}
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="schedule"
                                value="monthly"
                                checked={selectedOption === 'monthly'}
                                onChange={handleOptionChange}
                            />
                            Monthly
                            {//showTimeInput.monthly && renderTimeInput()
                                showTimeInput.monthly && <MyComponent />}
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="schedule"
                                value="yearly"
                                checked={selectedOption === 'yearly'}
                                onChange={handleOptionChange}
                            />
                            Yearly
                            {//showTimeInput.yearly && renderTimeInput()
                                showTimeInput.yearly && <MyComponent />}
                        </label>
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
                value={cronString}

                readOnly
                placeholder="Cron string"
            />

        </>);
};
