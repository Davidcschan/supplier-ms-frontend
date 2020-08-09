import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lime from '@material-ui/core/colors/lime';
import brown from '@material-ui/core/colors/brown';
// import { getColorForPercentage as heatColor } from '../../../helpers/heatColor';
import { FLOW } from './constants';

const allColors = [
  red[400],
  pink[300],
  purple[300],
  indigo[300],
  blue[500],
  cyan[700],
  teal[400],
  green[600],
  lime[900],
  brown[300],
];

export default FLOW.reduce((results, flowItem, i) => {
  results[flowItem] = allColors[i];
  return results;
}, {});