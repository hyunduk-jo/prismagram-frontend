import PostPresenter from './PostPresenter';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useInput from '../../Hooks/useInput';

const PostContainer = ({ id, user, files, comments, likeCount, isLiked, createdAt, caption, location }) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const comment = useInput("");
  return <PostPresenter id={id} caption={caption} location={location} user={user} files={files} comments={comments} likeCount={likeCountS} isLiked={isLikedS} createdAt={createdAt} newComment={comment} setIsLiked={setIsLiked} setLikeCount={setLikeCount} />
}

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired
    }).isRequired
  })).isRequired,
  likeCount: PropTypes.number,
  isLiked: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string
}

export default PostContainer;