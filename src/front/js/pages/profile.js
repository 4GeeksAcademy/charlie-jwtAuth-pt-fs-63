import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";

const Profile = () => {

    const token = localStorage.getItem("access-token")
    const {store, actions} = useContext(Context)

    useEffect(() => {
        if (token)actions.getUser()
    }, [])

    //La página carga demasiado rapido para leer el valor del token.

    return(
        <div className="mt-5 pt-5">
            <h1 className="text-center">
                {token ? `This is ${store.user?.email}'s Profile`
                : "Log in or refresh in to view profile"}
            </h1>
        </div>
    )
}

export default Profile