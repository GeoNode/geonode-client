import React from 'react';
import Paper from 'material-ui/Paper'
import muiThemeable from 'material-ui/styles/muiThemeable';

export class MapUrl extends React.Component {
  render() {
    const background = this.props.muiTheme ? this.props.muiTheme.palette.primary1Color : '#fff';
    const textColor = this.props.muiTheme ? this.props.muiTheme.palette.alternateTextColor : '#000';
    const showHideClass = this.props.show ? '' : 'hide'
    const content=[(<a key="link" href={this.props.url} className='map-url'>{this.props.text}</a>)];
    const style = {
      background: background,
      color: textColor,
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
