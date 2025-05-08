import axios from "axios";
const url = 'api/contacts';

//Get data from server
const getData = ()=>{
    const req = axios.get(url);
    return req.then(response =>{
      return  response.data
    })
   
}

// put data into server
const createData = (contactData)=>{
    const req = axios.post(url, contactData);
    return req.then(response =>{
        return response.data
    })
}


//delete data from server
const deleteData = (id)=>{
    const req = axios.delete(`${url}/${id}`);
    return req.then(response =>{
        return response.data
    })
}


export default {getData, createData, deleteData}


