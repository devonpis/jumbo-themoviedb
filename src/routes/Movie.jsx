import React from 'react';
import styled from 'styled-components';
import MovieWidget from 'components/Widgets/MovieWidget/MovieWidget';

const MovieContainer = styled.div`
  min-height: 100vh;
`;

const Movie = () => (
  <MovieContainer key="Movie" data-testid="MovieContainer">
    <MovieWidget />
  </MovieContainer>
);

export default Movie;
