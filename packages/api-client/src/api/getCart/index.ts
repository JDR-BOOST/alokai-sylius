import { BoilerplateIntegrationContext } from "src/types";

export const getCart = async (
  context: BoilerplateIntegrationContext,
  params
) => {
  console.log("getCart has been called");

  return { data: "Hello from getCart endpoint!" };
};
