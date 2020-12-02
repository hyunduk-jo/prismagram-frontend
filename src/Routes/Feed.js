import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import React from 'react';
import styled from 'styled-components';
import Loader from '../Components/Loader';
import Post from '../Components/Post';
import Helmet from 'rl-react-helmet';

const FEED_QUERY = gql`
  {
    seeFeed{
      id
      location
      caption
      files{
        id
        url
      }
      user{
        id
        avatar
        userName
      }
      likeCount
      isLiked
      comments{
        id
        text
        user{
          id
          userName
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  flex-direction: column;
`;

// eslint-disable-next-line
export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {
        loading && <Loader />
      }
      {
        !loading && data && data.seeFeed && data.seeFeed.map(post =>
          <Post key={post.id} id={post.id} caption={post.caption} location={post.location} user={post.user} files={post.files} likeCount={post.likeCount} comments={post.comments} isLiked={post.isLiked} createdAt={post.createdAt} />
        )
      }
    </Wrapper>
  )
}