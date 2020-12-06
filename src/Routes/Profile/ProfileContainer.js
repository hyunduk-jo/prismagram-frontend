import { useMutation, useQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import ProfilePresenter from './ProfilePresenter';
import { GET_USER, LOG_OUT } from './ProfileQueries';

const ProfileContainer = ({ match: { params: { username } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { userName: username } });
  const [logOut] = useMutation(LOG_OUT);
  return <ProfilePresenter data={data} loading={loading} logOut={logOut} />
}

export default withRouter(ProfileContainer);