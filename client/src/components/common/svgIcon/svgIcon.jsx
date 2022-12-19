import React from 'react';
import PropTypes from 'prop-types';

import spriteSvg from '../../../assets/sprite.svg';

const SvgIcon = ({ name, size, className }) => {
  return (
    <svg className={`shrink-0 fill-current ${className}`} width={size} height={size}>
      <use xlinkHref={`${spriteSvg}#${name}`} />
    </svg>
  );
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default SvgIcon;
