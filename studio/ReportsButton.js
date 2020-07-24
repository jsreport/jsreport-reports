import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Studio from 'jsreport-studio'

export default class ReportsButton extends Component {
  openReports () {
    Studio.openTab({ key: 'Reports', editorComponentKey: 'reports', title: 'Reports' })
  }

  render () {
    return <div onClick={() => this.openReports()}>
      <i className='fa fa-folder-open-o' /> Reports
    </div>
  }
}

ReportsButton.propTypes = {
  tab: PropTypes.object,
  onUpdate: PropTypes.func.isRequired
}
