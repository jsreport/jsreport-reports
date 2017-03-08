import React, { Component } from 'react'
import ReportEditor from './ReportEditor'

export default class DeleteButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  render () {
    if (!this.props.tab || (this.props.tab.key !== 'Reports') || !ReportEditor.Instance || !ReportEditor.Instance.ActiveReport) {
      return <div />
    }

    return <div className='toolbar-button' onClick={() => ReportEditor.Instance.remove()}>
      <i className='fa fa-trash' />Delete
    </div>
  }
}
