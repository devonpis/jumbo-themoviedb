import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'modules/theme';
import Moment from 'react-moment';

export const TileWrapper = styled.div`
  position: relative;
  display: block;
  width: 155px;
  height: 310px;
`;

export const TitleWrapper = styled.div`
  display: block;
  color: ${theme.palette.fontColor};
  font-size: 14px;
  line-height: 16px;
  padding-top: 15px;
  span {
    width: 100%;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const DateWrapper = styled.span`
  font-size: 12px;
  line-height: 14px;
  color: ${theme.palette.lightBlue};
  margin-top: 5px;
`;

export const PopWrapper = styled.span`
  height: 20px;
  width: 40px;
  position: absolute;
  display: block;
  top: 5px;
  left: 5px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  font-weight: bold;
  color: ${theme.palette.fontColor};
  background: ${theme.palette.primary};
  &.primary {
    background: ${theme.palette.primary};
  }
  &.purple {
    background: ${theme.palette.purple};
  }
  &.pink {
    background: ${theme.palette.pink};
  }
`;

export const ImgWrapper = styled.div`
  display: block;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  width: 155px;
  height: 233px;
  img {
    display: block;
    width: 155px;
    height: 233px;
    border: none;
    margin: 0;
    border-radius:8px;
    overflow:hidden;
  }
`;

const Tile = ({ movie }) => {
  const img = movie.poster_path ? (
    <img
      src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + movie.poster_path}
      alt={movie.title}
    />
  ) : (
    ''
  );
  let popClass = 'primary';
  if (movie.vote_average < 7.5) {
    popClass = 'purple';
  } else if (movie.vote_average < 4) {
    popClass = 'pink';
  }

  return (
    <TileWrapper>
      <ImgWrapper>{img}</ImgWrapper>
      <TitleWrapper>
        <span title={movie.title}>{movie.title}</span>
        <DateWrapper>
          <Moment format="MMMM YYYY">{movie.release_date}</Moment>
        </DateWrapper>
      </TitleWrapper>
      <PopWrapper className={popClass}>{Math.round(movie.vote_average * 10)}%</PopWrapper>
    </TileWrapper>
  )
};

Tile.propTypes = {
  movie: PropTypes.object,
};

export default Tile;
