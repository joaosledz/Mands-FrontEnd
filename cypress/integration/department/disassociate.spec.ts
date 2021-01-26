import departmentUrls from '../../../src/services/urls/department';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'AzedaEmpresa';
const departmentName = 'financeiro';

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Disassociate an user', () => {
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
    it('Should open the disassociate dialog', () => {
        cy.get('[data-cy=user-card-button]').first().trigger('mouseover');
        cy.get('[data-cy=disassociate-button]').first().click();
    });
    it('Should dissociate an user from the department', () => {
        cy.intercept('DELETE', `${baseUrl}/${departmentUrls.dissociate}**`).as(
            'dissociateUser'
        );

        cy.get('[ data-cy="confirm-disassociation-button"]').click();

        cy.wait('@dissociateUser').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
