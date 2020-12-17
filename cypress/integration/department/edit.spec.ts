import departmentUrls from '../../../src/services/urls/department';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'guiazedaaaocompany';
const companyId = 71;
const departmentName = 'Telemarketing';
const departmentId = 61;

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Edit a department', () => {
    it('Should visit the page', () => {
        cy.visit(
            `http://localhost:3000/admin/${companyName}/departamentos/${departmentName}/edicao`
        );
    });
    it('Should fill the Inputs', () => {
        // cy.get('[ data-cy="department-name"]').clear().type('Telemarketing');
        cy.get('[data-cy=department-objective]')
            .clear()
            .type('Sou o departamento de Telemarketing');
        cy.get('[data-cy=department-email]')
            .clear()
            .type('oi@Telemarketing.com');
        cy.get('[data-cy=department-phone]').clear().type('71995187312');
    });
    it('Should edit a department', () => {
        // console.log(authUrls.register);
        cy.server();
        cy.route(
            'PUT',
            `${baseUrl}/${departmentUrls.base}` + `${departmentId}/${companyId}`
        ).as('registerDepartment');

        cy.get('form').submit();

        cy.wait('@registerDepartment').then(resp => {
            cy.log(JSON.stringify(resp, null, 2));
            expect(resp.status).be.greaterThan(199).below(300);
        });
    });
});
