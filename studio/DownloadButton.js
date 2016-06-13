import React, { Component } from 'react'
import ReportEditor from './ReportEditor'
import { relativizeUrl } from 'jsreport-studio'

export default class DownloadButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  download () {
    if (ReportEditor.Instance && ReportEditor.Instance.ActiveReport) {
      window.open(relativizeUrl(`/reports/${ReportEditor.Instance.ActiveReport._id}/content`), '_blank')
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

