import departmentUrls from '../../../src/services/urls/department';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'AzedaEmpresa';
const departmentName = 'financeiro';
const depPermId = 151;

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Associate an user', () => {
    it('Should visit the page', () => {
        cy.visit(
            `http://localhost:3000/admin/${companyName}/departamentos/${departmentName}/detalhes`
        );
    });
    it("Should wait fetch the page's data", () => {
        cy.intercept('GET', `${baseUrl}/${departmentUrls.base}**`).as(
            'showDepartment'
        );

        cy.wait('@showDepartment').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.eq(200);
        });
    });
    it('Should open the assign modal', () => {
        cy.wait(2000);
        cy.get('[data-cy=assign-button]').first().click();
    });
    it('Should select an user from the autocomplete', () => {
        cy.get('[ data-cy="users-autocomplete"]')
            .type('Gui')
            .type('{downArrow}')
            .type('{enter}');
    });
    it('Should select a role', () => {
        cy.get(`[ data-cy="role-checkbox-${depPermId}"]`).click();
    });
    it('Should associate an user to the department', () => {
        cy.intercept('POST', `${baseUrl}/${departmentUrls.associate}**`).as(
            'associateUser'
        );

        cy.get('[ data-cy="submit-button"]').click();

        cy.wait('@associateUser').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
