import styled from 'styled-components';
import Avatar from './Avatar';
import Button from './Button';
import FatText from './FatText';
import PropTypes from 'prop-types';

const Card = styled.div`
  display: flex;
  align-items: center;
  ${props => props.FatText}{

  }
`;

const UserCard = ({ isSelf, isFollowing, url, userName }) => {
  return <Card>
    <Avatar size="md" url={url} />
    <FatText text={userName} />
    {!isSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} />}
  </Card>
}

UserCard.propTypes = {
  isSelf: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default UserCard;