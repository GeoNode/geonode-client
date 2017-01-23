import React from 'react';

export default class MapUrl extends React.Component {
  render() {
    return (
      <div className="map-url-wrapper">
        <a href={this.props.url} className="map-url"></a>
      </div>
    )
  }
}
MapUrl.propTypes = {
  url: React.PropTypes.string.isRequired
}
