import projectUrls from '../../../src/services/urls/project';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const company = 'guiazedaaaocompany';
const department = 'jao-jao';
const project = 61;

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Edit a project', () => {
    it('Should visit the page', () => {
        cy.visit(
            `/admin/${company}/departamentos/${department}/projeto/${project}/edicao`
        );
    });

    it('Should find and fill the Inputs', () => {
        cy.get('[ data-cy="project-name"]').type('Mands');
        cy.get('[data-cy=project-budget]').type('6000');
        cy.get('[data-cy=project-initialDate]').type('2020-07-06');
        cy.get('[data-cy=project-finalDate]').type('2020-02-06');
        cy.get('[data-cy=project-description]').type('Sou o projeto Mands');
    });

    it('Should update a project', () => {
        // console.log(authUrls.register);
        cy.server();
        cy.route('PUT', `${baseUrl}/${projectUrls.update}`).as('updateProject');

        cy.get('form').submit();

        cy.wait('@updateProject').then(resp => {
            cy.log(JSON.stringify(resp, null, 2));
            expect(resp.status).be.greaterThan(199).below(300);
        });
    });
});
