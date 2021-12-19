export const validate = (data, type) => {
    const errors = {};
    ///empty string is false
   

    if (!data.email) {  //if data.email was empty
        errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email address is invalid";
    }else {
        delete errors.email;
    }

    if (!data.password) {   //if data.password was empty
        errors.password = "Password required";
    } else if (data.password.length < 6) {
        errors.password = "password needs to be at least 6 characters";
    }
    else {
        delete errors.password;
    }

    if (type === "Signup") {

        if (!data.name.trim()) { //if data.name without spaces was empty
            errors.name = "Username required";
        } else {
            delete errors.name;
        }
        if (!data.confirmPass) {    //if data.confirmPass was empty
            errors.confirmPass = "Confirm the password";
        } else if (data.password !== data.confirmPass) {
            errors.confirmPass = "Those passwords didn’t match";
        }
        else {
            delete errors.confirmPass;
        }
    
        if (data.isAccepted) {  //if checkbox is checked
            delete errors.isAccepted;
        } else {
            errors.isAccepted = "Accept rules";
        }
    }
    return errors;

}