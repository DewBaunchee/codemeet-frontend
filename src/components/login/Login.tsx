import React from "react";
import CmButton from "../ui-basic/form/button/CmButton";
import TextInput from "../ui-basic/form/text-input/TextInput";
import PasswordInput from "../ui-basic/form/password-input/PasswordInput";
import {AuthenticationService} from "../../domain/services/security/AuthenticationService";
import {Link, useNavigate} from "react-router-dom";
import {RoutePath} from "../../domain/RoutePath";
import {useForm} from "react-hook-form";
import GlobalForm from "../ui-basic/global-form/GlobalForm";
import BigTitle from "../ui-basic/big-title/BigTitle";
import VerticalSeparator from "../ui-basic/form/vertical-separator/VerticalSeparator";
import "../../styles/GlobalStyles.module.css";

const Login = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const signIn = data => {
        AuthenticationService.login(data.phone, data.password).subscribe(() => {
            navigate(RoutePath.MAIN, {replace: true});
            navigate(0);
        });
    };

    return (
        <GlobalForm>
            <BigTitle className="mb-5">Authorizing</BigTitle>
            <div>
                <TextInput placeholder="Phone number" className="col-12" {...register("phone")}/>
            </div>
            <div>
                <PasswordInput placeholder="Password" className="col-12" {...register("password")}/>
            </div>
            <div>
                <CmButton className="col-12 mt-3" styleType="primary" onClick={handleSubmit(signIn)} onEnter={true}>Sign In</CmButton>
            </div>
            <VerticalSeparator/>
            <div>
                <p className="hint m-2" style={{textAlign: "center"}}>New to CodeMeet?</p>
                <Link to={RoutePath.REGISTRATION}>
                    <CmButton className="col-12 m-0" styleType="secondary">Sign Up</CmButton>
                </Link>
            </div>
        </GlobalForm>
    );
}

export default Login;