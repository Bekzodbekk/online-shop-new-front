import React from 'react'
import Card from '../../components/Card/Card'
import "./dashboardpage.scss"

const DashboardPage = () => {
  return (
    <div className='dashboard_page'>
      <div className="dashboard_con">

        <Card title={"To'liq savdo"} label={"1.300.000 so'm"}/>
        <Card title={"Sotilganlar soni"} label={"12 ta"}/>
        <Card title={"Tan narxi"} label={"500.000 so'm"}/>
        <Card title={"Foyda"} label={"800.000 so'm"}/>
        <Card title={"Qarzlar miqdori"} label={"1 ta"}/>
        <Card title={"Qarzlar narxi"} label={"300.000"}/>
      </div>
    </div>
  )
}

export default DashboardPage