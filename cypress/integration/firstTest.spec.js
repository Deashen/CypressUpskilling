/// <reference types = "cypress"/> 

const { equal } = require("assert")

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


        -----------------------------------------------------------------------------------------------------------
        The reason we cannot save using this traditional method is that cypress is ASYNCHRONOUS 
        Meaning that these results/information we expect will not render sequentially.
        Thus the info we seek may not be available when we set variables 

        Therefore we need to use cypress methods 
        */

        //cypress style 

        cy.contains('nb-card','Using the Grid').then( firstForm => {  //can use ES formatting here and have function names etc.
            //the .then methods parses the variable passed in i.e."firstForm" as a JQuery Object
            //"Find" becomes a JQuery method when used as below. "Find" in the cypress context does not behave the same as JQuery context
            const emailLabelForFirstForm = firstForm.find('[for="inputEmail1"]').text()     
            const passwordLabelForFirstForm = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelForFirstForm).to.equal('Email')
            expect(passwordLabelForFirstForm).to.equal('Password')


            //to compare between variables between first and second form, use nested cy.contains 
            cy.contains('nb-card','Basic form').then( secondForm => {
                const passwordLabelSecondForm = secondForm.find('[for="exampleInputPassword1"]').text()
                
                //expect is a chai assertion 
                expect(passwordLabelForFirstForm).to.equal(passwordLabelSecondForm) 
                
                //to convert this back to a cypress function, use cy.wrap()
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            })
        })

    })

    it('invoke command tests', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        //version 1 basic way
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

        //version 2 using then
        cy.get('[for="exampleInputEmail1"]').then( label =>{
            expect(label.text()).to.equal('Email address')
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>{
            expect(text).to.equal('Email address')
        })


        //version 3 - 1 - using invoke function
        cy.contains('nb-card','Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr','class')
            //option 1 - use should for assertion
            //.should('contain','checked') 
            // an alternate way to do the above step is to use chai assertions by using then method
            .then(classValue =>{
                expect(classValue).to.contain('checked')
            })

    })

    //cy.invoke is powerful for assertions - read up on invoke docs on cypress.io
    
    it.only('Invoke Assert on html property',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card','Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop','value').should('contain','17')
        })
    })
})