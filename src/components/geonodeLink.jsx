import {connect} from 'react-redux';
import GeoNodeViewer from './geonode';

function mapStateToProps(state) {
  const {server, mapConfig} = state;

  return {
    server,
    mapConfig
  };
}
const GeonodeComposer = connect(
  mapStateToProps
)(GeoNodeViewer);

export default GeonodeComposer;
