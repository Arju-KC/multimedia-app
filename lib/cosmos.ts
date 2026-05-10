import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
});

const database = client.database(
  process.env.COSMOS_DATABASE_NAME!
);

const container = database.container(
  process.env.COSMOS_CONTAINER_NAME!
);

export { container };