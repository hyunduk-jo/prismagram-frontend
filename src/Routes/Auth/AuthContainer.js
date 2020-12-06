//hooks, state, query
import React, { useState } from 'react';
import AuthPresenter from "./AuthPresenter";
import useInput from '../../Hooks/useInput';
import { useMutation } from '@apollo/client';
import { CONFIRM_SECRET, CREATE_ACCOUNT, LOCAL_LOG_IN, LOG_IN } from './AuthQueries';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export default () => {
  const [action, setAction] = useState("login");
  const userName = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: { email: email.value, userName: userName.value, firstName: firstName.value, lastName: lastName.value }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: { email: email.value, secret: secret.value }
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "login") {
      if (email !== "") {
        try {
          const { data: { requestSecret } } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("You don't have an account yet. Create one!");
            setTimeout(() => setAction("signup"), 2000);
          } else {
            toast.success("Check your inbox for your login secret");
            setAction("confirm");
          }
        } catch {
          toast.error("Can't request secret. Try again")
        }
      } else {
        toast.error("Email is required!")
      }
    } else if (action === "signup") {
      if (email.value !== "" && userName.value !== "" && firstName.value !== "" && lastName.value !== "") {
        try {
          const { data: { createAccount } } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account")
          } else {
            toast.success("Account created! Log In Now!")
            setTimeout(() => setAction("login"), 2000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All fields are required!");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const { data: { confirmSecret: token } } = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } })
            window.location.reload();
          } else {
            throw Error()
          }
        } catch {
          toast.error("Can't confirm secret, check again");
        }
      }
    }
  }

  return <AuthPresenter
    setAction={setAction}
    action={action}
    userName={userName}
    firstName={firstName}
    lastName={lastName}
    email={email}
    secret={secret}
    onSubmit={onSubmit}
  />
};