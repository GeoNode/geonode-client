import {connect} from 'react-redux';
import MapUrl from '../components/mapUrl';
import {getMapId, getMapViewUrl} from '../state/map/selectors';

const mapStateToProps = (state) => {
  return {
    url: getMapViewUrl(state),
    show: getMapId(state) ? true : false
  };
};

const MapUrlLink = connect(
  mapStateToProps
)(MapUrl);

export default MapUrlLink;
