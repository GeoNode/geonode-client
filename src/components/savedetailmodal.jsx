import React from 'react';
import ReactDOM from 'react-dom';

class SaveDetailModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="save-item">
        <button className={this.props.className} onClick={this._saveMap}>Save</button>
      </div>
    );
  }
}
SaveDetailModal.propTypes = {
}

export default SaveDetailModal;
