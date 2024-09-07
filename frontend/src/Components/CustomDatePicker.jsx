import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';

const CustomDatePicker = ({ selectedDate, onDateChange, label }) => (
    <div className="form__input w-50">
        <label htmlFor="date-picker">{label}</label>
        <br />
        <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            dateFormat="yyyy/MM/dd"
            className="datepicker-custom"
            id="date-picker"
        />
    </div>
);

export default CustomDatePicker;