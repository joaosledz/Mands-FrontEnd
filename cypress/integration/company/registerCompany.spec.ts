import companyUrls from '../../../src/services/urls/company';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Register a new company', () => {
    it('Should fill the Inputs', () => {
        cy.visit('/cadastrar-empresa');
        cy.get('[ data-cy="company-name"]').type('Facebook');
        cy.get('[data-cy=company-username]').type('Facebook');
        cy.get('[data-cy=company-email]').type('oi@Facebook.com');
        cy.get('[data-cy=company-phone]').type('71995187312');
        cy.get('[data-cy=company-cnpj]').type('94365130000171');
    });

    it('Should register a new company', () => {
        // console.log(authUrls.register);
        cy.server();
        cy.route('POST', `${baseUrl}/${companyUrls.create}`).as(
            'registerCompany'
        );

        cy.get('form').submit();

        cy.wait('@registerCompany').then(resp => {
            cy.log(JSON.stringify(resp, null, 2));
            expect(resp.status).be.greaterThan(199).below(300);
        });
    });
});
