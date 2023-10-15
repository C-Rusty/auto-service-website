import {useEffect, useState} from 'react';
import {IRecord} from "../../../interface/IRecord";
import OneRecord from "./oneRecord";
import './../../../styles/admin/AdminDayRecords.scss';

const DayRecords = (
    {
        currentDayRecords, 
        currentDay,
    }
        : 
    {
        currentDayRecords: Array<IRecord>, 
        currentDay: string,
    }) => {

    const [filteredRecords, setFilteredRecords] = useState<Array<IRecord>>(currentDayRecords);
    const [isRecordDeleted, setIsRecordDeleted] = useState<boolean>(false);

    useEffect(() => {
        setFilteredRecords(currentDayRecords.filter(record => record.isOccupied));
    }, [currentDayRecords, isRecordDeleted]);

    const options: Object = {weekday: "long", year: 'numeric', month: 'long', day: "numeric"};

    return (
        <div className='day-records'>
            <div className='day-records__date'>
                <span>{new Date(currentDay).toLocaleDateString('ru-RU', options).toUpperCase()}</span>
            </div>
            <div className='day-records__records'>
                {filteredRecords.length ?
                    filteredRecords.map(record =>
                        <OneRecord 
                            key={record._id} 
                            oneRecord={record} 
                            setIsRecordDeleted={setIsRecordDeleted}
                        />
                    )
                    : <div className="day-records-none">
                        <span className="day-records-none__text">записей нет</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default DayRecords;