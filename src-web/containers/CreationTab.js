/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

// seems to be an issue with this rule and redux connect method in SecondaryHeader
/* eslint-disable import/no-named-as-default */

import React from 'react'
import PropTypes from 'prop-types'
import { RESOURCE_TYPES } from '../../lib/shared/constants'
import { createResources, updateSecondaryHeader } from '../actions/common'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Page from '../components/common/Page'
import CreationView from '../components/CreationView'
import msgs from '../../nls/platform.properties'
import config from '../../lib/shared/config'

class CreationTab extends React.Component {

  static propTypes = {
    handleCreateResources: PropTypes.func,
    mutateStatus: PropTypes.string,
    secondaryHeaderProps: PropTypes.object,
    updateSecondaryHeader: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.setGetPolicyJSON = this.setGetPolicyJSON.bind(this)
  }

  componentWillMount() {
    const { updateSecondaryHeader, secondaryHeaderProps } = this.props
    const { title, tabs, breadcrumbItems, information } = secondaryHeaderProps
    const links = [{
      id: 'policy-create',
      label: 'button.create',
      handleClick: this.handleClick.bind(this)
    }]
    updateSecondaryHeader(msgs.get(title, this.context.locale), tabs, breadcrumbItems, links, msgs.get(information, this.context.locale))
  }

  setGetPolicyJSON = getNewPolicyJSON => {
    this.getNewPolicyJSON = getNewPolicyJSON
  }

  handleClick = () => {
    const newPolicyJSON = this.getNewPolicyJSON()
    if (newPolicyJSON) {
      const {handleCreateResources} = this.props
      handleCreateResources(newPolicyJSON)
    }
  }

  render () {
    if (this.props.mutateStatus && this.props.mutateStatus === 'DONE') {
      return <Redirect to={`${config.contextPath}/policies/all`} />
    }
    return (
      <Page>
        <CreationView
          setGetPolicyJSON={this.setGetPolicyJSON}
        />
      </Page>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mutateStatus: state['HCMPolicyList'].mutateStatus,
    mutateErrorMsg: state['HCMPolicyList'].mutateErrorMsg,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSecondaryHeader: (title, tabs, breadcrumbItems, links, information) => dispatch(updateSecondaryHeader(title, tabs, breadcrumbItems, links, '', information)),
    handleCreateResources: (json) => dispatch(createResources(RESOURCE_TYPES.HCM_POLICIES, json))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreationTab))
