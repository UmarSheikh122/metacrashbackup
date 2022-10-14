import * as yup from "yup";

export const loginValidation = yup.object({
  email: yup.string().required("This field is required!"),
  password: yup.string().required("This field is required!"),
});

export const signUpValidation = yup.object({
  email: yup
    .string()
    .email("This is not a valid email.")
    .required("This field is required!"),
  username: yup
    .string()
    .max(15, "Must be 15 characters os less!")
    .required("This field is required!"),
  password: yup.string()
  .min(8, 'Password must be 8 characters long')
  .matches(/[0-9]/, 'Password requires a number')
  .matches(/[a-z]/, 'Password requires a lowercase letter')
  .required("This field is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This field is required!")
});

export const verificationValidation=yup.object({
  // email: yup.string().required("This field is required!"),
  verificationCode:yup.string().required("This field is required!")
})
export const depositValidation=yup.object({
 usd : yup.string().required("This field is required!"),
  chain:yup.string().required("This field is required!")
})
export const withdrawValidation=yup.object({
  points:yup.number().required("This field is required!"),
  trxaddress:yup.string().required("This field is required!")
 })