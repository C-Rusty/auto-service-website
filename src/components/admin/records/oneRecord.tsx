import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {IRecord} from "../../../interface/IRecord";
import RecordChangeForm from "../form/AdminRecordChangeForm";
import './../../../styles/admin/AdminRecord.scss';
import socket from '../../../server/socket';

const OneRecord = (
    {
        oneRecord, 
        setIsRecordDeleted
    }
        : 
    {
        oneRecord: IRecord,
        setIsRecordDeleted: Dispatch<SetStateAction<boolean>>
    }) => {

    const [showChangeForm, setShowChangeForm] = useState<boolean>(false);

    const deleteRecord = async (recordId: string | undefined) => {
        if (!window.confirm(`Вы уверены, что хотите удалить запись?`)) return;
        
        socket.emit('delete-record-by-id', recordId);
        setIsRecordDeleted(true);
        oneRecord.isOccupied = false;
    };

    return (
        <>
          {!showChangeForm ?
                <div key={oneRecord._id} className='record-item'>
                    <div className='record-item__inner'>
                        <div className='records-props'>
                            <p>Время записи:</p>
                            <p>{oneRecord.time}</p>
                            <hr/>
                        </div>
                        <div className='records-props'>
                            <p>Имя:</p>
                            <p>{oneRecord.name}</p>
                            <hr/>
                        </div>
                        <div className='records-props'>
                            <p>Телефон:</p>
                            <p>{`8 (0${oneRecord.phone.slice(3,5)}) ${oneRecord.phone.slice(5,8)}-${oneRecord.phone.slice(8,10)}-${oneRecord.phone.slice(10, 12)}`}</p>
                            <hr/>
                        </div>
                        <div className='records-props'>
                            <p>Детали:</p>
                            {oneRecord.details?.length ?
                                <p>{oneRecord.details}</p>
                                :
                                <p>Не указано</p>
                            }
                            <hr/>
                        </div>
                        <div className='submit-btn'>
                            <button onClick={() => setShowChangeForm(true)}>Изменить запись</button>
                        </div>
                        <div className='delete-btn'>
                            <button onClick={() => deleteRecord(oneRecord!._id)}>Удалить запись</button>
                        </div>
                    </div>
                </div>
                :
                <RecordChangeForm oneRecord={oneRecord} setShowChangeForm={setShowChangeForm}/>
            }
        </>

    )
}

export default OneRecord;