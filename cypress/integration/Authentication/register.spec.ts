import authUrls from '../../../src/services/urls/authentication';

const baseUrl = Cypress.env('CYPRESS_API');

describe('Register a new user', () => {
    it('Should visit the page', () => {
        cy.visit('/cadastro');
    });

    it('Should fill the Inputs', () => {
        cy.get('[ data-cy="user-firstName"]').type('Guilherme');
        cy.get('[data-cy=user-lastName]').type('Azevedo');
        cy.get('[data-cy=user-userName]').type('GuilhermeAzeved');
        cy.get('[data-cy=user-email]').type('guilherme.azevedo@gmail.com');
        cy.get('[data-cy=user-cpf]').type('17211129018');
        cy.get('[data-cy=user-phone]').type('71995187312');
        cy.get('[data-cy=user-password]').type('123456');
    });

    it('Should register a new user', () => {
        cy.server();
        cy.route('POST', `${baseUrl}/${authUrls.register}`).as('registerUser');

        cy.get('form').submit();

        cy.wait('@registerUser').then(resp => {
            cy.log(JSON.stringify(resp, null, 2));
            expect(resp.status).be.greaterThan(199).below(300);
        });
    });
});
