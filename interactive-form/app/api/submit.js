import { google } from 'googleapis';

export default async (req, res) => {
    try {
        // Parse the form data from the request body
        const { name, email } = req.body;

        // Initialize the Google Sheets API
        const sheets = google.sheets('v4');
        const authClient = await authorize(); // Implement authorization

        // Specify the spreadsheet ID and range where you want to write the data
        const spreadsheetId = '112729751319043134733';
        const range = 'Sheet1'; // Replace with your sheet name

        // Create a resource object with the data to be written
        const resource = {
            values: [[name, email]],
        };

        // Call the Google Sheets API to append the data
        await sheets.spreadsheets.values.append({
            auth: authClient,
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });

        res.status(200).json({ message: 'Form data submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while submitting the form' });
    }
};
