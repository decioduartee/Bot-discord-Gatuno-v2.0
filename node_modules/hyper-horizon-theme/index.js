// Require OS Home environment
// Require hyper.js configuration from user home

// Check the enableVibrance setting and update background color

exports.decorateConfig = config => {
  const colors = {
    black: '#1C1E26',
    red: '#E95378',
    green: '#29D398',
    yellow: '#FAB795',
    blue: '#26BBD9',
    magenta: '#EE64AC',
    cyan: '#59E1E3',
    white: '#D5D8DA',
    lightBlack: '#2E303E',
    lightRed: '#EC6A88',
    lightGreen: '#3FDAA4',
    lightYellow: '#FBC3A7',
    lightBlue: '#3FC4DE',
    lightMagenta: '#F075B5',
    lightCyan: '#6BE4E6',
    lightWhite: '#ffffff',
    transparentRed: 'rgba(233, 83, 120, 0.2)',
    transparentWhite: 'rgba(255, 255, 255, .05)'
  };

  const css = `
    .hyper_main {
      // border: none !important;
    }

    .tabs_borderShim {
      border-color: transparent !important;
    }

    .tab_tab {
      background-color: transparent;
      border: 0;
      color: ${colors.white};
    }

    .tab_tab:hover {
      cursor: pointer;
    }

    .tab_tab::before {
      bottom: 0;
      content: '';
      height: 2px;
      left: 0;
      position: absolute;
      right: 0;
    }

    .tab_text {
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
    }

    .tab_textActive {
      border-bottom-color: ${colors.red};
      color: ${colors.lightWhite}
    }

    .tab_textInner {
      max-width: 100%;
      overflow: hidden;
      padding: 0px 24px 0 8px;
      text-overflow: ellipsis;
    }

    .splitpane_divider {
      background-color: ${colors.lightBlack} !important;
    }
  `;
  const termCSS = `
    .xterm-text-layer a {
      text-decoration: underline !important;
      color: ${colors.yellow} !important;
    }

    *::-webkit-scrollbar {
      background-color: transparent;
      height: 4px;
      width: 4px;
    }

    *::-webkit-scrollbar-track {
      background-color: transparent;
    }

    *::-webkit-scrollbar-thumb {
      background: ${colors.transparentWhite};
    }

    *::-webkit-scrollbar-thumb:window-inactive {
      background: transparent;
    }
  `;

  config.backgroundColor = colors.black;
  config.foregroundColor = colors.white;
  config.borderColor = colors.black;
  config.cursorAccentColor = colors.black;
  config.cursorColor = colors.red;
  config.selectionColor = colors.transparentRed;
  config.padding = '12px 24px';

  return Object.assign({}, config, {
    colors,
    termCSS,
    css
  });
};