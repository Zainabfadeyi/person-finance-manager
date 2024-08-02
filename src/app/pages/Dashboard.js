import React from 'react'
import Bar from '../component/mainpage/Bar'
import styles from '../../styles/dashboard.module.css'
import TanStackTable from '../component/mainpage/TanStackTable'
import Progress from '../component/mainpage/Progress'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.TopContainer}>
        <div className={styles.first}>
         <div style={{fontSize:"18px",fontWeight:"600"}}>Total income</div> 
          <div style={{fontSize:"30px",fontWeight:"900"}}>165000</div>
          <div>16% vs last month </div>
        </div>
        <div className={styles.first}> 
          <div style={{fontSize:"18px",fontWeight:"600"}}>Total expense</div>
          <div style={{fontSize:"30px",fontWeight:"900"}}>340000</div>
         <div>16%  vs last month</div> 
        </div>
        <div className={styles.second}>
          <div className={styles.section}>
            <div className={styles.plus}>+</div> 
            <div style={{fontWeight:"700"}}> Add Transaction</div>
          </div>
        </div>


      </div>
      <div className={styles. display} >
        <div style={{width:"100%", border:"1px solid #c5c5c5",marginRight:"15px", borderRadius:"10px"}}>
        <Bar/>
        </div>
        
       <Progress/>
       </div>
       <div style={{width:"100%", marginTop:"20px"}}>
        <TanStackTable/>
        </div>      
 </div>
  )
}

export default Dashboard;