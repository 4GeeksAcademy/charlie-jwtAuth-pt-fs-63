import React, {useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

const Login = () => {

    const {store, actions} = useContext(Context)

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = () => {
        actions.login({email: email, password: password})
        navigate('/profile')
    }

    return(
        <div>
            <h1 className="text-center">
                Log In With Your User
            </h1>
            <div >
                <form onSubmit={() => handleLogIn()} className="mb-3">
                    <div className="input-group d-flex flex-column align-items-center mb-4"> 
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control w-50"></input>
                    </div>
                    <div className="input-group d-flex flex-column align-items-center mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control w-50"></input>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button onClick={() => handleLogIn()} type="button" className="btn btn-primary mx-auto">Log In</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}
export default Login