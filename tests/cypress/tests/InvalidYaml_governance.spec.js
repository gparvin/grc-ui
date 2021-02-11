/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { getConfigObject } from '../config'
import { createPolicyFromYAML, getDefaultSubstitutionRules, checkNotificationMessage } from '../views/policy'
const invalidYamlErrorMessages = getConfigObject('InvalidYamlTests/invalidYamlErrors.yaml', 'yaml')


describe('RHACM4K-247 - GRC UI: [P1][Sev1][policy-grc] Create policy with invalid yaml', () => {
  it('Create policy should fail with invalid policy name in yaml', () => {
    const confFilePolicy = 'InvalidYamlTests/InvalidPolicyName.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', getDefaultSubstitutionRules())
    cy.visit('/multicloud/policies/create')
    createPolicyFromYAML(rawPolicyYAML, false)
    cy.get('#create-button-portal-id-btn').click()
    checkNotificationMessage('error', 'Create error:', 'invalidName', invalidYamlErrorMessages, true)
  })
  it('Create policy should fail with missing namespace in yaml', () => {
    const confFilePolicy = 'InvalidYamlTests/MissingNamespace.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', getDefaultSubstitutionRules())
    cy.visit('/multicloud/policies/create')
    createPolicyFromYAML(rawPolicyYAML, false)
    cy.get('#create-button-portal-id-btn').click()
    checkNotificationMessage('error', 'Create error:', 'missingNamespace', invalidYamlErrorMessages)
  })
  it('Create policy should fail with invalid indentation in yaml', () => {
    const confFilePolicy = 'InvalidYamlTests/InvalidIndentation.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', getDefaultSubstitutionRules())
    cy.visit('/multicloud/policies/create')
    createPolicyFromYAML(rawPolicyYAML, false)
    cy.get('#create-button-portal-id-btn').click()
    checkNotificationMessage('error', 'Create error:', 'badIndentation', invalidYamlErrorMessages)
  })
})