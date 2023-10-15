import React, {useContext, useEffect, useState} from 'react';
import http from "../../http/baseUrl";
import {IRecord} from "../../interface/IRecord";
import DayRecords from "../../components/admin/records/dayRecords";
import socket from "../../server/socket";
import DateRecordsList from "../../components/admin/records-calendar/date-records-list";
import AdminLogin from "../../components/admin/AdminLogin";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import './../../styles/admin/AdminMain.scss';
import Logo from '../../img/Logo';

const Admin = () => {

    const {store} = useContext(Context);

    const [chosenDate, setChosenDate] = useState<string>('');
    const [currentDateRecords, setCurrentDateRecords] = useState<Array<IRecord>>([]);
    const [availableDatesList, setAvailableDatesList] = useState<Array<string>>([]);

    useEffect(() => {
        store.checkAuth().then((response) => {
            if (response) {
                const nowDay = new Date();
                nowDay.setHours(nowDay.getHours() + 3);

                getCurrentDayRecords(nowDay.toISOString().slice(0, 10));
                getAllDatesList();
            }
        });

        socket.on('occupied-record', () => {
            getCurrentDayRecords(new Date().toISOString().slice(0, 10));
        });
    }, [store.isAuth, store]);

    const getAllDatesList = async () => {
        try {
            http.get('/records-all-dates/').then((response) => {
                setAvailableDatesList(response.data);
                setChosenDate(response.data[0]);
            });
        } catch (e) {
            console.log(e);
        }
    };

    const getCurrentDayRecords = async (date: string) => {
        try {
            http.get(`/records-current/${date}`).then(response => {
                setCurrentDateRecords(response.data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className='admin-container'>
            {!store.isAuth ?
                <AdminLogin/>
                    :
                <div className='admin-container-auth'>
                    <div className='header'><Logo/></div>
                    <DayRecords currentDayRecords={currentDateRecords} currentDay={chosenDate}/>
                    <DateRecordsList datesList={availableDatesList} getRecords={getCurrentDayRecords}/>
                </div>
            }
        </div>

    );
};

export default observer(Admin);