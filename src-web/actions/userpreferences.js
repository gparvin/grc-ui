/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import * as Actions from './index'

export const userPreferencesReceiveSuccess = userPreferences => ({
  type: Actions.USERPREFERENCES_RECEIVE_SUCCESS,
  userPreferences
})

export const userPreferencesReceiveFailure = err => ({ type: Actions.USERPREFERENCES_RECEIVE_FAILURE, err })