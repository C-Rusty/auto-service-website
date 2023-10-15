import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
import {IRecord} from "../../../interface/IRecord";
import SelectDate from "../../form/Pickers/select-date";
import SelectTime from "../../form/Pickers/TimePicker";
import socket from "../../../server/socket";
import http from "../../../http/baseUrl";
import './../../../styles/admin/AdminRecordChangeForm.scss'
import PhoneInput from 'react-phone-input-2';

const RecordChangeForm = (
    {
        oneRecord,
        setShowChangeForm
    }
        :
    {
        oneRecord: IRecord,
        setShowChangeForm: Dispatch<SetStateAction<boolean>>
    }
    ) => {

    const [availableDatesList, setAvailableDatesList] = useState<Array<string>>([]);

    const [recordName, setRecordName] = useState<string>(oneRecord.name);
    const [recordPhone,setRecordPhone] = useState<string>(oneRecord.phone);
    const [selectedDate, setSelectedDate] = useState<string>(oneRecord.date);
    const [selectedTime, setSelectedTime] = useState<string>(oneRecord.time);
    const [isOccupied, setIsOccupied] = useState<boolean>(oneRecord.isOccupied);
    const [details, setDetails] = useState<string | undefined>(oneRecord.details);

    const [recordActionType, recordSetActionType] = useState<string | null>(null);

    const getAvailableDates = () => {
        http.get('/records-all-dates').then((response) => {
            setAvailableDatesList(response.data);
        });
    };

    const submitRecord = (e: FormEvent<HTMLFormElement>, recordActionType: string | null) => {
        e.preventDefault();

        setShowChangeForm(false);

        let changedRecord: IRecord = {
            date: selectedDate,
            time: oneRecord.time,
            name: recordName,
            phone: recordPhone,
            isOccupied: isOccupied,
            details: details,
        };

        switch (recordActionType) {
            case 'free': 
                if (window.confirm(`Вы уверены, что хотите сделать эту запись свободной?`)) {
                    changedRecord = {
                        date: oneRecord.date,
                        time: oneRecord.time,
                        name: '',
                        phone: '',
                        isOccupied: false,
                        details: ''
                    };
                    socket.emit('booked-record', changedRecord);
                };
            break;

            case `transfer`:
                if (window.confirm(`Вы уверены, что хотите перенести запись на другую дату/время?`)) {
                    changedRecord = {
                        date: oneRecord.date,
                        time: oneRecord.time,
                        name: '',
                        phone: '',
                        isOccupied: false,
                        details: ''
                    };
                    socket.emit('booked-record', changedRecord);
        
                    changedRecord = {
                        date: selectedDate,
                        time: selectedTime,
                        name: recordName,
                        phone: recordPhone,
                        isOccupied: true,
                        details: details,
                    };
                    socket.emit('booked-record', changedRecord);
                }
            break;

            case `change`:
                if (
                    recordName === oneRecord.name &&
                    recordPhone === oneRecord.phone &&
                    selectedDate === oneRecord.date &&
                    selectedTime === oneRecord.time &&
                    details === oneRecord.details
                ) return alert("Вы не внесли никаких изменений");

                if (window.confirm(`Вы уверены, что хотите сохранить изменения в записи?`)) {
                    changedRecord = {
                        date: selectedDate,
                        time: selectedTime,
                        name: recordName,
                        phone: recordPhone,
                        isOccupied: isOccupied,
                        details: details,
                    };
                    socket.emit('booked-record', changedRecord);
                };
            break;

            case 'cancel':
                if (!window.confirm(`Вы уверены, что хотите отменить сделанные изменения/вернуться к записям?`)) {
                    setShowChangeForm(true);
                };
            break;
        };

        recordSetActionType(null);
    }

    useEffect(() => {
        getAvailableDates();
    }, []);

    return (
        <div className='record-item-change-form'>
            <form className="form-change" onSubmit={(e) => submitRecord(e, recordActionType)}>
                <label className="form-change__label">
                    <p>Дата</p>
                    <SelectDate
                        availableDatesList={availableDatesList}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </label>
                <label className="form-change__label">
                    <p>Время</p>
                    <SelectTime
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    />
                </label>
                <label className="form-change__label">
                    <p>Имя клиента</p>
                    <input type='text' value={recordName} onChange={e => setRecordName(e.target.value)}/>
                </label>
                <label className='form-change__label'>
                    <p>Телефон</p>
                    <PhoneInput
                        specialLabel={''}
                        showDropdown={false}
                        country={'by'}
                        value={recordPhone}
                        onChange={recordPhone => setRecordPhone(recordPhone)}
                        onlyCountries={['by']}
                        inputProps={{required: true, autoFocus: true}}
                        placeholder='+375(XX)XXX-XX-XX'
                        containerClass={'text-black phone-input'}
                    />
                </label>
                <label className='form-change__label'>
                    <p>Детали</p>
                    <textarea value={details} onChange={e => setDetails(e.target.value)}/>
                </label>
                <div className="form-change__btns-container btns-change__container">
                    <div className="btn-red">
                        <button type='submit' onClick={ () => recordSetActionType(`free`)}>Освободить запись</button>
                    </div>
                    <div className="btn-green">
                        <button type='submit' onClick={ () => recordSetActionType(`transfer`)}>Перенести запись</button>
                    </div>
                </div>
                <div className="form-change__btns-container">
                    <div className="btn-green">
                        <button type='submit' onClick={() => recordSetActionType(`change`)}>Сохранить изменения</button>
                    </div>
                    <div className="btn-red">
                        <button type='submit' onClick={ () => recordSetActionType(`cancel`)}
                        >Отменить изменения</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RecordChangeForm;