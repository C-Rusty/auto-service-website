import {Dispatch, SetStateAction, useEffect} from 'react';
import {localizationForLocale, optionsForLocale} from "../../../modules/ISO-to-Locale";

const SelectDate = (
    {
        availableDatesList,
        selectedDate,
        setSelectedDate
    }
        :
    {
        availableDatesList: Array<string>,
        selectedDate: string,
        setSelectedDate: Dispatch<SetStateAction<string>>
    }
) => {

    useEffect(() => {

    }, []);

    return (
        <select value={selectedDate} onChange={(event) => setSelectedDate(event.target.value) } className={'text-black'}>
            {availableDatesList.map(date =>
                <option key={date} value={date}>{new Date(date).toLocaleDateString(localizationForLocale, optionsForLocale)}</option>
            )}
        </select>
    );
};

export default SelectDate;