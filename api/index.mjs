console.log('Loading function');

import {
  DynamoDBClient
} from "@aws-sdk/client-dynamodb";

import {
  PutCommand,
  DynamoDBDocumentClient
} from "@aws-sdk/lib-dynamodb";

// TODO - Remove SES form this...
// Consider add a new lambda called from registred email ... as the ses fail the lambda fail causing this to be a false problem...
// maibe enqueue this to be sended later byt another lambda that is called by the email service

// Import SES Client
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Email configuration constants
const EMAIL_SOURCE = "noreply@articul8.ai";
const EMAIL_DESTINATION = ["info@articul8.ai"];

/**
 * Provide an event that contains the following keys:
 *
 *   - name: Name to be inserted
 *   - email: email
 *   - company: Organization name
 */
export const handler = async (event, context) => {
  const payload = JSON.parse(event.body);

  const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));
  const sesClient = new SESClient({ region: "us-east-1" }); // Set up SES client

  console.log('Received event:', JSON.stringify(payload, null, 2));

  // Save to DynamoDB
  const now = new Date();
  const timestamp = now.toISOString();
  const dbRow = { ...payload, timestamp }
  const dynamoResult = await saveToDynamoDB(ddbDocClient, dbRow);

  console.log('DynamoDB Result:', dynamoResult);

  // Send Email
  const emailResult = await sendEmail(sesClient, payload);
  console.log('Email Result:', emailResult);

  return {
    dynamoResult,
    emailResult
  };
};

// Function to save data to DynamoDB
async function saveToDynamoDB(ddbDocClient, payload) {
  const tableName = process.env.DYNAMODB_TABLE;
  console.log('Dynamodb table name:', tableName);

  const command = new PutCommand({
    TableName: tableName,
    Item: {
      id: payload.email,
      ...payload
    }
  });

  return ddbDocClient.send(command);
}

// Function to send email
async function sendEmail(sesClient, payload) {
  const emailCommand = new SendEmailCommand({
    Source: EMAIL_SOURCE,
    Destination: {
      ToAddresses: EMAIL_DESTINATION
    },
    Message: {
      Subject: { Data: "New User Submitted Contact Info" },
      Body: {
        Text: { Data: `A new user submitted contact info.\n\nName: ${payload.name}\nEmail: ${payload.email}\nCompany: ${payload.company}\nSubject: ${payload.subject} ` }

      }
    }
  });

  return sesClient.send(emailCommand);
}
