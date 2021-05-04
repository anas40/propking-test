//libraries
import React, { useState, useEffect } from "react"
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import Axios from '../store/interceptor'

import { login as ll, promptLogin as pL } from '../store/atoms'
import image from '../assets/images/building1.jpeg'
import image2 from '../assets/images/building2.jpeg'
import image3 from '../assets/images/building3.jpeg'
import editIcon from '../assets/images/edit.png'
import cancelIcon from '../assets/images/cancel.png'
import doneIcon from '../assets/images/done.png'

import { useHistory } from 'react-router-dom';
import '../assets/css/land.css'

function Land(props) {
    const [isLogin] = useRecoilState(ll)
    const [promptLogin, setPromptLogin] = useRecoilState(pL)

    const land = props.detail
    const history = useHistory();
    const [name, setName] = useState(land.name);
    const [originalName, setOriginalName] = useState(land.name);
    const [editable, setEditable] = useState(false)

    function changeName() {
        if (!isLogin) {
            setPromptLogin(true)
            history.push('/login')
        }
        setEditable(true)
    }

    function updateName(event) {
        console.log(event.target.dataset);
        const {id} = event.target.dataset
        Axios.patch("", { id, field:"name",update:name }).then((data) => {
            setEditable(false)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="product-card">
            <div className="product-upper">
                <img src={image3} alt="buidling image" />
            </div>
            <div className="product-lower">
                <div className="name">
                    {editable
                        ? <div>
                            <input type="text" value={name} onChange={event => setName(event.target.value)} />
                            <img onClick={() => { setEditable(false); setName(originalName) }} className="icon cancelIcon" src={cancelIcon} alt="Cancel Change" />
                            <img data-id={land.id} onClick={updateName} className="icon doneIcon" src={doneIcon} alt="Done Name" /></div>
                        : <p>{name} <img onClick={changeName} className="icon editIcon" src={editIcon} alt="Edit Name" /></p>
                    }
                </div>
                <div className="area">
                    <p>{land.area}</p>
                </div>
                <div className="location">{`${land.city}, ${land.state}`}</div>
                <div className="country">{`${land.country}`}</div>

            </div>
        </div>
    )
}

export default Land