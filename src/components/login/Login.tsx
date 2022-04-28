import React from 'react';
import CmForm from "../ui-basic/form/CmForm";
import CmButton from "../ui-basic/form/button/CmButton";
import TextInput from "../ui-basic/form/text-input/TextInput";
import PasswordInput from "../ui-basic/form/password-input/PasswordInput";
import {AuthenticationService} from "../../domain/services/security/AuthenticationService";
import {Link, useNavigate} from "react-router-dom";
import {RoutePath} from "../../domain/RoutePath";
import {useForm} from "react-hook-form";

const Login = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const signIn = data => {
        AuthenticationService.login(data.phone, data.password).subscribe(() => {
            navigate(RoutePath.MAIN, {replace: true});
        });
    };

    return (
        <CmForm>
            <div>
                <TextInput placeholder="Phone number" {...register("phone")}/>
            </div>
            <div>
                <PasswordInput placeholder="Password" {...register("password")}/>
            </div>
            <div>
                <CmButton className="col-6" onClick={handleSubmit(signIn)}>Sign In</CmButton>
                <Link to={RoutePath.REGISTRATION}>
                    <CmButton className="col-6">Sign Up</CmButton>
                </Link>
            </div>
        </CmForm>
    );
}

export default Login;