import { google } from "googleapis";
import { authClient } from "./oauthClient";


export const calendar = google.calendar({
  version:'v3',
  auth:authClient
})