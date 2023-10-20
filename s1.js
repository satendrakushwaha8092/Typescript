const ExcelJS = require("exceljs");
const XLSX = require("xlsx");
const moment = require("moment");

const sourceWorkbookPath = "../target4.xlsx"; // Replace with the path to your source Excel file
const pnlWorkbookPath = "../FF IS - CJSC - 08.23.xlsx";
const salesWorkbookPath = "../All live GL 2023.xlsx";
const targetWorkbookPath = "../target5.xlsx"; // Replace with the path to your target Excel file
const idealPercent = 21.79;

const newpnLData = new ExcelJS.Workbook();
newpnLData.xlsx.readFile(pnlWorkbookPath);

const sourceWorkbookpnl = XLSX.readFile(pnlWorkbookPath);
const sourceSheetpnlName = sourceWorkbookpnl.SheetNames[0];
const sourceSheetpnl = sourceWorkbookpnl.Sheets[sourceSheetpnlName];

const workbookGL = XLSX.readFile(salesWorkbookPath);
const sourceSheetName = workbookGL.SheetNames[0];
const sheet = workbookGL.Sheets[sourceSheetName];

const date = "2023-09-18T00:00:00.000Z"; //all dates depend on this
const formattedStartDate = moment(date, "DD-MM-YYYY");
const endDate = formattedStartDate.add(27, "days");
const formattedEndDate = endDate.format("DD-MM-YYYY");

const storeRecentStandardFoodCostAddress = [];
const storeFormulaJeUploadGcolumn = [];

