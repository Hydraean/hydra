import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment'


import "react-datepicker/dist/react-datepicker.css";


const DateFilters = (props:any) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

const applyDateFilters = () => {
  let dateSet = {
    startDate: startDate.toString(),
    endDate: endDate.toString()
  }

  props.setFilterDates(dateSet)
  props.applyFilters(startDate,endDate)
  props.onClose()
}

const formatDate = (date:any)=>{
  return moment(date).format("MMM D, YYYY")
}

useEffect(()=>{
  if(props.filterDates.startDate && props.filterDates.endDate){
   setStartDate(new Date(props.filterDates.startDate))
   setEndDate(new Date(props.filterDates.endDate))
  }
},[props])


 return(
  <>
  <div className="modal-wrapper fade-in" onClick={props.onClose}/>
  <div className="modal-drawer slide-in-right">
    <div className="modal-close" onClick={props.onClose}>
      <i className="la la-times"></i>
    </div>
    <div className="selector-content">
      <h2><i className="la la-calendar mr-2"/>Date Filter</h2>
      <small>Use the date filters below to set date filters<br/> for analytics.</small>
      <hr/>

      {props.filterDates.startDate && props.filterDates.endDate && (
        <>
          <h2 className="text-heading-center">{formatDate(props.filterDates.startDate)} - {formatDate(props.filterDates.endDate)}</h2>
        <hr/>
        </>
      )}

      <div className="date-card">

        <small><i className="la la-calendar mr-1"/> START DATE</small>
        <br/>
        <br/>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />

        {/* <button className="btn btn-dark btn-sm mt-3"><i className="la la-calendar mr-1"/> Select Start Date</button> */}
      </div>

      <div className="date-card">
        <small className="text-warning"><i className="la la-calendar mr-1"/>END DATE</small>
        <br/>
        <br/>
        <DatePicker minDate={startDate} selected={endDate} onChange={date => setEndDate(date)} />

        {/* <button className="btn btn-dark btn-sm mt-3"><i className="la la-calendar mr-1"/> Select End Date</button> */}
      </div>

      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-primary" onClick={applyDateFilters}>Apply Date Filters</button>
      </div>


    </div>
  </div>
  </>
 )
}

export default DateFilters