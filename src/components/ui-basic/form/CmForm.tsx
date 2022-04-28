import s from "./CmForm.module.css";

export const CmForm = (props: any) => {
    return (
        <form className={s.form}>
            {props.children}
        </form>
    );
}

export default CmForm;