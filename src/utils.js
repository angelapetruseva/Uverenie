const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

// Function to convert worksheet to JSON
function worksheetToJson(worksheet) {
  const jsonData = xlsx.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
  });

  const headers = jsonData[0];
  const data = jsonData.slice(1);

  const jsonArray = data.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      if (row[index] != 5) {
        obj[header] = row[index];
      }
    });
    return obj;
  });

  return jsonArray;
}

// Convert xlsx to JSON
const convert = (nameXlsx, nameJSON) => {
  const excelFilePath = path.join(__dirname, 'data', nameXlsx);
  const jsonFilePath = path.join(__dirname, 'data', nameJSON);

  const workbook = xlsx.readFile(excelFilePath, {
    cellStyles: true,
    force: true,
  });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = worksheetToJson(worksheet);

  const jsonContent = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(jsonFilePath, jsonContent, 'utf8');
};

// Watch for changes in Excel files and convert them to JSON
const watchExcelFiles = () => {
  const excelFilesPath = path.join(__dirname, 'data');

  fs.watch(excelFilesPath, (eventType, fileName) => {
    const fileExtension = path.extname(fileName);

    if (eventType === 'change' && fileExtension === '.xlsx') {
      const jsonFileName = path.basename(fileName, fileExtension) + '.json';
      convert(fileName, jsonFileName);
      console.log(`File ${fileName} converted to ${jsonFileName}`);
    }
  });
};

// Start watching for changes in Excel files
watchExcelFiles();