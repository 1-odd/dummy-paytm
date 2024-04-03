import React,{ useEffect } from 'react';
import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
import axios from 'axios';



function Dashboard () {
  
  const [balance, setBalance] = React.useState(0);
 
  useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance',{
          headers:{
            "Authorization": localStorage.getItem("token") || ""
          }
        }).then((response)=>{
          setBalance(response.data.balance)
        })
  },[balance])
  return (
    <div>

      <Appbar/>
      <div className='m-8' >
        <Balance value={balance} />
        <Users/>
      </div>
      
    </div>
  )
}

export default Dashboard 