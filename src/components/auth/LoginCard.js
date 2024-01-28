import {useEffect} from "react";
import {toast} from "react-toastify";
import {useLoginMutation} from "../../services/api/authApi.js";
import {Button} from "../ui/button.tsx";


const LoginCard = () => {
    const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.info('Success')
        }
        else if (isError) {
            toast.error(error.data.message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading])



    return (
        <div className="">
            <div className="card-body">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.target);
                    login({
                        email: data.get('email'),
                        password: data.get('password'),
                    })
                }}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-Mail</label>
                        <input type="text" className="bg-red-400" id="email" name="email" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" className="bg-red-400" id="password" name="password" required/>
                    </div>
                    <Button type="submit" variant="gradient">Login</Button>
                </form>
            </div>
        </div>
    )
}

export default LoginCard;