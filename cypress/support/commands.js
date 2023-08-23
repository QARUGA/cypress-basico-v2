// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Rodolfo')
    cy.get('#lastName').type('Almeida')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
})