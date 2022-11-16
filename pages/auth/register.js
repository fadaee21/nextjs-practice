import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { error, loading, register } = useContext(AuthContext);

    useEffect(() => {
        error && toast.error(error)
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.error("name, email and password is required")
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        register({ name, email, password, confirmPassword });
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="c-password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="c-password" onChange={e => setConfirmPassword(e.target.value)} />
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary">
                            register
                            {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;