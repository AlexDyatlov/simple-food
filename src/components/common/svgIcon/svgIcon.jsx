import React from 'react';

import spriteSvg from '../../../assets/sprite.svg';

const SvgIcon = ({ name, size, className }) => {
  return (
    <svg className={`shrink-0 fill-current ${className}`} width={size} height={size}>
      <use xlinkHref={`${spriteSvg}#${name}`} />
    </svg>
  );
};

export default SvgIcon;
