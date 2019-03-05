import { createTestIntegrationExecutionContext } from "@jupiterone/jupiter-managed-integration-sdk";
import initializeContext from "./initializeContext";

jest.mock("./onelogin");

test("creates onelogin client", async () => {
  const options = {
    instance: {
      config: {
        clientId: "",
        clientSecret: "",
      },
    },
  };

  const executionContext = createTestIntegrationExecutionContext(options);

  const integrationContext = await initializeContext(executionContext);
  expect(integrationContext.graph).toBeDefined();
  expect(integrationContext.persister).toBeDefined();
  expect(integrationContext.provider).toBeDefined();
});
