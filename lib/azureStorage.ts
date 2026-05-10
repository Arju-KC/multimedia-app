import { BlobServiceClient } from "@azure/storage-blob";

const connectionString =
  process.env.AZURE_STORAGE_CONNECTION_STRING!;

const containerName =
  process.env.AZURE_STORAGE_CONTAINER_NAME!;

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerClient =
  blobServiceClient.getContainerClient(containerName);

export { containerClient };