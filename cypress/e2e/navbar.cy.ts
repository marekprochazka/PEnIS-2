describe("Navbar visible", () => {
  it("should show the navbar on large screens", () => {
    cy.viewport("macbook-15");
    cy.visit("/");
    cy.get(".v-navigation-drawer__content").should("be.visible");
  });
  it("should show then navbar on small screens", () => {
    cy.viewport("iphone-6");
    cy.visit("/");
    cy.get(".v-navigation-drawer__content").should("be.visible");
  });
});
