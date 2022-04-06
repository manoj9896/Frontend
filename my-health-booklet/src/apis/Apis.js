import axios from 'axios'
const backEndServer = "http://localhost:8000/"

export async function LoginApi(userId,password){
    let url = backEndServer + "checkLogin"

    let params = {
        userId : userId,
        password : password
    }
    let res = await axios.get(url,{params})
    return res;
}