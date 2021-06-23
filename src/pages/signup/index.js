import React from "react";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/client";
import Link from 'next/link'
import { useRouter } from "next/router";
import { Layout } from "../../components";
import { Label, Main } from "../../components/styled";
import * as utils from "../../utils";
import { useAuth } from "../../store/auth";
import { ADMIN_EXISTS } from "../../graphql";

export default function Signup() {
  const history = useRouter();
  const { dispatch } = useAuth();
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [check_email] = useLazyQuery(ADMIN_EXISTS, {

    onCompleted: ({ admins = [] }) => {
      if (admins.length > 0) {
        setError("Email already exists!");
      } else {
        setError("");
      }
    },
  });
  console.log(history)
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const isValid =
    form.email.trim() &&
    form.password.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    !error;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const result = await utils.register({
        email: form.email,
        password: form.password,
        lastName: form.lastName,
        firstName: form.firstName,
      });
      if (result?.success) {
        const user = await utils.login({
          email: form.email.trim(),
          password: form.password.trim(),
        });
        if (user?.sub) {
          dispatch({ type: "SET_USER", payload: { email: user?.email } });
          history.replace("/signup/company");
        }
      }
    } catch (error) {
      setError("Failed to register, please try again!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailExists = (value) =>
    check_email({ variables: { where: { email: { _eq: value } } } });

  return (

    <Layout>

      <Main>
        <Panel>
          <h1 className="text-2xl mb-6">Register</h1>
          <FieldSet>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="firstName"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="Enter your first name"
            />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="lastName"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="Enter your last name"
            />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Enter your email"
              onBlur={(e) => handleEmailExists(e.target.value)}
            />
          </FieldSet>
          <FieldSet>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              onChange={onChange}
              value={form.password}
              placeholder="Enter your password"
            />
          </FieldSet>
          <Link href="/login" className="mb-2 self-end text-indigo-500">
            Login instead?
          </Link>
          <Submit
            className={!isValid || submitting ? "disabled" : ""}
            onClick={() => (isValid || !submitting) && submit()}
          >
            {submitting ? "Submitting" : "Submit"}
          </Submit>
          {error && (
            <span className="self-start block text-red-500 mt-2">{error}</span>
          )}
        </Panel>
      </Main>
    </Layout>
  );
};

const Panel = styled.section`
width: 320px;
display: flex;
margin-left: auto;
margin-right: auto;
flex-direction: column;
justify-content: center;
align-content: center;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
`;

const FieldSet = styled.fieldset`
width: 100%;
display: flex;
flex-direction: column;
margin-bottom: 1rem;
`;

const Input = styled.input`
width: 100%;
display: block;
border-width: 1px;
height: 2.5rem;
border-radius: 0.25rem;
padding-left: 0.5rem;
padding-right: 0.5rem;
outline: 2px solid transparent;
outline-offset: 2px;
&:focus {
  border-width: 2px;
  --tw-border-opacity: 1;
  border-color: rgba(96, 165, 250, var(--tw-border-opacity));
}
`;

const Submit = styled.button`
width: 100%;
border-radius: 0.25rem;
height: 2.5rem;
--tw-bg-opacity: 1;
background-color: rgba(16, 185, 129, var(--tw-bg-opacity));
color: rgba(255, 255, 255, var(--tw-text-opacity));
text-transform: uppercase;
letter-spacing: 0.05em;

&:disabled {
  --tw-bg-opacity: 1;
  background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
  cursor: not-allowed;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
`;