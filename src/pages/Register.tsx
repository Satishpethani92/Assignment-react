import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import "../scss/register.scss";

import "../scss/globals.scss";
import { useTitle } from "../utils/UseTitleUtils";
import auth, { AuthData } from "src/services/auth";

type Input = {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  state?: string;
  city?: string;
  country?: string;
};

interface RegisterProps {
  location?: {
    query?: {
      next: string;
    };
  };
}

const defaultInput = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  state: "",
  city: "",
  country: "",
};

const Register = ({ ...props }: RegisterProps) => {
  const [inputs, setInputs] = useState<Input>(defaultInput);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Input>({});

  const navigate = useNavigate();

  useTitle("Register");
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

    if (inputs.firstName.trim() == "") {
      err.firstName = "Please enter firstName.";
    }

    if (inputs.lastName.trim() == "") {
      err.lastName = "Please enter lastName.";
    }

    if (inputs.email.trim() == "") {
      err.email = "Please enter email address.";
    }
    if (inputs.gender.trim() == "") {
      err.gender = "Please enter gender.";
    }
    if (inputs.state.trim() == "") {
      err.state = "Please enter state.";
    }
    if (inputs.city.trim() == "") {
      err.city = "Please enter city.";
    }
    if (inputs.country.trim() == "") {
      err.country = "Please enter country.";
    }

    if (
      err.firstName ||
      err.lastName ||
      err.email ||
      err.gender ||
      err.state ||
      err.city ||
      err.country
    ) {
      setErrors(err);

      e.stopPropagation();
      return false;
    }

    return true;
  }

  function doRegister(e: React.FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }
    if (isLoading) return;
    if (!isValid(e)) return;
    setIsLoading(true);
    const payload = {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      state: "",
      city: "",
      count: "",
    };

    auth
      .register(payload)
      .then((response: AuthData) => {
        setIsLoading(false);

        console.log(response.firstName);
        setInputs(defaultInput);

        if (response.token != undefined) {
          response.token = global.authToken;
          navigate("/home", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Caught auth error: ${JSON.stringify(err)}`);

        if (err.code == 401) {
          setIsLoading(false);
          setErrors({
            // password: "Please enter valid account details",
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
    <div className="user-register row g-0 content-section">
      <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
        <div className="form-container">
          <h1 className="h1-text poppins font-color-black">Register</h1>
          <Form onSubmit={doRegister} className="poppins">
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                required
                value={inputs.firstName}
                className="poppins"
                onChange={(e) => handleChange("firstName", e as any)}
                isInvalid={errors.firstName != undefined}
              />
              {errorMessage("firstName")}
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                required
                value={inputs.lastName}
                className="poppins"
                onChange={(e) => handleChange("lastName", e as any)}
                isInvalid={errors.lastName != undefined}
              />
              {errorMessage("lastName")}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                required
                value={inputs.email}
                className="poppins"
                onChange={(e) => handleChange("email", e as any)}
                isInvalid={errors.email != undefined}
              />
              {errorMessage("email")}
            </Form.Group>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                required
                value={inputs.gender}
                className="poppins"
                onChange={(e) => handleChange("gender", e as any)}
                isInvalid={errors.gender != undefined}
              />
              {errorMessage("gender")}
            </Form.Group>
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                required
                value={inputs.state}
                className="poppins"
                onChange={(e) => handleChange("state", e as any)}
                isInvalid={errors.state != undefined}
              />
              {errorMessage("state")}
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                required
                value={inputs.city}
                className="poppins"
                onChange={(e) => handleChange("city", e as any)}
                isInvalid={errors.city != undefined}
              />
              {errorMessage("city")}
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                required
                value={inputs.country}
                className="poppins"
                onChange={(e) => handleChange("country", e as any)}
                isInvalid={errors.country != undefined}
              />
              {errorMessage("country")}
            </Form.Group>

            <button
              type="submit"
              disabled={isLoading}
              className="btn col-12 primary-btn primary-btn-lg"
            >
              Register
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
