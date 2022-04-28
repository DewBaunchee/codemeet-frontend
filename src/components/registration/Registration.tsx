import React from 'react';
import CmForm from "../ui-basic/form/CmForm";
import TextInput from "../ui-basic/form/text-input/TextInput";
import PasswordInput from "../ui-basic/form/password-input/PasswordInput";
import CmButton from "../ui-basic/form/button/CmButton";
import {RoutePath} from "../../domain/RoutePath";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AuthenticationService} from "../../domain/services/security/AuthenticationService";

const Registration = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const signUp = data => {
        AuthenticationService.registration(data.phoneNumber, data.password, data.name).subscribe(() => {
            navigate(RoutePath.LOGIN, {replace: true});
        });
    };

    return (
        <CmForm>
            <div>
                <TextInput placeholder="Your name" {...register("name")}/>
            </div>
            <div>
                <TextInput placeholder="Phone number" {...register("phoneNumber")}/>
            </div>
            <div>
                <PasswordInput placeholder="Password" {...register("password")}/>
            </div>
            <div>
                <PasswordInput placeholder="Confirm password" {...register("confirm")}/>
            </div>
            <div>
                <CmButton className="col-6" onClick={handleSubmit(signUp)}>Sign Up</CmButton>
                <Link to={RoutePath.LOGIN}>
                    <CmButton className="col-6">Sign In</CmButton>
                </Link>
            </div>
        </CmForm>
    );
};

export default Registration;