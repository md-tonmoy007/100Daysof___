import axios from "axios"


export function isAuthenticated(request){
    axios.get("http://localhost:8000/api/authenticated",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         },
        }
    ).then
    (res=>{
        console.log(res.data.authenticated)   
        return res.data.authenticated
    })
    .catch(err=>{
        console.error(err)
        return false
    })
}