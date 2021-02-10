import departmentUrls from '../../../src/services/urls/department';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'AzedaEmpresa';

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Create a new department', () => {
    it('Should visit the page', () => {
        cy.visit(
            `http://localhost:3000/admin/${companyName}/departamentos/cadastrar`
        );
    });
    it('Should fill inputs', () => {
        cy.get('[data-cy=department-name]').type('Vendas');
        cy.get('[data-cy=department-email]').type('vendas@it.com');
        cy.get('[data-cy=department-phone]').type('71999616841');
        cy.get('[data-cy=department-description]').type(
            'Sou o departamento de vendas'
        );
    });
    it('Should create a new department', () => {
        cy.intercept('POST', `${baseUrl}/${departmentUrls.create}**`).as(
            'createDepartment'
        );

        cy.get('[ data-cy="submit-button"]').click();

        cy.wait('@createDepartment').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
