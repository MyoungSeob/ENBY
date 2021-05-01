// 모임 게시글 추가 만남 날짜, 시간

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)


export default function TableDatePicker() {
 const [date, setDate] = useState(new Date());
 console.log(date);
 
 return (
    <DatePicker
    selected={date}
    onChange={date => setDate(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    timeCaption="time"
    dateFormat="yyyy/MM/dd h:mm aa"
  />
);
};