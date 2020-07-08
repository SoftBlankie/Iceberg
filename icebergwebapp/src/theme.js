import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/blue';
import { lightBlue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: lightBlue[300],
    },
    secondary: {
      main: red[300],
    },
  },
  status: {
    danger: orange,
  },
});

export default theme;
