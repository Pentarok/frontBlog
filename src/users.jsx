/* import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
    const [users,setUsers]=useState([]);
    
    useEffect(()=>{
      axios.get('http://localhost:3000/user').then(result=>setUsers(result.data)).then(console.log(users))

    },[])
    const handleDelete = (id)=>{
        axios.delete('http://localhost:3000/user/'+id).then(
res=>console.log(result)
        ).catch(err=>console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div>
            <button className='btn btn-primary'>
                <Link className='text-white' to='/register'>Add User</Link>
            </button>
<table className='table'>
    <thead>
    <tr>
        <th>
            Name
        </th>
        <th>Email</th>
        <th>Country</th>
        <th>Update</th>
        <th>Delete</th>
    </tr>
    </thead>

    <tbody>
    {
                users.length>0?
                users.map((user,index)=>
                    <tr key={index}>
          
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.country}</td>
            <td>
                <Link className='btn btn-success'style={{marginRight:'5px'}} to={`update/${user._id}`}>

                    Update
                </Link>
                </td>
                <td>
                <button className='btn btn-danger'  onClick={(e)=>handleDelete(user._id)}>Delete</button>
            </td>
        </tr>
                ):null
            }
        
    </tbody>
</table>
    </div>
    </div>
  )
}

export default Users */

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const serverUri = import.meta.env.VITE_SERVER;


    useEffect(() => {
      axios.get(`${serverUri}/user`)
        .then(result => {
          setUsers(result.data);
          console.log(result.data); // Log after the state is updated
        })
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${serverUri}/user/` + id)
          .then(res => {
            console.log(res); // Log the response
            setUsers(users.filter(user => user._id !== id)); // Update the state to remove the deleted user
          })
          .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div>
                <button className='btn btn-primary'>
                    <Link className='text-white' to='/register'>Add User</Link>
                </button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 ?
                                users.map((user, index) =>
                                    <tr key={index}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.country}</td>
                                        <td>
                                            <Link className='btn btn-success' style={{ marginRight: '5px' }} to={`update/${user._id}`}>
                                                Update
                                            </Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ) : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Users;
