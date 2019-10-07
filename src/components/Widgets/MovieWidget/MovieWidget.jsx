import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovie, showAlert } from 'actions';
import { STATUS } from 'constants/index';
import treeChanges from 'tree-changes';
import styled from 'styled-components';
import { utils, Button } from 'styled-minimal';
import theme from 'modules/theme';
import Icon from 'components/Icon';
import Moment from 'react-moment';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;

const MovieWidgetWrapper = styled.div`
  width: 100%;
  position: relative;
  min-height: 100vh;
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.05);
  width: 100%;
  position: relative;
  min-height: 245px;
  height: 25vh;
  .box-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-position: center;
    background-size: cover;
    z-index: 1;
    opacity: 0.6;
  }
`;

const OutputWrapper = styled.div`
  display: block;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  hr {
    border: none;
    border-bottom: 1px solid #0f303d;
  }
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
const HeaderWrapper = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 100%;
  padding: 40px 20px 0 20px;
  box-sizing: border-box;
  z-index: 10;
  svg * {
    fill: white;
  }
  ${() =>
    responsive({
      xs: `
      max-width: 340px;
      `,
      ix: `
      max-width: 340px;
      padding: 40px 0 0 0;
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
const TitleWrapper = styled.div`
  position: relative;
  display: block;
  padding: 30px 0 30px 185px;
  z-index: 10;
  min-height: 185px;
  h2 {
    margin-top: 0;
  }
`;
const Poster = styled.div`
  position: absolute;
  display: block;
  border-radius: 8px;
  background: #15272e;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5), 0px 8px 16px rgba(0, 0, 0, 0.5),
    0px 16px 32px rgba(0, 0, 0, 0.5);
  width: 155px;
  height: 233px;
  top: -70px;
  left: 0;
  img {
    display: block;
    width: 155px;
    height: 233px;
    border: none;
    margin: 0;
    border-radius: 8px;
    overflow: hidden;
  }
`;
const InfoWrapper = styled.div`
  position: relative;
  display: block;
  font-size: 12px;
  line-height: 21px;
  font-family: Montserrat, sans-serif;
  color: ${theme.palette.lightBlue};
`;
const ContentWrapper = styled.div`
  position: relative;
  display: block;
  margin-bottom: 80px;
  line-height: 24px;
  font-size: 16px;
  div {
    color: #9fbbc7;
  }
`;

export class MovieWidget extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    movieWidget: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const movieId = parseInt(this.props.match.params.movieId, 10);
    const { dispatch, movieWidget } = this.props;
    const { movieDetails } = movieWidget;
    if (!movieDetails[movieId]) {
      dispatch(getMovie(movieId));
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, movieWidget } = this.props;
    const { changedTo } = treeChanges(prevProps, this.props);

    if (changedTo('movieWidget.status', STATUS.ERROR)) {
      dispatch(showAlert(movieWidget.message, { variant: 'danger' }));
    }
  }

  handleBtnClick = () => {
    this.props.history.goBack();
  };

  render() {
    const movieId = parseInt(this.props.match.params.movieId, 10);
    const { movieWidget } = this.props;
    const { movieDetails, status } = movieWidget;
    const thisMovieDetails = movieDetails[movieId];
    let output;
    let loadingIcon;
    let bgStyle;

    const img =
      thisMovieDetails && thisMovieDetails.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${thisMovieDetails.poster_path}`}
          alt={thisMovieDetails.title}
        />
      ) : (
        ''
      );

    if (status !== STATUS.RUNNING && thisMovieDetails) {
      let runtimeH;
      let runtimeM;
      if (thisMovieDetails.runtime && Math.floor(thisMovieDetails.runtime / 60) > 0) {
        runtimeH = `${Math.floor(thisMovieDetails.runtime / 60)}h `;
      }
      if (thisMovieDetails.runtime && thisMovieDetails.runtime % 60 !== 0) {
        runtimeM = `${thisMovieDetails.runtime % 60}min `;
      }
      output = (
        <OutputWrapper>
          <TitleWrapper>
            <Poster>{img}</Poster>
            <h2>{thisMovieDetails.title}</h2>
            <InfoWrapper>
              <div>
                <Moment format="YYYY">{thisMovieDetails.release_date}</Moment>
                {' · '}
                {Math.round(thisMovieDetails.vote_average * 10)}% User Score
              </div>
              <div>
                 {runtimeH} {runtimeM}
              </div>
            </InfoWrapper>
          </TitleWrapper>
          <hr />
          <ContentWrapper>
            <h3>Overview</h3>
            <div>{thisMovieDetails.overview}</div>
          </ContentWrapper>
        </OutputWrapper>
      );
    } else if (status !== STATUS.RUNNING && !thisMovieDetails) {
      output = (
        <OutputWrapper>
          <h3>No Movies Found</h3>
        </OutputWrapper>
      );
    }
    if (status === STATUS.RUNNING) {
      loadingIcon = (
        <OutputWrapper>
          <Loader block size={50} />
        </OutputWrapper>
      );
    }
    if (thisMovieDetails && thisMovieDetails.backdrop_path) {
      bgStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_face/${thisMovieDetails.backdrop_path})`,
      };
    }

    return (
      <MovieWidgetWrapper key="MovieWidget" data-testid="MovieWidgetWrapper">
        <Header>
          <div className="box-bg" style={bgStyle} />
          <HeaderWrapper>
            <button onClick={this.handleBtnClick} type="button">
              <Icon name="arrow-left" height={30} width={30} />
            </button>
          </HeaderWrapper>
        </Header>
        {loadingIcon}
        {output}
      </MovieWidgetWrapper>
    );
  }
}

function mapStateToProps(state) {
  return { movieWidget: state.movieWidget };
}

export default withRouter(connect(mapStateToProps)(MovieWidget));
