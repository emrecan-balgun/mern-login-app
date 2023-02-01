import toast from "react-hot-toast";

// validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  return errors;
}

// validate password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

// validate reset password
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_password) {
    errors.exist = toast.error("Passwords do not match!");
  }

  return errors;
}

// validate register form
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

// validate profile page
export async function profileValidation(values) {
  const errors = emailVerify({}, values);

  return errors;
}

// validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username is required!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Username cannot contain spaces!");
  }

  return error;
}

// validate password
function passwordVerify(error = {}, values) {
  //eslint-disable-next-line
  const specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  if (!values.password) {
    error.username = toast.error("Password is required!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Incorret password!");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password must be more than 4 characters!");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error(
      "Password must have at least one special character!"
    );
  }

  return error;
}

// validate email
function emailVerify(error = {}, values) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email) {
    error.email = toast.error("Email is required!");
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error("Incorret email!");
  }

  return error;
}
