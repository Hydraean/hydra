import React from 'react'

const DateFilters = (props:any) => {

 return(
  <>
  <div className="modal-wrapper fade-in" onClick={props.onClose}/>
  <div className="modal-drawer slide-in-right">
    <div className="modal-close" onClick={props.onClose}>
      <i className="la la-times"></i>
    </div>
    <div className="selector-content">
      <h2><i className="la la-calendar mr-2"/>Date Filter</h2>
      <small>Use the date filters below to set <br/>date filters for analytics.</small>
      <hr/>

      <div className="date-card">
        <h2 className="text-active">Dec. 20, 2020</h2>
      </div>


    </div>
  </div>
  </>
 )
}

export default DateFilters