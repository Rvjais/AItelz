// 1. Go to https://script.google.com/home
// 2. Create a "New Project"
// 3. Paste this code into the editor (replace existing code)
// 4. Click "Deploy" > "New deployment"
// 5. Select type: "Web app"
// 6. Description: "Lead Capture"
// 7. Execute as: "Me"
// 8. Who has access: "Anyone" (Important!)
// 9. Click "Deploy"
// 10. Copy the "Web App URL"
// 11. Paste the URL into src/components/Hero.jsx variable GOOGLE_SCRIPT_URL

function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = JSON.parse(e.postData.contents);

        // Add headers if they don't exist
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(["Timestamp", "Phone Number"]);
        }

        // Append the data
        // We prepend a single quote (') to the phone number to force Google Sheets to treat it as text
        // This prevents numbers starting with '+' from being interpreted as broken formulas (#ERROR!)
        var phone = data.phone;
        if (phone && (phone.toString().startsWith("+") || phone.toString().startsWith("="))) {
            phone = "'" + phone;
        }

        sheet.appendRow([new Date(), phone]);

        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
