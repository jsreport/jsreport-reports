import React, { Component } from 'react'
import ReportEditor from './ReportEditor'
import Studio from 'jsreport-studio'

export default class DownloadButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  download () {
    if (ReportEditor.Instance && ReportEditor.Instance.ActiveReport) {
      window.open(`${Studio.rootUrl}/reports/${ReportEditor.ActiveReport._id}/attachment`, '_self')
    }
  }

  render () {
    if (!this.props.tab || (this.props.tab.key !== 'Reports') || !ReportEditor.Instance || !ReportEditor.Instance.ActiveReport) {
      return <div />
    }

    return <div className='toolbar-button' onClick={() => this.download()}>
      <i className='fa fa-download' />Download
    </div>
  }
}
