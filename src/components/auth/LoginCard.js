import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useLoginMutation} from "../../services/api/authApi.js";
import {Button} from "../ui/button.tsx";
import {useSelector} from "react-redux";


const LoginCard = () => {

    const [login, {data, isLoading, isError, error, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.info('Success')
            console.log(data)
        }
        else if (isError) {toast.error(error?.data?.message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading])


    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });


    return (
        <div className="">
            <div className="card-body">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-Mail</label>
                        <input type="text" className="bg-red-400" id="email" name="email" onChange={(e) => {
                            setFormState({
                                ...formState,
                                email: e.target.value,
                            })
                        }}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" className="bg-red-400" id="password" name="password" onChange={(e) => {
                            setFormState({
                                ...formState,
                                password: e.target.value,
                            })

                        }} />
                    </div>
                    <Button type="submit" variant="gradient" onClick={() => {
                        login(formState)

                    }}>Login</Button>
                </form>
            </div>
        </div>
    )
}

export default LoginCard;