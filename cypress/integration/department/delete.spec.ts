import departmentUrls from '../../../src/services/urls/department';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'AzedaEmpresa';
const departmentName = 'telemarketing';
const securityWord = 'AzedaEmpresa/Vendas';

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Delete a department', () => {
    it('Should visit the page', () => {
        cy.visit(
            `http://localhost:3000/admin/${companyName}/departamentos/${departmentName}/edicao`
        );
    });
    it('Should open the delete modal', () => {
        cy.get('[data-cy=delete-modal-button]').click();
    });
    it('Should fill the Security Word input', () => {
        cy.get('[ data-cy="security-word-input"]').type(securityWord);
    });
    it('Should delete the department', () => {
        cy.intercept('DELETE', `${baseUrl}/${departmentUrls.base}**`).as(
            'deleteDepartment'
        );

        cy.get('[data-cy=department-delete-button]').click();

        cy.wait('@deleteDepartment').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
