import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

const Register = () => {

    const {store, actions} = useContext(Context)

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(false)

    const handleRegister = () => {
        console.log(email, password)
        actions.createUser({email: email, password: password, active: active})
        navigate('/login')
    }

    return(
        <div>
            <h1 className="text-center">
                Register New User
            </h1>
            <div >
                <form onSubmit={() => handleRegister()} className="mb-3">
                    <div className="input-group d-flex flex-column align-items-center mb-4"> 
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control w-50"></input>
                    </div>
                    <div className="input-group d-flex flex-column align-items-center mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control w-50"></input>
                    </div>
                    <div className="input-group d-flex flex-column align-items-center mb-3">
                        <label htmlFor="active" className="form-label">Is Active</label>
                        <input required value={active} id="active" onChange={() => {
                            if(!active){
                                setActive(true)} else {
                                    setActive(false)
                                }}} 
                            type="checkbox" className="form-check-input"></input>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button onClick={() => handleRegister()} type="button" className="btn btn-primary mx-auto">Register</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}
export default Register