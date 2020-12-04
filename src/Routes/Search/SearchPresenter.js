import React from 'react';
import styled from 'styled-components';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';

const Container = styled.div`
  min-height: 70vh;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const Section = styled.div``;

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
              data.searchUser.map((user) => <UserCard key={user.id} userName={user.userName} isFollowing={user.isFollowing} url={user.avatar} isSelf={user.isSelf} />)
            )
        }
      </Section>
      <Section>
        {
          data.searchPost.length === 0 ? (
            <FatText text="No Post Found" />
          ) : (
              data.searchPost.map((post) => null)
            )
        }
      </Section>
    </Container>
  }
}

export default SearchPresenter;