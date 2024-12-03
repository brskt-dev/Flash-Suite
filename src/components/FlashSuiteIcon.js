import React from 'react';

const FlashSuiteIcon = ({ width = '70px', height = '70px', style, currentTheme }) => {
  // Determina a cor de preenchimento com base no tema
  const fillColor = currentTheme === 'light' ? '#111111' : '#f4f4f9';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 291.061 291.061"
      width={width}
      height={height}
      style={style}
    >
      <g>
        <path
          d="M286.061 131.482h-14.166V72.961c0-38.008-30.924-68.931-68.936-68.931-38.008 0-68.93 30.922-68.93 68.931V218.1c0 25.326-20.603 45.931-45.928 45.931-25.329 0-45.936-20.605-45.936-45.931v-60.112h14.166a5 5 0 0 0 5-5V82.603a5 5 0 0 0-5-5h-4.686V51.306a5 5 0 0 0-5-5H14.686a5 5 0 0 0-5 5v26.298H5a5 5 0 0 0-5 5v70.384a5 5 0 0 0 5 5h14.166V218.1c0 38.009 30.924 68.931 68.936 68.931 38.007 0 68.928-30.922 68.928-68.931V72.961c0-25.326 20.604-45.931 45.93-45.931 25.329 0 45.936 20.604 45.936 45.931v58.521H234.73a5 5 0 0 0-5 5v70.385a5 5 0 0 0 5 5h4.686v26.297a5 5 0 0 0 5 5h31.961a5 5 0 0 0 5-5v-26.297h4.686a5 5 0 0 0 5-5v-70.385a5.004 5.004 0 0 0-5.002-5zM19.686 56.306h21.961v21.298H19.686V56.306zm251.689 176.858h-21.961v-21.297h21.961v21.297z"
          fill={fillColor}
          opacity="1"
        />
      </g>
    </svg>
  );
};

export default FlashSuiteIcon;
