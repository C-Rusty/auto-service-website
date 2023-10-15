import React, {useEffect, useRef, useState} from 'react';
import TimePicker from "../../form/Pickers/TimePicker";
import {IRecord} from "../../../interface/IRecord";
import socket from "../../../server/socket";
import http from "../../../http/baseUrl";
import MoadlNotice from "../MoadlNotice";
import PhoneInput from 'react-phone-input-2';
import '../../../styles/client/ClientContent/ClientForm.scss';
import DatePicker from '../../form/Pickers/DatePicker';

const ClientForm = () => {

    const [availableDatesList, setAvailableDatesList] = useState<Array<string>>([]);

    const inputName = useRef<HTMLInputElement | null>(null);
    const [inputPhoneNo, setInputPhoneNo] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const inputAddDetails = useRef<HTMLTextAreaElement | null>(null);

    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const initializeForm = () => {
        http.get('/records-all-dates').then((response) => {
            setAvailableDatesList(response.data);
            setSelectedDate(response.data[0]);
        });
    };

    const submitData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (inputName.current?.value === '' || inputPhoneNo === '') {
            return alert('Вы не заполнили одно или несколько обязательных полей');
        } else if (new Date().getDate() > new Date(selectedDate).getDate()) {     
            return alert('Пожалуйста, выберите сегодняшний или другой день');
        } else if (selectedTime === ``) {
            return alert(`Пожалуйста, выберите другой день. На сегодня не осталось свободных записей`);
        };

        const bookedRecord: IRecord = {
            date: selectedDate,
            time: selectedTime,
            name: inputName.current!.value.toLowerCase().trim(),
            phone: inputPhoneNo,
            isOccupied: true,
            details: inputAddDetails.current?.value.toLowerCase().trim()
        };
        socket.emit('booked-record', bookedRecord);

        cleanInputs();
        setIsSubmit(true);
        initializeForm();
    }

    const cleanInputs = () => {
        inputName.current!.value = '';
        setInputPhoneNo('');
        inputAddDetails.current!.value ='';
    }

    useEffect(() => {
        initializeForm();
    }, []);
    

    return (
        <section className='form-section hide-form' id='form'>
            <div className='form-header'>
                <h1>Запишитесь к нам на обслуживание</h1>
            </div>
            <div className='form-container'>
                <form
                      onSubmit={(event) => {
                          submitData(event);
                      }}>
                    <label className="name-inner label-container">
                        <span className="label-container__name">Имя*</span>
                        <input type="text" ref={inputName} className='text-black label-container__input'  name="name"/>
                    </label>
                    <label className="phone-inner label-container">
                        <span className="label-container__name ">Номер телефона*</span>
                        <PhoneInput
                            specialLabel={''}
                            showDropdown={false}
                            country={'by'}
                            value={inputPhoneNo}
                            onChange={inputPhoneNo => setInputPhoneNo(inputPhoneNo)}
                            onlyCountries={['by']}
                            inputProps={{required: true, autoFocus: true}}
                            placeholder='+375(XX)XXX-XX-XX'
                            containerClass={'text-black'}
                        />
                    </label>
                      <label className="date-inner label-container">
                        <span className="label-container__name ">Выберите дату записи*</span>
                        <DatePicker  dates={availableDatesList} setSelectedDate={setSelectedDate}/>
                      </label>
                    <label className="time-label label-container">
                        <span className="label-container__name ">Время записи*</span>
                        <TimePicker
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                        />
                    </label>
                    <label className="info-inner textarea-container">
                        <span className="label-container__name ">Дополнительная информация</span>
                        <textarea name="additionalDetails" ref={inputAddDetails} className='text-black label-container__input' cols={10} rows={5}></textarea>
                    </label>
                    <div className='btn-container'>
                        <button className="btn-sbmt" type="submit">Записаться</button>
                    </div>
                </form>
                <MoadlNotice selectedDate={selectedDate} selectedTime={selectedTime} isSubmit={isSubmit} setIsSubmit={setIsSubmit}/>
            </div>
        </section>
    );
};

export default ClientForm;