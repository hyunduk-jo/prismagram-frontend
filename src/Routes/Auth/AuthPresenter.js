//style
import React from 'react';
import styled from 'styled-components';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Helmet from 'rl-react-helmet';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox};
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color:${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form{
    width: 100%;
    input{
      width: 100%;
      &:not(:last-child){
        margin-bottom: 7px;
      }
    }
    button{
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  userName,
  firstName,
  lastName,
  email,
  setAction,
  onSubmit,
  secret
}) => {
  return (
    <Wrapper>
      <Form>
        {action === "login" && (
          <>
          <Helmet>
            <title>Log In | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} value={email.value} onChange={email.onChange} type="email" />
            <Button text={"Log In"} />
          </form>
          </>
        )}
        {action === "signup" && (
          <>
          <Helmet>
            <title>Sign Up | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} value={email.value} onChange={email.onChange} type="email" />
            <Input placeholder={"UserName"} value={userName.value} onChange={userName.onChange} />
            <Input placeholder={"First Name"} value={firstName.value} onChange={firstName.onChange} />
            <Input placeholder={"Last Name"} value={lastName.value} onChange={lastName.onChange} />
            <Button text={"Sign Up"} />
          </form>
          </>
        )}
        {action === "confirm" && (
          <>
          <Helmet>
            <title>Confirm Secret | Prismagram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Paste your secret"} required value={secret.value} onChange={secret.onChange} />
            <Button text={"Confirm"} />
          </form>
          </>
        )}
      </Form>
      {action !== "confirm" && (
      <StateChanger>{action === "login" ?
        <>Don't have an account? <Link onClick={() => { setAction("signUp") }}>Sign up</Link></> :
        <>Have an account? <Link onClick={() => { setAction("login") }}>Log in</Link></>}
      </StateChanger>
      )}
    </Wrapper>
  )
};