import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { utils } from 'styled-minimal';

const IconWrapper = styled(SVG)`
  display: inline-block;
  line-height: 0;

  svg {
    height: auto;
    max-height: 100%;
    width: ${({ width }) => utils.px(width)};
  }
`;

const Icon = ({ name, ...rest }) => (
  <IconWrapper src={`${process.env.PUBLIC_URL}/media/icons/${name}.svg`} {...rest} />
);

Icon.propTypes = {
  name: PropTypes.oneOf([
    'arrow-left',
    'bell-o',
    'bell',
    'bolt',
    'check-circle-o',
    'check-circle',
    'check',
    'dot-circle-o',
    'exclamation-circle',
    'magnify',
    'question-circle-o',
    'question-circle',
    'sign-in',
    'sign-out',
    'times-circle-o',
    'times-circle',
    'times',
  ]).isRequired,
  width: PropTypes.number,
};

Icon.defaultProps = {
  width: 20,
};

export default Icon;
