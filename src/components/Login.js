import React,{useState,useRef} from "react";
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.services"
const required = (value)=>{
    if(!value){
        return (
            <div className="alert alert-danger"role="alert">
                This field is Required!
            </div>
        )
    }
}
const Login = ()=>{
    const form = useRef();
    const checkBtn = useRef();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState("");
    const onChangeEmail = (e)=>{
        const email = e.target.value;
        setEmail(email)
        // console.log(email)
    };
    const onChangePassword=(e)=>{
        const password=e.target.value;
        setPassword(password)
        // console.log(password)
    };
    const handleLogin = (e)=>{
        e.preventDefault();
        console.log("logging in")
        setMessage("");
        setLoading(true);
        form.current.validateAll();
        if(checkBtn.current.context._errors.length === 0){
            AuthService.login(email,password).then(
                ()=>{
                    // props.history.push("/profile");
                    window.location.assign("/profile");
                },
                (error)=>{
                    const resMessage = (error.response && 
                        error.response.data &&
                        error.response.data.message)||
                        error.message ||
                        error.toString();
                        setLoading(false);
                        setMessage(resMessage)

                }

            )
        }else{
            setLoading(false);
        }
    }
    return(
        <div className="col-md-12">
            <div className="card card-container">
                <img
                src ="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt ="profile-img"
                className="profile-img-card"/>
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                        type ="text"
                        className="form-control"
                        name={email}
                        onChange = {onChangeEmail}
                        validations={[required]}
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}/>

                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading} onClick={handleLogin}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
               
                        </button>

                    </div>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display:"none"}}ref={checkBtn}/>

                </Form>
            </div>
        </div>
    )
}
export default Login;