const copySheets = async () => {
  const sourceWorkbook = new ExcelJS.Workbook();
  const targetWorkbook = new ExcelJS.Workbook();

  try {
    // Load the source workbook
    await sourceWorkbook.xlsx.readFile(sourceWorkbookPath);

    // Load the target workbook
    await targetWorkbook.xlsx.readFile(targetWorkbookPath);

    // Loop through each sheet in the source workbook
    sourceWorkbook.eachSheet((sourceSheet) => {
      // Check if a sheet with the same name already exists in the target workbook

      const existingSheet = targetWorkbook.getWorksheet(sourceSheet.name);

      if (
        !existingSheet &&
        sourceSheet.name != "Sales" &&
        sourceSheet.name != "2023 JE UPLOAD CLEAN"
      ) {
        // If the sheet doesn't exist in the target workbook, clone and add it
        const newTargetSheet = targetWorkbook.addWorksheet(sourceSheet.name, {
          properties: sourceSheet.properties,
          state: sourceSheet.state,
        });

        // Copy each cell (with style and values) from the source sheet to the new target sheet

        if (sourceSheet.name == "P&L Data") {
          copypnlSheet(sourceSheet, newTargetSheet);
        } else if (sourceSheet.name == "Labor Standard Variance") {
          copyLaborStandardVariance(
            sourceSheet,
            newTargetSheet,
            targetWorkbook
          );
        } else if (sourceSheet.name == "JE Upload ") {
          updateFormulaInJeUpload(sourceSheet, newTargetSheet);
        } else {
          sourceSheet.eachRow((sourceRow, rowNum) => {
            const newTargetRow = newTargetSheet.getRow(rowNum);
            sourceRow.eachCell((cell, colNum) => {
              const newTargetCell = newTargetRow.getCell(colNum);
              newTargetCell.value = cell.value;
              newTargetCell.formula = cell.formula;
              newTargetCell.result = cell.result;
              newTargetCell.style = cell.style;
            });
          });
        }
      }
    });

    // Save the updated target workbook
    targetWorkbook.calcProperties.fullCalcOnLoad = true;

    await targetWorkbook.xlsx.writeFile(targetWorkbookPath);

    await sourceWorkbook.xlsx.readFile(targetWorkbookPath);

    const jeUploadSheet = sourceWorkbook.getWorksheet("JE Upload ");

    const addJeUploadClean = targetWorkbook.addWorksheet(
      "2023 JE UPLOAD CLEAN"
    );

    const headerRow = addJeUploadClean.getRow(1);

    // Add a blue background color to the header row (as shown in the previous example)
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "0000FF" }, // Blue color code
      };
    });

    // Set the header text color to white (as shown in the previous example)
    headerRow.eachCell((cell) => {
      cell.font = {
        color: { argb: "FFFFFF" }, // White color code
      };
    });

    // Add text to a specific cell in the header row
    headerRow.getCell(1).value = "BatchID";
    headerRow.getCell(2).value = "Entity";
    headerRow.getCell(3).value = "TranDate";
    headerRow.getCell(4).value = "TransactionDescription";
    headerRow.getCell(5).value = "SourceDocument";
    headerRow.getCell(6).value = "TransactionType";
    headerRow.getCell(7).value = "ReversingDate";
    headerRow.getCell(8).value = "Account";
    headerRow.getCell(9).value = "LineDescription";
    headerRow.getCell(10).value = "Debit";
    headerRow.getCell(11).value = "Credit";

    let i = 1;

    jeUploadSheet.eachRow((sourceRow, rowNum) => {
      const value = jeUploadSheet.getCell(rowNum, 15).result;
      const value2 = jeUploadSheet.getCell(rowNum, 16).result;

      if ((value && !value2) || (!value && value2)) {
        i++;
        const newTargetRow = addJeUploadClean.getRow(i);
        sourceRow.eachCell((cell, colNum) => {
          if (colNum === 15) {
            const newTargetCell = newTargetRow.getCell(10);
            newTargetCell.value = {
              formula: `=IF(L${i}>0,L${i},0)`,
            };
            newTargetCell.formula = `=IF(L${i}>0,L${i},0)`;
            //newTargetCell.result = cell.result;
          }

          if (colNum === 16) {
            const newTargetCell = newTargetRow.getCell(11);
            newTargetCell.value = {
              formula: `=-IF(L${i}<0,L${i},0)`,
            };
            newTargetCell.formula = `=-IF(L${i}<0,L${i},0)`;
            //newTargetCell.result = cell.result;
          }

          if (colNum === 18) {
            const newTargetCell = newTargetRow.getCell(12);
            newTargetCell.value = {
              formula: `=XLOOKUP(H${i},'JE Upload '!B:B,'JE Upload '!N:N,0,0,1)`,
            };
            newTargetCell.formula = `=XLOOKUP(H${i},'JE Upload '!B:B,'JE Upload '!N:N,0,0,1)`;
            newTargetCell.result = cell.result;
          }

          if (colNum === 2) {
            const newTargetCell = newTargetRow.getCell(8);
            newTargetCell.value = cell.result;
            newTargetCell.result = cell.result;
          }

          if (colNum === 17) {
            const newTargetCell = newTargetRow.getCell(2);
            newTargetCell.value = cell.result;
          }

          if (colNum === 3) {
            const newTargetCell = newTargetRow.getCell(9);
            newTargetCell.value = cell.result;
          }

          if (colNum === 10) {
            const newTargetCell = newTargetRow.getCell(4);
            newTargetCell.value = cell.result;
          }

          if (colNum === 5) {
            const newTargetCell = newTargetRow.getCell(3);
            newTargetCell.value = cell.result;
          }
        });
      }
    });

    targetWorkbook.calcProperties.fullCalcOnLoad = true;

    await targetWorkbook.xlsx.writeFile(targetWorkbookPath);

    console.log("Sheets copied to the target workbook.");
  } catch (error) {
    console.error("Error copying sheets:", error.message);
  }
};

