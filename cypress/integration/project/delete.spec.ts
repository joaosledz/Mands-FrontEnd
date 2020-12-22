import projectUrls from '../../../src/services/urls/project';

const baseUrl = Cypress.env('CYPRESS_API');
const token = Cypress.env('CYPRESS_TOKEN');

const companyName = 'guiazedaaaocompany';
const companyId = 71;
const departmentName = 'desenvolvedores';
const departmentId = 201;
const projectId = 231;
const securityWord = 'Desenvolvedores/Seu Zezinho';

before(() => {
    window.localStorage.setItem('@Mands:token', token);
});

describe('Delete a project', () => {
    it('Should visit the page', () => {
        cy.visit(
            `http://localhost:3000/admin/${companyName}/departamentos/${departmentName}/projeto/${projectId}/edicao`
        );
    });
    it('Should open the delete modal', () => {
        cy.get('[data-cy=delete-modal-button]').click();
    });
    it('Should fill the Security Word input', () => {
        cy.get('[ data-cy="security-word-input"]').type(securityWord);
    });
    it('Should delete the project', () => {
        cy.intercept(
            'DELETE',
            `${baseUrl}/${projectUrls.remove}` +
                `${companyId}/${departmentId}/${projectId}`
        ).as('deleteProject');

        cy.get('[data-cy=project-delete-button]').click();

        cy.wait('@deleteProject').then(({ request, response }) => {
            cy.log(JSON.stringify(response, null, 2));
            expect(response.statusCode).be.greaterThan(199).below(300);
        });
    });
});
