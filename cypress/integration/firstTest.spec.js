/// <reference types = "cypress"/> 

describe('My First Test Suite', () => {
    
    it('first test',()=>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        //by Tag name 
        cy.get('input')

        //by id
        cy.get('#inputEmail1')

        //by className
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[placeholder]')

        //by attribute name and value
        cy.get('[placeholder="Email"]')

        //by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and attribute with value
        cy.get('input[placeholder="Email"]')

        //by 2 different attributes 
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, attribute name and value, ID and Class name 
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //Cypress recommends making custom locators in code base
        cy.get('[data-cy="imputEmail1"]')

    })

    it('Second test',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="SignInButton"]')

        cy.contains("Sign in")

        cy.contains('[status="warning"]','Sign in')

        //find element by traversal - many traversals within a dom to parent / child ***Find only works to find child element 
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        //use this to find sibling locators 
        cy.contains('nb-card','Horizontal form')
            .find('[type="email"]')

    })

    it('Then and Wrap methods',()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //label validation 
        // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

        /*selenuim style 
        const firstForm = cy.contains('nb-card','Basic form')
        firstForm.find('[for="inputEmail1"]').should('contain','Email')
        */

        //cypress style 

        cy.contains('nb-card','Using the Grid').then( firstForm => {

            //"Find" becomes a JQuery method as opposed to it previously being used as a cypress format
            const emailLabelForFirstForm = firstForm.find('[for="inputEmail1"]').text()     
            const passwordLabelForFirstForm = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelForFirstForm).to.equal('Email')
            expect(passwordLabelForFirstForm).to.equal('Password')
        })

    })
})