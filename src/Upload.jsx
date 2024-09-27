import React, { useState } from 'react'

const Upload = () => {

const [img,setImg]=useState(null);
const [video,setVideo]=useState(null);
const [loading,setLoading]=useState(false);


const uploadFile = async (type)=>{
try{


let cloudName=process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

let resourceType = type==='image'?'image':'video';

let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}`;

const res = axios.post(api,data);

const {secure_url}=res.data;
return secure_url;
}catch(error){
    console.log(error)
}
}


  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
        <input type="file" name="" id=""  placeholder='image'/>
        <input type="file" name="" id="" placeholder='Video'/>
        <button type='submit'>Submit</button>
        </form>
    
    </div>

  )
}

export default Upload
