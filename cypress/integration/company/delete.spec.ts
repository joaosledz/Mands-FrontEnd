import companyUrls from '../../../src/services/urls/company';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'sdfdfhfhgwer';
const companyId = 91;
const securityWord = 'sdfdfhfhgwer';

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Delete a company', () => {
    it('Should visit the page', () => {
        cy.visit(`http://localhost:3000/admin/${companyName}/edicao`);
    });
    it('Should open the delete modal', () => {
        cy.get('[data-cy=delete-modal-button]').click();
    });
    it('Should fill the Security Word input', () => {
        cy.get('[ data-cy="security-word-input"]').type(securityWord);
    });
    it('Should delete the company', () => {
        cy.intercept(
            'DELETE',
            `${baseUrl}/${companyUrls.base}/` + companyId
        ).as('deleteCompany');

        cy.get('[data-cy=company-delete-button]').click();

        cy.wait('@deleteCompany').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