function copypnlSheet(sourceSheet, newTargetSheet) {
  sourceSheet.eachRow((sourceRow, rowNum) => {
    const newTargetRow = newTargetSheet.getRow(rowNum);
    sourceRow.eachCell((cell, colNum) => {
      const newTargetCell = newTargetRow.getCell(colNum);
      if (
        (colNum === 1 || colNum === 2 || colNum === 3 || colNum === 4) &&
        sourceSheet.name == "P&L Data"
      ) {
        newTargetCell.value = cell.value;
        newTargetCell.formula = cell.formula;
        newTargetCell.result = cell.result;
        newTargetCell.style = cell.style;
      } else if (colNum > 4 && sourceSheet.name == "P&L Data") {
        const pnlSheet = newpnLData.getWorksheet(1);
        const sourceCell = pnlSheet.getCell(rowNum, colNum - 4);
        const sourceCell2 = sourceSheetpnl[sourceCell.address];
        const result = sourceCell2 ? sourceCell2.v : "";
        newTargetCell.value = result;
        newTargetCell.formula = sourceCell.formula;
        newTargetCell.result = sourceCell.result;
        newTargetCell.style = sourceCell.style;
      }
    });
  });
}

function copyLaborStandardVariance(
  sourceSheet,
  newTargetSheet,
  targetWorkbook
) {
  let tempColmunNum;
  sourceSheet.eachRow((sourceRow, rowNum) => {
    sourceRow.eachCell((cell, colNum) => {
      if (rowNum === 7) {
        if (cell.value == "Ideal %") {
          tempColmunNum = colNum;
        }
      }
    });
  });

  const address = getColumnAddress(tempColmunNum);

  for (let i = 8; i < 70; i++) {
    storeRecentStandardFoodCostAddress.push(address + i); //store address for update formula in JE UPLOAD sheet in N column
  }

  for (let i = 2; i < 250; i++) {
    //store formula for JE UPLOAD G column
    let formula = `VLOOKUP(Q${i},'Labor Standard Variance'!$${getColumnAddress(
      tempColmunNum - 1
    )}$2:$${getColumnAddress(tempColmunNum)}$6,2,FALSE)`;
    storeFormulaJeUploadGcolumn.push(formula);
  }

  const frozenRows = [4, 5, 6, 7];
  frozenRows.forEach((rowNumber) => {
    //fix column
    newTargetSheet.views = [
      {
        state: "frozen",
        ySplit: rowNumber, // Split after this row
      },
    ];
  });

  // Copy each row (with style and values) from the source sheet to the cloned sheet
  sourceSheet.eachRow((sourceRow, rowNum) => {
    const targetRow = newTargetSheet.getRow(rowNum);
    sourceRow.eachCell((cell, colNum) => {
      if (colNum === 11 && rowNum > 7 && rowNum < 70) {
        //copy all style and result column of k in j column
        const targetCell = targetRow.getCell(colNum);
        const targetCell2 = targetRow.getCell(colNum - 1);
        targetCell.value = targetCell2.result;
        targetCell.style = targetCell2.style;
      }

      if (colNum === 11 && rowNum > 3 && rowNum < 8) {
        //copy all style and value column of k in j column
        const targetCell = targetRow.getCell(colNum);
        const targetCell2 = targetRow.getCell(colNum - 1);
        targetCell.value = targetCell2.value;
        targetCell.style = targetCell2.style;
        targetCell.width = cell.width;
      }

      if (colNum === 3 && rowNum === 4) {
        //update current month in column 3
        const targetCell = targetRow.getCell(colNum - 1);
        targetCell.value = new Date(
          moment(date).add(2, "months").format("YYYY-MM-DD")
        );
        targetCell.style = targetCell.style;
      }

      if (colNum === 11 && rowNum === 4) {
        //update current month in column 3
        const targetCell = targetRow.getCell(colNum - 1);
        targetCell.value = new Date(
          moment(date).add(2, "months").format("YYYY-MM-DD")
        );
        targetCell.style = targetCell.style;
      }

      if (colNum > 10 && rowNum > 3) {
        if (tempColmunNum == colNum) {
          const targetCell = targetRow.getCell(colNum + 1);
          targetCell.value = cell.value;
          targetCell.formula = cell.formula;
          targetCell.style = cell.style;
        } else if (tempColmunNum - 1 == colNum && rowNum > 7 && rowNum < 70) {
          const targetCell = targetRow.getCell(colNum + 1);
          const targetCell2 = targetRow.getCell(colNum + 2);
          const formula = cell.formula;
          const newFormula = formula.replace(
            targetCell.address,
            targetCell2.address
          );
          targetCell.value = {
            formula: newFormula,
          };
          targetCell.formula = newFormula;
          targetCell.style = cell.style;
        } else if (tempColmunNum + 5 == colNum && rowNum > 7 && rowNum < 70) {
          const targetCell = targetRow.getCell(colNum + 1);
          const targetCell2 = targetRow.getCell(colNum - 5);
          const targetCell3 = targetRow.getCell(colNum - 6);
          const formula = cell.formula;
          const newFormula = formula.replace(
            targetCell3.address,
            targetCell2.address
          );
          targetCell.value = {
            formula: newFormula,
          };
          targetCell.formula = newFormula;
          targetCell.style = cell.style;
        } else if (tempColmunNum - 1 == colNum && rowNum == 71) {
          const targetCell = targetRow.getCell(colNum + 1);
          const sourceCell = sourceSheet.getCell(rowNum - 3, colNum + 1);
          const sourceCell2 = sourceSheet.getCell(rowNum - 63, colNum + 1);
          targetCell.value = {
            formula: `=+SUM(${sourceCell.address}:${sourceCell2.address})`,
          };
          targetCell.formula = `=+SUM(${sourceCell.address}:${sourceCell2.address})`;
          targetCell.style = cell.style;
        } else if (tempColmunNum - 1 == colNum && rowNum == 72) {
          const targetCell = targetRow.getCell(colNum + 1);
          targetCell.value = {
            formula: `=ROUND(+B71*${idealPercent}%,2)`,
          };
          (targetCell.formula = cell.formula), (targetCell.style = cell.style);
        } else if (tempColmunNum - 1 == colNum && rowNum == 73) {
          const targetCell = targetRow.getCell(colNum + 1);
          const sourceCell = sourceSheet.getCell(rowNum - 1, colNum + 1);
          const sourceCell2 = sourceSheet.getCell(rowNum - 2, colNum + 1);
          targetCell.value = {
            formula: `=+${sourceCell.address}-${sourceCell2.address}`,
          };
          targetCell.formula = `=+${sourceCell.address}-${sourceCell2.address}`;
          targetCell.style = cell.style;
        } else if (tempColmunNum - 1 == colNum && rowNum == 74) {
          const targetCell = targetRow.getCell(colNum + 1);
          targetCell.value = {
            formula: `=${targetCell.address}/54`,
          };
          targetCell.formula = `=${targetCell.address}/54`;
          targetCell.style = cell.style;
        } else if (tempColmunNum + 3 == colNum && rowNum == 77) {
          const targetCell = targetRow.getCell(colNum + 1);
          const sourceCell = sourceSheet.getCell(rowNum - 3, colNum + 1);
          targetCell.value = {
            formula: `=${sourceCell.address}/56`,
          };
          targetCell.formula = `=${sourceCell.address}/56`;
          targetCell.style = cell.style;
        } else {
          const targetCell = targetRow.getCell(colNum + 1);
          targetCell.value = cell.formula ? "=" + cell.formula : cell.value;
          targetCell.style = cell.style;
        }
      } else {
        const targetCell = targetRow.getCell(colNum);
        targetCell.value = cell.value;
        targetCell.formula = cell.formula;
        targetCell.style = cell.style;
      }

      if (colNum === 3 && rowNum == 2) {
        //copy all style and result column of k in j column
        const targetCell = targetRow.getCell(colNum);
        targetCell.value = moment(date).add(27, "days").format("DD-MM-YYYY");
        targetCell.style = cell.style;
      }

      if (colNum === 4 && rowNum == 2) {
        //copy all style and result column of k in j column
        const targetCell = targetRow.getCell(colNum);
        targetCell.value = moment(date).format("DD-MM-YYYY");
        targetCell.style = cell.style;
      }

      if (colNum === 3 && rowNum === 4) {
        const splitDate = moment(date).format("DD-MM-YYYY").split("-");
        const formattedEndDate = moment(date)
          .add(27, "days")
          .format("DD-MM-YYYY");
        const splitDate2 = formattedEndDate.split("-");
        //update current month in column 3
        const targetCell = targetRow.getCell(colNum);
        targetCell.value = `${splitDate[1]}/${splitDate[0]} to ${splitDate2[1]}/${splitDate2[0]}`;
        targetCell.style = targetCell.style;
      }
    });

    targetRow.height = sourceRow.height; // Preserve row height
    targetRow.width = sourceRow.width;
  });
  targetWorkbook.getWorksheet(newTargetSheet);

  // Hide the specified column by setting its style property
  for (let i = 15; i < 90; i++) {
    newTargetSheet.getColumn(i).hidden = true;
  }
}

