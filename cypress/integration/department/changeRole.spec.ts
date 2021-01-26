import departmentUrls from '../../../src/services/urls/department';
import depPermUrls from '../../../src/services/urls/departmentPermission';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'AzedaEmpresa';
const departmentName = 'recursos-humanos';

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
    it('Should open the permission modal', () => {
        cy.get('[data-cy=user-card-button]').first().click();
    });
    it('Should select another role', () => {
        cy.get(`[ data-cy="role-checkbox-label"]`).first().click();
    });
    it("Should update an user's role from the department", () => {
        cy.intercept(
            'PUT',
            `${baseUrl}/${depPermUrls.changeUserPermission}**`
        ).as('updateUserRole');

        cy.get('[ data-cy="submit-button"]').click();

        cy.wait('@updateUserRole').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
