import React from 'react';

export default class MapUrl extends React.Component {
  render() {
    const showHideClass = this.props.show ? '' : 'hide'
    return (
      <div className={'map-url-wrapper ' + showHideClass}>
        <a href={this.props.url} className='map-url'>{this.props.url}</a>
      </div>
    )
  }
}
MapUrl.propTypes = {
  url: React.PropTypes.string.isRequired,
  show: React.PropTypes.bool
}
