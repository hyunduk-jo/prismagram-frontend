import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import FatText from "../Components/FatText";

const ME = gql`
{
  me{
    id
    userName
    avatar
    fullName
    isSelf
  }
}
`;

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 80%;
  border-bottom: 1px solid ${props => props.theme.lightGreyColor};
`;

const AvatarContainer = styled.div`
  margin-right: 60px;
  margin-bottom: 40px;
`;

const TextContainer = styled.div``;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
`;

const Profile = () => {
  const { data } = useQuery(ME);
  const { username } = useParams();
  if (data) { console.log(data); }
  return (
    <Container>
      <ProfileContainer>
        <AvatarContainer>{data && data.me && <Avatar size={"lg"} url={data.me.avatar} />}</AvatarContainer>
        <TextContainer><Username>{username}</Username></TextContainer>
      </ProfileContainer>
      {
        data && data.me && (
          username === data.me.userName && "It's me"
        )
      }
    </Container>
  );

}

export default Profile;