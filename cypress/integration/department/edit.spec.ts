import departmentUrls from '../../../src/services/urls/department';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'AzedaEmpresa';
const departmentName = 'vendas';

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
        cy.get('[ data-cy="department-name"]').clear().type('Telemarketing');
        cy.get('[data-cy=department-objective]')
            .clear()
            .type('Sou o departamento de Telemarketing');
        cy.get('[data-cy=department-email]')
            .clear()
            .type('oi@Telemarketing.com');
        cy.get('[data-cy=department-phone]').clear().type('71995187312');
    });
    it('Should edit a department', () => {
        cy.intercept('PUT', `${baseUrl}/${departmentUrls.base}**`).as(
            'registerDepartment'
        );

        cy.get('form').submit();

        cy.wait('@registerDepartment').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
