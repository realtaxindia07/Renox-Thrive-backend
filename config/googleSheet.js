require("dotenv").config()
const { google } = require('googleapis');
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth }); 
const range = 'Sheet1'; 

module.exports.readData=async(spreadsheetId)=>{
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
}

module.exports.writeData=async(userData,spreadsheetId)=>{
  const values = [[userData.name,userData.phone,userData.email,userData.desc]];

  const resource = {
    values,
  };
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource,
  });

  console.log(` cells appended.`);
}
