import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import logoImg from 'assets/media/brand/logo.png';
import headerBg from 'assets/media/images/header-bg.png';

import MoviesWidget from 'components/Widgets/MoviesWidget/MoviesWidget';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  position: relative;
  height: 192px;
  box-sizing: border-box;
  padding-top: 60px;
  background: radial-gradient(
    82.98% 213.08% at 50% 0%,
    rgba(5, 112, 172, 0.3) 0%,
    rgba(8, 27, 35, 0) 50%
  );
  img {
    display: block;
    margin: 0 auto;
    height: 59px;
  }
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${headerBg});
    background-position: center;
  }
`;

export class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleClickLogin = () => {
    const { dispatch } = this.props;

    dispatch(login());
  };

  render() {
    return (
      <HomeContainer>
        <Header>
          <img src={logoImg} alt="The Movie DB" />
        </Header>
        <MoviesWidget />
      </HomeContainer>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
