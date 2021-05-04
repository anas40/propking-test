import { atom } from "recoil"

const login = atom({
    key: 'login',
    default: false
})
const data = atom({
    key: 'data',
    default:[]
})
const promptLogin = atom({
    key: 'promptLogin',
    default:false
})

export { login, data, promptLogin }