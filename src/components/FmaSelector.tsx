import React from 'react'

const FMASelector = (props:any) => {

const fma_list = props.data.fma_list


const selectFMA =(fma:any)=>{
  props.setFMA(fma)
  props.onClose()

  let noDataEntry = [{date: Date.now(), activityCount: 0}]

  let fmaIncidents = props.data.incidents_overview.find((x:any)=> x.fma === fma.fma).records
  props.setShapeChartData([])
  setTimeout(()=>{
     props.setShapeChartData(fmaIncidents.length > 0 ? [...fmaIncidents,...noDataEntry] : [...noDataEntry, ...noDataEntry])
  },200)
  props.setFilterDates({
    startDate: null,
    endDate: null
  })
}

 return(
  <>
  <div className="modal-wrapper fade-in" onClick={props.onClose}/>
  <div className="modal-drawer slide-in-right">
    <div className="modal-close" onClick={props.onClose}>
      <i className="la la-times"></i>
    </div>
    <div className="selector-content">
      <h2><i className="la la-list mr-2"/>Select FMA</h2>
      <small>Fishery Management Areas</small>
      <hr/>

    {fma_list.map((x:any,index:number)=>{
      return(
        <div className={`selector-item fade-in ${props.currentFMA.fma === x.fma ? "active" : ""}`} key={index} style={{
          animationDelay: `0.${index}s`
        }}
        onClick={()=>{
          selectFMA(x)
        }}
        >
        <h2>
        <i className={`la ${props.currentFMA.fma === x.fma ? "la-check-square" : "la-expand"} mr-2`} />
          {x.fma}
        </h2>
        <small>{x.description}</small>
      </div>

      )
    })}





    </div>
  </div>
  </>
 )
}

export default FMASelector