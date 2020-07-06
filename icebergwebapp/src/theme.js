import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/blue';
import { lightBlue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[200],
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
