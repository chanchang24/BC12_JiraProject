import React from "react";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginWelcome from "assets/images/imgWelcome.svg";
import BgLogin from "assets/images/wave.png";
import "../../Auth/FormLogin.scss";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader/Loader";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import { actRegister } from "../module/action";

function Register(props) {
  const { values, touched, errors, handleChange, handleSubmit } =
    props;

  const [state, setState] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };




  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, userRegister } = useSelector(
    (state) => state.authReducer
  );

  if (loading) return <Loader />;
  return !userRegister ? (
    <div className="login-banner">
      <img className="wave" src={BgLogin} alt="login background" />
      <Container>
        <div className="img">
          <img src={LoginWelcome} alt="images personal" />
        </div>
        <form onSubmit={handleSubmit} className="login-box" method="post">
          <h1>Register</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <FormControl variant="standard" sx={{ m: 1, width: "30ch" }}>
            <InputLabel sx={{ color: "#fff" }} htmlFor="email">
              Email
            </InputLabel>

            <Input
              name="email"
              type="email"
              className="input-form"
              id="email"
              value={values.email}
              onChange={handleChange}
              aria-describedby="standard-email-helper-text"
              inputProps={{
                "aria-label": " email",
              }}
            />
            {touched.email && errors.email ? (
              <FormHelperText className="text-danger">{errors.email}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
            <InputLabel sx={{ color: "#fff" }} htmlFor="password">
              Password
            </InputLabel>
            <Input
              name="password"
              className="input-form"
              id="password"
              type={state.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {touched.password && errors.password ? (
              <FormHelperText className="text-danger">
                {errors.password}
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl
            className="confirm-password"
            sx={{ m: 1, width: "30ch" }}
            variant="standard"
          >
            <InputLabel sx={{ color: "#fff" }} htmlFor="rePassword">
              Confirm password
            </InputLabel>
            <Input
              name="rePassword"
              className="input-form"
              id="rePassword"
              type={state.showPassword ? "text" : "password"}
              value={values.rePassword}
              onChange={handleChange}
            />
            {touched.rePassword && errors.rePassword ? 
              <FormHelperText className="text-danger">
                {errors.rePassword}
              </FormHelperText>
            :""}
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, width: "30ch" }}>
            <InputLabel sx={{ color: "#fff" }} htmlFor="name">
              Name
            </InputLabel>
            <Input
              name="name"
              className="input-form"
              id="name"
              value={values.name}
              onChange={handleChange}
              aria-describedby="standard-name-helper-text"
              inputProps={{
                "aria-label": "name",
              }}
            />
            {touched.name && errors.name ? (
              <FormHelperText className="text-danger">
                {errors.name}
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, width: "30ch" }}>
            <InputLabel sx={{ color: "#fff" }} htmlFor="phoneNumber">
              Phone Number
            </InputLabel>
            <Input
              name="phoneNumber"
              className="input-form"
              id="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              aria-describedby="standard-phoneNumber-helper-text"
              inputProps={{
                "aria-label": "phoneNumber",
              }}
            />
            {touched.phoneNumber && errors.phoneNumber ? (
              <FormHelperText className="text-danger">
                {errors.phoneNumber}
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <button type="submit" className="btn-submit ">
            Register
          </button>
          <div class="flex-c-m">
            <Link to="/login" class="login100-social-item bg1">
              <FacebookOutlinedIcon />
            </Link>
            <Link to="/login" class="login100-social-item bg2">
              <TwitterIcon />
            </Link>
            <Link to="/login" class="login100-social-item bg3">
              <GoogleIcon />
            </Link>
          </div>
        </form>
      </Container>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}
const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Enter an email").email("Email is invalid!"),
    password: Yup.string()
     
      .min(6, "Password is too short").required("Enter a password"),
    name: Yup.string().required("Enter a name"),
    rePassword:Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match'),
    phoneNumber: Yup.string()
      .required("Enter a phone number")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is invalid"
      )
      .min(10, "to short")
      .max(10, "to long"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(actRegister(values))
  },

  displayName: "BasicForm",
})(Register);
export default connect()(LoginWithFormik);