async function copySales() {
  console.log("working on sales sheet");
  const startDate = moment(date, "DD-MM-YYYY");
  const endDate2 = moment(endDate, "DD-MM-YYYY");

  console.log(startDate);
  console.log(endDate);

  const dataArray = XLSX.utils.sheet_to_json(sheet);
  const newArr = dataArray.filter((row) => {
    const serialDate = row["TRX Date"];
    const excelStartDate = new Date(1900, 0, 1);
    const date = new Date(
      excelStartDate.getTime() + (serialDate - 2) * 24 * 60 * 60 * 1000
    );
    const formattedDate = moment(date).format("DD-MM-YYYY");
    row["TRX Date"] = formattedDate;
    const momentDate = moment(formattedDate, "DD-MM-YYYY");
    return momentDate.isAfter(startDate) && momentDate.isBefore(endDate2);
  });

  const newSheet = XLSX.utils.json_to_sheet(newArr);
  const targetWorkbook = XLSX.readFile(targetWorkbookPath);
  const workingSheet = "Sales";

  XLSX.utils.book_append_sheet(targetWorkbook, newSheet, workingSheet);
  await XLSX.writeFile(targetWorkbook, targetWorkbookPath);
  console.log("copy all data from GL to traget workbook");
  copySheets();
}

function getColumnAddress(columnIndex) {
  let columnAddress = "";
  while (columnIndex > 0) {
    const remainder = (columnIndex - 1) % 26;
    columnAddress = String.fromCharCode(65 + remainder) + columnAddress;
    columnIndex = Math.floor((columnIndex - 1) / 26);
  }
  return columnAddress;
}

