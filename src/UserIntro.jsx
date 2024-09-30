import React from 'react'
import { useContext } from 'react'
import { UserContext } from './Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
const UserIntro = () => {

    const userData = useContext(UserContext)
  return (
    <div>
        <div>
          
           <h5 className='text-center'>Hello welcome back &nbsp;{userData.user}</h5>
        </div>
        <div className="info-container">
           {/*   to serve dynamic content */}
        </div>
    </div>
  )
}

export default UserIntro