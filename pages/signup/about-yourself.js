import React from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import { useAuth } from "../../store/auth";
// import VerifyEmailBanner from "./VerifyEmailBanner";
import { UPDATE_USER, UPDATE_ORGANIZATION } from "../../graphql";
import { Footer, Main, Field, Label, Form, Button, H2 } from "../../components/styled";

export default function AboutYourself() {
  const { user } = useAuth();
  const history = useRouter();
  const [form, setForm] = React.useState({
    phoneNumber: "",
    designation: "",
  });
  const [update_org] = useMutation(UPDATE_ORGANIZATION, {
    onCompleted: () => {
      history.push("/signup/hosting");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [update] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      update_org({
        variables: {
          id: user.organization.id,
          _set: {
            onboardStatus: "HOSTING",
          },
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  React.useEffect(() => {
    if (user?.id) {
      setForm((form) => ({
        ...form,
        designation: user?.designation || "",
        phoneNumber: user?.phoneNumber || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const submit = () => {
    update({
      variables: {
        id: user.id,
        _set: {
          designation: form.designation,
          phoneNumber: form.phoneNumber,
        },
      },
    });
  };

  return (
    <Layout>
      <Main>
        {/* {!user?.keycloak?.email_verified && <VerifyEmailBanner />} */}
        {!user?.keycloak?.email_verified && <div />}
        <section className="mt-8 mx-auto w-1/4">
          <H2>Tell us about yourself</H2>
          <Form>
            <Field>
              <Label htmlFor="designation">Designation</Label>
              <input
                type="text"
                required
                id="designation"
                name="designation"
                value={form.designation}
                autoComplete="off"
                placeholder="Enter your designation"
                onChange={(e) => handleChange(e)}
              />
            </Field>
            <Field>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={form.phoneNumber}
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                placeholder="Enter your phone number"
              />
            </Field>
          </Form>
        </section>
      </Main>
      <Footer>
        <Button onClick={() => history.push("/signup/company")}>Back</Button>
        <Button onClick={submit}>Next</Button>
      </Footer>
    </Layout>
  );
};
