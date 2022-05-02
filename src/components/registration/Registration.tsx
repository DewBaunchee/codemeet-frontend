import React from 'react';
import TextInput from "../ui-basic/form/text-input/TextInput";
import PasswordInput from "../ui-basic/form/password-input/PasswordInput";
import CmButton from "../ui-basic/form/button/CmButton";
import {RoutePath} from "../../domain/RoutePath";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AuthenticationService} from "../../domain/services/security/AuthenticationService";
import GlobalForm from "../ui-basic/global-form/GlobalForm";
import VerticalSeparator from "../ui-basic/form/vertical-separator/VerticalSeparator";
import BigTitle from "../ui-basic/big-title/BigTitle";

const Registration = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const signUp = data => {
        AuthenticationService.registration(data.phoneNumber, data.password, data.name).subscribe(() => {
            navigate(RoutePath.LOGIN, {replace: true});
        });
    };

    return (
        <GlobalForm>
            <BigTitle className="mb-5">Registration</BigTitle>
            <div>
                <TextInput placeholder="Your name" className="col-12" {...register("name")}/>
            </div>
            <div>
                <TextInput placeholder="Phone number" className="col-12" {...register("phoneNumber")}/>
            </div>
            <div>
                <PasswordInput placeholder="Password" className="col-12" {...register("password")}/>
            </div>
            <div>
                <PasswordInput placeholder="Confirm password" className="col-12" {...register("confirm")}/>
            </div>
            <VerticalSeparator/>
            <div>
                <CmButton className="col-6" styleType="primary" onClick={handleSubmit(signUp)}>Sign Up</CmButton>
                <Link to={RoutePath.LOGIN}>
                    <CmButton className="col-6" styleType="secondary">Sign In</CmButton>
                </Link>
            </div>
        </GlobalForm>
    );
};

export default Registration;