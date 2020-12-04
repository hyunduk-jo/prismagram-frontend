import { useQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import SearchPresenter from './SearchPresenter';
import { SEARCH } from './SearchQueries';

const SearchContainer = ({ location: { search } }) => {
  const term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });
  return <SearchPresenter term={term} loading={loading} data={data} />
}

export default withRouter(SearchContainer);