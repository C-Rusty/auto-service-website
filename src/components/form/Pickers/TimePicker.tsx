import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import http from "../../../http/baseUrl";

const SelectTime = (
    {
        selectedDate,
        selectedTime,
        setSelectedTime,
    }
        :
    {
        selectedDate: string,
        selectedTime: string,
        setSelectedTime: Dispatch<SetStateAction<string>>,
    }

) => {

    const [availableTimeList, setAvailableTimeList] = useState<Array<string>>([]);
    const [initialTime, setInitialTime] = useState<string | null>(null);

    const getAvailableTimeList = async (selectedDate: string) => {
        http.get(`/record-free-dates/${selectedDate}`).then((response) => {
            setAvailableTimeList(response.data);
            
            window.location.href.includes('admin') ? setInitialTime(selectedTime): setSelectedTime(response.data[0]);
        }).catch ((error: any) => {
            console.log(error);
        });
    };

    useEffect(() => {
       getAvailableTimeList(selectedDate);
    }, [selectedDate]);

    return (
        <select value={selectedTime} onChange={(event) => setSelectedTime(event.target.value)} className={'text-black'}>
            {initialTime && <option>{initialTime + ` - Текущее время`}</option>}
            {selectedTime ?
                availableTimeList.map(time =>
                    <option key={time} value={time}>{time}</option>
                )
                :
                <option>Свободных записей нет</option>
            }
        </select>
    );
};

export default SelectTime;