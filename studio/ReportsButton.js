import React, { Component } from 'react'
import Studio from 'jsreport-studio'

export default class ReportsButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  openReports () {
    Studio.openTab({ key: 'Reports', editorComponentKey: 'reports', title: 'Reports' })
  }

  render () {
    return <div onClick={() => this.openReports()}>
      <i className='fa fa-folder-open-o' /> Reports
    </div>
  }
}
