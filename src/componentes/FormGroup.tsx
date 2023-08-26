import { formGroup } from "./models/formGroup"

export default function FormGroup(props: formGroup){

    return(
        <div className="form-group">
            <label htmlFor={props.htmlfor}>{props.label}</label>
            {props.children}
        </div>
    )

}