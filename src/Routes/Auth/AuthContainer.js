//hooks, state, query
import React, { useState } from 'react';
import AuthPresenter from "./AuthPresenter";
import useInput from '../../Hooks/useInput';
import { useMutation } from '@apollo/client';
import { LOG_IN } from './AuthQueries';

export default () => {
  const [action, setAction] = useState("login");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, { variables: { email: email.value } });

  const onLogin = (e) => {
    e.preventDefault();
    if (email !== "") {
      requestSecret();
    }
  }

  return <AuthPresenter
    setAction={setAction}
    action={action}
    username={username}
    firstname={firstname}
    lastname={lastname}
    email={email}
    onLogin={onLogin}
  />
};