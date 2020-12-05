import FollowButtonPresenter from './FollowButtonPresenter';
import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followingMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowingMutation] = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      unfollowingMutation();
    } else {
      setIsFollowing(true);
      followingMutation();
    }
  }

  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />
}

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
}

export default FollowButtonContainer;