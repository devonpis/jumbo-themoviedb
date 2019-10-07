import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import treeChanges from 'tree-changes';
import { showAlert } from 'actions';
import styled from 'styled-components';
import { utils, Button, Input } from 'styled-minimal';
import Icon from 'components/Icon';
import theme from 'modules/theme';
import { getMovies } from 'actions';
import { STATUS } from 'constants/index';
import Loader from 'components/Loader';
import Tile from './Tile/Tile';

const { responsive, spacer } = utils;

const MoviesWidgetWrapper = styled.div`
  display: block;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
  box-sizing:border-box;
  ${() =>
    responsive({
      xs: `
      max-width: 340px;
      `,
      ix: `
      max-width: 340px;
      padding: 0;
      `,
      md: `
      max-width: 525px;
      `,
      lg: `
      max-width: 710px;
      `,
      xl: `
      `,
    })};
`;

const MoviesGrid = styled.ul`
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  margin-left: -30px;
  :after {
    clear: both;
    display: block;
    width: 100%;
    content: ' ';
  }

  > li {
    float: left;
    list-style: none;
    position: relative;
    margin-left: 30px;
  }
`;

const LoadMoreWrapper = styled.div`
  position: relative;
  padding-bottom: 40px;
  padding-top: 5px;
  > button {
    margin: 0 auto;
    position: relative;
    display: block;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    &:focus {
      outline: none;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  top: -22px;
  input {
    height: 44px;
    border-radius: 22px;
    padding: 0 40px 0 15px;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 2px ${theme.palette.primary};
    }
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  }
  button {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    position:absolute;
    right:0;
    top:0;
    &:focus {
      outline: none;
    }
    svg * {
      fill: ${theme.palette.primary};
    }
  }
`;

const OutputWrapper = styled.div`
  margin-top: 30px;
`;

export class MoviesWidget extends React.Component {
  constructor(props) {
    super(props);
    const { moviesWidget } = this.props;
    const { query } = moviesWidget;
    this.state = {
      query,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    moviesWidget: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch, moviesWidget } = this.props;
    const { movies, page } = moviesWidget;
    if (!movies.length) {
      dispatch(getMovies(query, page));
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, moviesWidget } = this.props;
    const { changedTo } = treeChanges(prevProps, this.props);

    if (changedTo('moviesWidget.status', STATUS.ERROR)) {
      dispatch(showAlert(moviesWidget.message, { variant: 'danger' }));
    }
  }

  handleBtnClick = () => {
    const { query } = this.state;
    const { dispatch, moviesWidget } = this.props;
    let { page } = moviesWidget;
    page += 1;
    dispatch(getMovies(query, page));
  };

  handleInputChange = name => e => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch(getMovies(query, 1));
  };

  render() {
    const { query } = this.state;
    const { moviesWidget } = this.props;
    const { movies, total_pages, page, status } = moviesWidget;
    let output;
    let loadingIcon;
    let loadMoreBtn;
    let loadMoreBtnLabel;

    if (movies.length) {
      output = (
        <OutputWrapper>
          <h3>Popular Movies</h3>
          <MoviesGrid data-type={query} data-testid="MoviesWidgetGrid">
            {movies.map(d => (
              <li key={d.id}>
                <NavLink to={`/movie/${d.id}`}>
                  <Tile movie={d} />
                </NavLink>
              </li>
            ))}
          </MoviesGrid>
        </OutputWrapper>
      );

      if (total_pages > page) {
        if (status === STATUS.RUNNING) {
          loadMoreBtnLabel = 'Loading...';
        } else {
          loadMoreBtnLabel = 'Load more';
        }
        loadMoreBtn = (
          // <button type="button" onClick={this.handleBtnClick} disabled={status === STATUS.RUNNING}>
          //   {loadMoreBtnLabel}
          // </button>
          <LoadMoreWrapper>
            <Button size="md" onClick={this.handleBtnClick} disabled={status === STATUS.RUNNING}>
              {loadMoreBtnLabel}
            </Button>
          </LoadMoreWrapper>
        );
      }
    } else if (status === STATUS.SUCCESS) {
      output = (
        <OutputWrapper>
          <h3>No Movies Found</h3>
        </OutputWrapper>
      );
    }
    if (!movies.length && status === STATUS.RUNNING) {
      loadingIcon = (
        <OutputWrapper>
          <Loader block size={50} />
        </OutputWrapper>
      );
    }

    return (
      <MoviesWidgetWrapper key="MoviesWidget" data-testid="MoviesWidgetWrapper">
        <form onSubmit={this.handleFormSubmit}>
          <InputWrapper>
            <Input
              type="text"
              value={query}
              onChange={this.handleInputChange('query')}
              placeholder="Search"
              disabled={status === STATUS.RUNNING}
            />
            <button type="submit" disabled={status === STATUS.RUNNING}>
              <Icon name="magnify" width={30} />
            </button>
          </InputWrapper>
        </form>
        {loadingIcon}
        {output}
        {loadMoreBtn}
      </MoviesWidgetWrapper>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { moviesWidget: state.moviesWidget };
}

export default connect(mapStateToProps)(MoviesWidget);
