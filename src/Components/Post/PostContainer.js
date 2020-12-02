import PostPresenter from './PostPresenter';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useInput from '../../Hooks/useInput';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT, TOGGLE_LIKE } from './PostQueries';
import { ME } from '../../sharedQueries';
import { toast } from 'react-toastify';

const PostContainer = ({ id, user, files, comments, likeCount, isLiked, createdAt, caption, location }) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const { data: meQuery } = useQuery(ME);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  })

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  }

  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  }

  const onKeyPress = async (e) => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      comment.setValue("");
      try {
        const { data: { addComment } } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
      } catch {
        toast.error("Can't send comment");
      }
    }
  }

  return <PostPresenter id={id} selfComments={selfComments} onKeyPress={onKeyPress} toggleLike={toggleLike} currentItem={currentItem} caption={caption} location={location} user={user} files={files} comments={comments} likeCount={likeCountS} isLiked={isLikedS} createdAt={createdAt} newComment={comment} setIsLiked={setIsLiked} setLikeCount={setLikeCount} />
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