function updateFormulaInJeUpload(sourceSheet, newTargetSheet) {
  sourceSheet.eachRow((sourceRow, rowNum) => {
    const newTargetRow = newTargetSheet.getRow(rowNum);
    sourceRow.eachCell((cell, colNum) => {
      if (colNum == 14 && rowNum > 1 && rowNum < 125) {
        const newTargetCell = newTargetRow.getCell(colNum);
        const formula = cell.formula;
        const formulaUpdateAddress = formula.split("!")[1];
        let newFormula;
        if (rowNum <= 63) {
          newFormula = formula.replace(
            formulaUpdateAddress,
            storeRecentStandardFoodCostAddress[rowNum - 2] //update N column formula
          );
          newTargetCell.value = {
            formula: newFormula,
          };
        } else {
          newFormula = formula.replace(
            formulaUpdateAddress,
            storeRecentStandardFoodCostAddress[rowNum - 64] //update N column formula
          );
          newTargetCell.value = {
            formula: newFormula,
          };
        }
        newTargetCell.formula = newFormula;
        newTargetCell.style = cell.style;
      } else if (colNum == 7 && rowNum > 1 && rowNum < 250) {
        const newTargetCell = newTargetRow.getCell(colNum);
        newTargetCell.value = {
          formula: storeFormulaJeUploadGcolumn[rowNum - 2],
        };
        newTargetCell.formula = cell.formula;
        newTargetCell.result = cell.result;
        newTargetCell.style = cell.style;
      } else {
        const newTargetCell = newTargetRow.getCell(colNum);
        newTargetCell.value = cell.value;
        newTargetCell.formula = cell.formula;
        newTargetCell.result = cell.result;
        newTargetCell.style = cell.style;
      }
    });
  });
}

copySheets();
