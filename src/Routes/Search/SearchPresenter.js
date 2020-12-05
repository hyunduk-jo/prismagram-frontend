import React from 'react';
import styled from 'styled-components';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';

const Container = styled.div`
  min-height: 70vh;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows:160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows:200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({ term, loading, data }) => {
  if (term === undefined) {
    return <Container>
      <FatText text={`No result for ""`} />
    </Container>
  } else if (loading) {
    return <Container>
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    </Container>
  } else if (data && data.searchUser && data.searchPost) {
    return <Container>
      <Section>
        {
          data.searchUser.length === 0 ? (
            <FatText text="No User Found" />
          ) : (
              data.searchUser.map((user) => <UserCard key={user.id} id={user.id} userName={user.userName} isFollowing={user.isFollowing} url={user.avatar} isSelf={user.isSelf} />)
            )
        }
      </Section>
      <PostSection>
        {
          data.searchPost.length === 0 ? (
            <FatText text="No Post Found" />
          ) : (
              data.searchPost.map((post) => <SquarePost key={post.id} likeCount={post.likeCount} commentCount={post.commentCount} file={post.files[0]} />)
            )
        }
      </PostSection>
    </Container>
  }
}

export default SearchPresenter;