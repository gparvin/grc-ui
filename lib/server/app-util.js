/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

var _app

/*
 * Getter/setter for the currently running Express app. This provides global access to the app
 * for things like rendering views outside the context of a request.
 */
exports.app = function(app) {
  if (app) {
    _app = app
  } else {
    return _app
  }
}