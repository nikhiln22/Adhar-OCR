import dotenv from "dotenv";
dotenv.config({ quiet: true });

interface Config {
  PORT: number;
  CLIENT_URL: string;
  MONGODB_URI: string;
}

function validateEnvVars(): void {
  const requiredEnvVars = ["PORT", "CLIENT_URL", "MONGODB_URI"];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.log(`missing required environment variable:${envVar}`);
    }
  });
}

validateEnvVars();

export const config: Config = {
  PORT: Number(process.env.PORT),
  CLIENT_URL: process.env.CLIENT_URL as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
};
