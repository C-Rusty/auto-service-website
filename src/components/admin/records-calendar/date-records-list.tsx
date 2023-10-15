import {useEffect, useRef, useState} from 'react';
import {localizationForLocale, optionsForLocale} from "../../../modules/ISO-to-Locale";
import './../../../styles/admin/AdminDayRecordsList.scss';

const DateRecordsList = (
    {
        datesList, 
        getRecords
    }
    : 
    {
        datesList: Array<string>, 
        getRecords: (date: string) => void
    }) => {

    const dateSearch = useRef<HTMLInputElement | null>(null);

    return (
        <div className='dates'>
            <div className='dates__search-bar'>
                <label>
                    <span>Поиск дня (в разработке)</span>
                    <input type="text" ref={dateSearch} placeholder="Дата/День"/>
                </label>
            </div>
            <div className='dates__list'>
                {datesList.map(date =>
                    <div className='one-date'
                        key={date} 
                        onClick={() => {
                            getRecords(date);
                            window.scrollTo({top: 0, behavior: `smooth`})}
                        }
                    >
                        {new Date(date).getMonth() === new Date(date).getMonth() ? 
                            <span>
                                {new Date(date).toLocaleDateString(localizationForLocale, optionsForLocale)}
                            </span> 
                            :
                            <span>
                                {new Date(date).toLocaleDateString(localizationForLocale, optionsForLocale)}
                            </span>  
                    }
                    </div>
                )}
            </div>
        </div>

    );
};

export default DateRecordsList;