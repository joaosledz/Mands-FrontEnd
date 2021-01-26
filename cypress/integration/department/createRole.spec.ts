import departmentUrls from '../../../src/services/urls/department';
import depPermUrls from '../../../src/services/urls/departmentPermission';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'AzedaEmpresa';
const departmentName = 'diretoria';

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Create a department role by AssignTeamModal', () => {
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
        cy.wait(1000);
        cy.get('[data-cy=assign-button]').first().click();
    });
    it('Should select an user from the autocomplete', () => {
        cy.get('[ data-cy="users-autocomplete"]')
            .type('Gui')
            .type('{downArrow}')
            .type('{enter}');
    });
    it('Should open the add role modal', () => {
        cy.get('[ data-cy="add-role-button"]').click();
    });
    it('Should fill the inputs', () => {
        cy.get('[ data-cy="role-name-textfield"]').type('Teste');
        cy.get('[ data-cy="role-checkbox-label"]').first().click();
        cy.get('[ data-cy="role-checkbox-label"]').first().next().click();
    });
    it('Should create a department role', () => {
        cy.intercept('POST', `${baseUrl}/${depPermUrls.create}**`).as(
            'createRole'
        );

        cy.get('[ data-cy="submit-permission-button"]').click();

        cy.wait('@createRole').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
