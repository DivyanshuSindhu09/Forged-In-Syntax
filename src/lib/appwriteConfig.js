import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67d52e1b0028362f1c9d"); // Your Appwrite Project ID

const databases = new Databases(client);

export { client, databases };