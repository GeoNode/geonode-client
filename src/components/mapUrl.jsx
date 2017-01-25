import React from 'react';
import Paper from 'material-ui/Paper'
import muiThemeable from 'material-ui/styles/muiThemeable';

export class MapUrl extends React.Component {
  render() {
    const showHideClass = this.props.show ? '' : 'hide';
    const content=[(<a key="link" href={this.props.url} className='map-url'>{this.props.text}</a>)];
    const style = {
      background: this.props.muiTheme.palette.primary1Color,
      color: this.props.muiTheme.palette.alternateTextColor,
      padding: '5px'
    }
    return (
      <Paper className={'map-url-wrapper ' + showHideClass} children={content} style={style}/>
    )
  }
}
MapUrl.propTypes = {
  url: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  show: React.PropTypes.bool
}
MapUrl.contextTypes = {
  muiTheme: React.PropTypes.object
};
export default muiThemeable()(MapUrl);
