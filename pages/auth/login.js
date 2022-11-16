import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { error, loading, login } = useContext(AuthContext);

    useEffect(() => {
        error && toast.error(error)
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            toast.error("name, email and password is required")
            return;
        }

        login({ email, password });
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary">
                            login
                            {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;