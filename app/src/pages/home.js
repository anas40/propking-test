import React, { useState,useEffect } from 'react';
import Axios from '../store/interceptor'
import { login as ll,data as dt} from '../store/atoms'

//icons
import '../assets/css/footer.css';
import { useRecoilState } from 'recoil';
import Land from '../components/land'
import bg from '../assets/background/3.png'
function Home() {
    const [data, setData] = useState([])
    const [isLogin, setLogin] = useRecoilState(ll)
    const [isLoaded,setIsLoaded] = useState(false)
    useEffect(() => {
        Axios.get("").then(data => {
            console.log(data);
            setData(data)
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setIsLoaded(true)
        })
    },[])

    if (!isLoaded) {
        return (<div>Loadin...</div>)
    }
    if (data.toString() === "") {
        return (<div>No Data</div>)
    }
    return (
        <div id="box" style={{backgroundImage:`url(${bg})`}}>
            {data.data.map(land => {
                return (
                    <Land key={land.id} detail={land}/>
                )
            })}
        </div>
    )
}

export default Home;