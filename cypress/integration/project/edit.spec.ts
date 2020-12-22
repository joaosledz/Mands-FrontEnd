import projectUrls from '../../../src/services/urls/project';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'guiazedaaaocompany';
const companyId = 71;
const departmentName = 'desenvolvedores';
const departmentId = 201;
const projectId = 241;

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Edit a department', () => {
    it('Should visit the page', () => {
        cy.visit(
            `http://localhost:3000/admin/${companyName}/departamentos/${departmentName}/projeto/${projectId}/edicao`
        );
    });

    it('Should erase and fill the Inputs', () => {
        cy.get('[data-cy=project-name]').clear().type('Mands');
        cy.get('[data-cy=project-budget]').clear().type('12000');
        cy.get('[data-cy=project-initialDate]').clear().type('2020-08-07');
        cy.get('[data-cy=project-finalDate]').clear().type('2021-08-02');
        cy.get('[data-cy=project-description]')
            .clear()
            .type('Sou o projeto Mands');
    });

    it('Should edit a project', () => {
        cy.intercept('PUT', `${baseUrl}/${projectUrls.update}**`).as(
            'editProject'
        );

        cy.get('form').submit();

        cy.wait('@editProject').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
