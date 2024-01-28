import {useEffect} from "react";
import {toast} from "react-toastify";
import {useLoginMutation} from "../../services/api/authApi.js";


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
        <div className="card">
            <div className="card-body">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.target);
                    login({
                        username: data.get('username'),
                        password: data.get('password'),
                    })
                }}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" className="form-control" id="password" name="password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginCard;