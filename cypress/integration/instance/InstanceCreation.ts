import { onlyOn } from "@cypress/skip-test";
import {
  progressStepsStatuses,
  SEInstanceStatus,
} from "cypress/utils/SEPopoverStatus";
import {
  createInstance,
  deleteInstance,
  safeLogin,
  uniqueName,
  isEnvironmentType,
  EnvType,
  pageWasLoaded,
} from "../../utils/Util";

const newInstanceName: string = uniqueName("new-instance");

describe("the 'Create a SE instance' Modal", () => {
  beforeEach(() => {
    cy.visit("/");
    safeLogin();
    pageWasLoaded();
  });

  it("Submit", () => {
    //forgot the current test
    //I have set the selector by the different way to be sure that the problem is not in our ouiaId command
    //I am working with Instance three to be sure that there is no update and I have enough time to click on it
    cy.get(
      "[data-ouia-component-id='Instances list table'][data-ouia-component-type='PF4/Table'] [data-ouia-component-id='Instance three'][data-ouia-component-type='PF4/TableRow'] [data-ouia-component-id='creating'][data-ouia-component-type='PF4/Button']"
    )
      //assert that the selector exists - in Cypress UI I checked that it marks the right button
      .should("exist")
      //does not work - why???
      .click();
  });

  // instance with name "error-test" already exists
  it("Submit and expect error", () => {
    const errorInstanceName: string = "error-test";
    cy.ouiaId("create-smart-event-instance", "PF4/Button").click();
    cy.ouiaId("create-instance", "PF4/ModalContent").then(($modal) => {
      cy.wrap($modal)
        .should("be.visible")
        .within(() => {
          cy.ouiaId("new-name", "PF4/TextInput").type(errorInstanceName);
          cy.ouiaId("submit", "PF4/Button").click();
          cy.ouiaId("error-instance-create-fail", "PF4/Alert").should(
            "have.text",
            "Danger alert:Address form errors to proceed."
          );
        });
    });
  });

  onlyOn(isEnvironmentType(EnvType.Mocked), () => {
    // instance with name containing "error-test" causes 4xx response code
    it.skip("Submit and expect error while creating", () => {
      const errorInstanceName: string = "error-test-2";
      cy.ouiaId("create-smart-event-instance", "PF4/Button").click();
      cy.ouiaId("create-instance", "PF4/ModalContent").then(($modal) => {
        cy.wrap($modal)
          .should("be.visible")
          .within(() => {
            cy.ouiaId("new-name", "PF4/TextInput").type(errorInstanceName);
            cy.ouiaId("submit", "PF4/Button").click();
            cy.ouiaId("error-instance-create-fail", "PF4/Alert").should(
              "have.text",
              "Danger alert:Error while creating a Smart Event instance. Please, try again later."
            );
          });
      });
    });

    it.skip("Submit and expect quota error", () => {
      const errorInstanceName: string = "quota-error";
      cy.ouiaId("create-smart-event-instance", "PF4/Button").click();
      cy.ouiaId("create-instance", "PF4/ModalContent").then(($modal) => {
        cy.wrap($modal)
          .should("be.visible")
          .within(() => {
            cy.ouiaId("new-name", "PF4/TextInput").type(errorInstanceName);
            cy.ouiaId("submit", "PF4/Button").click();
            cy.ouiaId("error-instance-create-fail", "PF4/Alert").should(
              "contain.text",
              "Warning alert:Your organization is out of quota."
            );
          });
      });
    });
  });

  it.skip("Cancel", () => {
    const canceledInstanceName: string = uniqueName("canceled-instance");
    createInstance(canceledInstanceName, "cancel");

    cy.ouiaId("Instances list table", "PF4/Table")
      .ouiaId(canceledInstanceName, "PF4/TableRow")
      .should("not.exist");
  });

  onlyOn(isEnvironmentType(EnvType.Dev), () => {
    /*
     * The best practices does not recommand the "after" metod for UI.
     * Cypress guaranted the order of the test execution.
     */
    it.skip("Clean the new instance", () => {
      deleteInstance(newInstanceName);
      cy.ouiaId("Instances list table", "PF4/Table").within(() => {
        // once delete confirmed, state should change
        cy.ouiaId(newInstanceName, "PF4/TableRow")
          .find("td")
          .eq(2)
          .should("have.text", "Deleting");

        // once deprovision is completed, entry should disappear
        cy.ouiaId(newInstanceName, "PF4/TableRow", { timeout: 120000 }).should(
          "not.exist"
        );
      });
    });
  });
});
