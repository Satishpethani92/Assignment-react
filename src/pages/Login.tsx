import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import "../scss/login.scss";

import "../scss/globals.scss";
import { useTitle } from "../utils/UseTitleUtils";
import auth, { AuthData } from "src/services/auth";

type Input = {
  identity?: string;
  password?: string;
};

interface LoginProps {
  location?: {
    query?: {
      next: string;
    };
  };
}

const defaultInput = {
  identity: "",
  password: "",
};

const Login = ({ ...props }: LoginProps) => {
  const [inputs, setInputs] = useState<Input>(defaultInput);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Input>({});

  const navigate = useNavigate();

  useTitle("Login");
  function handleChange(
    fieldName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    delete errors[fieldName];
    setInputs({
      ...inputs,
      [fieldName]: e.target.value,
    });
    setErrors(errors);
  }

  function errorMessage(field: string) {
    if (typeof errors[field] === "undefined") return null;
    return (
      <Form.Control.Feedback className="font-color-red poppins" type="invalid">
        {errors[field]}
      </Form.Control.Feedback>
    );
  }

  function isValid(e: React.FormEvent<HTMLFormElement>) {
    var err: Input = {};

    var passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (inputs.identity.trim() == "") {
      err.identity = "Please enter email address.";
    }

    if (inputs.password.trim() == "") {
      err.password = "Please enter password.";
    }
    if (!inputs.password.match(passReg)) {
      err.password = "Please enter strong password.";
    }

    if (err.identity || err.password) {
      setErrors(err);

      e.stopPropagation();
      return false;
    }

    return true;
  }

  function doLogin(e: React.FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }
    if (isLoading) return;
    if (!isValid(e)) return;
    setIsLoading(true);
    const payload = {
      username: inputs.identity,
      password: inputs.password,
    };

    auth
      .login(payload)
      .then((response: AuthData) => {
        setIsLoading(false);

        console.log(response.firstName);
        localStorage.setItem("_auth", JSON.stringify(response));

        if (response.token != undefined) {
          response.token = global.authToken;
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Caught auth error: ${JSON.stringify(err)}`);

        if (err.code == 401) {
          setIsLoading(false);
          setErrors({
            password: "Please enter valid account details",
          });
          return;
        }

        if (err.errors) {
          setErrors(err.errors);
        }
        setIsLoading(false);
      });
  }

  return (
    <div className="user-login row g-0 content-section">
      <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
        <div className="form-container">
          <h1 className="h1-text poppins font-color-black">Login</h1>
          <Form onSubmit={doLogin} className="poppins">
            <Form.Group className="mb-3" controlId="identity">
              <Form.Label>User name:</Form.Label>
              <Form.Control
                type="username"
                required
                value={inputs.identity}
                className="poppins"
                onChange={(e) => handleChange("identity", e as any)}
                isInvalid={errors.identity != undefined}
              />
              {errorMessage("identity")}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  type={"password"}
                  value={inputs.password}
                  className="poppins"
                  isInvalid={errors.password != undefined}
                  onChange={(e) => handleChange("password", e as any)}
                />
                <InputGroup.Text
                  id="password"
                  className="bg-white input-group-text rounded-0"
                  tabIndex={0}
                  role={"button"}
                  onKeyDown={(e) => {
                    if (e.key == " " || e.key == "Enter") {
                      e.currentTarget.click();
                      e.preventDefault();
                    }
                  }}
                  onClick={() => {}}
                >
                  <i className="fas fa-eye" id="show_eye"></i>
                  <i
                    className="fas fa-eye-slash"
                    id="hide_eye"
                    style={{ display: "none" }}
                  ></i>
                </InputGroup.Text>
                {errorMessage("password")}
              </InputGroup>
            </Form.Group>

            <button
              type="submit"
              disabled={isLoading}
              className="btn col-12 primary-btn primary-btn-lg"
            >
              LOGIN
            </button>
          </Form>
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <div className="col-lg-12 d-lg-flex d-md-block flex-column py-4 right-bg">
          <div className="col-11 col-md-10 no-account-section m-auto text-center">
            <i className="fa-solid fa-address-card fa-3x font-color-primary"></i>
            <h3 className="h3-text work-sans mt-4">Don't have an account?</h3>
            <h3 className="h3-text work-sans">Sign up Today!</h3>

            <Link
              role="button"
              tabIndex={0}
              to={"/register"}
              onKeyDown={(e) => {
                if (e.key == " " || e.key == "Enter") {
                  e.currentTarget.click();
                  e.preventDefault();
                }
              }}
              className="align-items-center btn col-10 justify-content-center mt-4 primary-btn py-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
