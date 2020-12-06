import styled from 'styled-components';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/FollowButton';
import Loader from '../../Components/Loader';
import { Helmet } from 'rl-react-helmet';
import SquarePost from '../../Components/SquarePost';
import Button from '../../Components/Button';


const Wrapper = styled.div`
  min-height: 70vh;
  display:flex;
  justify-content: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid grey;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  display: flex;
  font-size: 26px;
`;

const Counts = styled.ul`
 display: flex;
 margin: 15px 0px; 
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 240px);
  grid-template-rows: 240px;
  grid-auto-rows: 240px;
`;

const ProfilePresenter = ({ logOut, data, loading }) => {
  if (loading) {
    return <Wrapper><Loader /></Wrapper>
  } else if (!loading && data && data.seeUser) {
    const { seeUser: { id, avatar, userName, fullName, isFollowing, isSelf, bio, followingCount, followersCount, postsCount, posts } } = data;
    return (
      <>
        <Helmet>
          <title>{userName} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{userName}</Username>
              {isSelf ? <Button onClick={logOut} text="Log Out" /> : <FollowButton id={id} isFollowing={isFollowing} />}
            </UsernameRow>
            <Counts>
              <Count><FatText text={String(postsCount)} /> posts</Count>
              <Count><FatText text={String(followersCount)} /> followers</Count>
              <Count><FatText text={String(followingCount)} /> followings</Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts && posts.map((post) => <SquarePost key={post.id} likeCount={post.likeCount} commentCount={post.commentCount} file={post.files[0]} />)}
        </Posts>
      </>
    )
  }
}

export default ProfilePresenter;