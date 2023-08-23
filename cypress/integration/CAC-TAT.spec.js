/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach (function() {
        cy.visit('./src/index.html')

    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Rodolfo')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Rodolfo')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('teste@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    
    it('Telefone continua vazio ao inserir caracteres não-numéricos', function () {
        cy.get('#phone').type('teste')
        .should ('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Rodolfo')
        cy.get('#lastName').type('Almeida')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')

    })
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1)
        .should('have.value', 'blog')

    })
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value=feedback]').check()
        .should('have.value', 'feedback')

    })
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each (function($radio) {
        cy.wrap($radio).check ()
        cy.wrap($radio).should ('be.checked')
    })
})
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]').check()
        .should('be.checked')
        .last ()
        .uncheck()
        .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
          expect ($input[0].files[0].name).to.equal('example.json')
        })
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click ()
        cy.contains('Política de privacidade').should('be.visible')
    })

})