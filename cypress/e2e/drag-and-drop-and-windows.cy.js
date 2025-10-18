describe('Drag and Drop and Windows', () => {
    it('Multiple Windows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.contains('Click Here')
            .invoke('removeAttr', 'target')
            .click()

        cy.get('h3').should('have.text', 'New Window')

        cy.go('back')
    });

    it.only('Drag and Drop', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')

        const dataTransfer = new DataTransfer()

        cy.get('#column-a').trigger('dragstart', { dataTransfer })
        cy.contains('B').trigger('drop', { dataTransfer })
    });
});