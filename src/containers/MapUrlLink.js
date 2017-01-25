import {connect} from 'react-redux';
import MapUrl from '../components/mapUrl';
import {getMapId, getMapViewUrl} from '../state/map/selectors';
import {getMapTitle} from '../state/mapConfig/selectors';

const mapStateToProps = (state) => {
  return {
    url: getMapViewUrl(state),
    show: getMapId(state) ? true : false,
    text: getMapTitle(state) || ''
  };
};

const MapUrlLink = connect(
  mapStateToProps
)(MapUrl);

export default MapUrlLink;
