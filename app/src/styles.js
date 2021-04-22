import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
  box : {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-40%, -50%)'
  },
  typ : {
    marginLeft: '7.0rem'
  },
  txt : {
    fontSize : 59
  },
  sunmoon : {
    position: 'absolute',
    right: '0px',
  }
}));


export default useStyles;