import styled from 'styled-components';
import Avatar from './Avatar';
import FatText from './FatText';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

const Card = styled.div`
  ${props => props.theme.whiteBox};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

const UserCard = ({ isSelf, isFollowing, url, userName, id }) => {
  return <Card>
    <EAvatar size="md" url={url} />
    <ELink to={`/${userName}`}><FatText text={userName} /></ELink>
    {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
  </Card>
}

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default UserCard;