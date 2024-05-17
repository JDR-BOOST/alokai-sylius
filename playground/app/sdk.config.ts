import { type Endpoints } from "../middleware/types";

export default defineSdkConfig(
  ({ buildModule, middlewareUrl, middlewareModule }) => ({
    boilerplate: buildModule(middlewareModule<Endpoints>, {
      apiUrl: `${middlewareUrl}/boilerplate`,
    }),
  })
);
