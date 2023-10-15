import {Dispatch, SetStateAction, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';

const TestDate = (
  {
    dates, 
    setSelectedDate
  }
    : 
  {
    dates: Array<string>, 
    setSelectedDate: Dispatch<SetStateAction<string>>
  }) => {

    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(dayjs(dates[0]));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <DatePicker
            minDate={dayjs(dates[0])}
            maxDate={dayjs(dates[dates.length - 1])}
            defaultValue={dayjs(dates[0])}
            value={selectedDay}
            className='date-picker'
            onChange={(day: any) => {
                setSelectedDate(day!.toISOString().slice(0, 10));
                setSelectedDay(day);
            }}
          />
      </LocalizationProvider>
    );
};

export default TestDate;