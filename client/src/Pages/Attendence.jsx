import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import moment from 'moment'
const Attendence = ({setPop,login}) => {
    const [students,setStudents]=useState([])
    const [attend,setAttend]=useState([])
    const token=sessionStorage.getItem('token');
    useEffect(()=>{
        axios.get("http://localhost:9600/student",{headers:{"x-token":token}})
        .then((res)=>{
            setStudents(res.data)
            console.log(login)
        })
        .catch((err)=>{console.log(err)})
    },[login])

   const attendHandler=()=>{ 
    const inform=confirm(`Total Present is : '${attend.length}' \n Press "OK" to Submit or Press "Cancel" to Modify.`)
    if(inform){
        axios.post("http://localhost:9600/attendence",{attend:attend},{headers:{"x-token":token}})
        .then((res)=>{
         alert(res.data)
         })
        .catch(err=>console.log(err))
          }
    }
    
  return (
    <>
    <div className='attendence'>
        <div className="info">
            <h3>Room Attendence</h3>
            <h3>Date:{moment(new Date()).format('DD-MM-YYYY')}</h3>
        </div>
        <div className="list">
            <table>
                <tr>
                    <th>Reg-No</th>
                    <th>Name</th>
                    <th>Attendence</th>
                </tr>
                   {
                    students.map((item,id)=>{
                        return (
                            <tr key={id}>
                            <td>{item.studentId}</td>
                            <td>{item.studentName}</td>
                            <td><input type="checkBox" onChange={(e)=>{
                                if(e.target.checked){ setAttend([...attend,item._id])}
                                else{
                                     const list= attend.filter(user=> user!=item._id)
                                     setAttend(list);
                                    }
                            }}/></td>
                            </tr>
                        ) }) 
                     }
               
            </table>
        </div>
        <p className='sub-btn' onClick={attendHandler}>Submit</p>
    </div>
    </>
    
  )
}

export default Attendence