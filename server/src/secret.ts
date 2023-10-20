import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const clientSideUrl = process.env.CLIENT_SIDE_URL;
export const clientSideHost = process.env.CLIENT_SIDE_HOST;
export const DBUrl = process.env.DBUrl;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const SMTPPassword = process.env.SMTP_USER;
export const SMTPUserName = process.env.SMTP_PASSWORD;