const ExcelJS = require("exceljs");
const XLSX = require("xlsx");
const moment = require("moment");

let storeRecentStandardFoodCostAddress = [];
let storeFormulaJeUploadGcolumn = [];

const idealPercent = 21.79;
const JEUPLOADCLEAN = "2023 JE UPLOAD CLEAN";

const copySheets = async (
  sourceWorkbookPath,
  pnlWorkbookPath,
  targetWorkbookPath,
  date
) => {
  const newpnLData = new ExcelJS.Workbook();
  newpnLData.xlsx.readFile(pnlWorkbookPath);

  const sourceWorkbookpnl = XLSX.readFile(pnlWorkbookPath);
  const sourceSheetpnlName = sourceWorkbookpnl.SheetNames[0];
  const sourceSheetpnl = sourceWorkbookpnl.Sheets[sourceSheetpnlName];

  const formattedStartDate = moment(date, "DD-MM-YYYY");
  const endDate = formattedStartDate.add(27, "days");
  const formattedEndDate = endDate.format("DD-MM-YYYY");

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

      if (!existingSheet && sourceSheet.name != JEUPLOADCLEAN) {
        // If the sheet doesn't exist in the target workbook, clone and add it
        const newTargetSheet = targetWorkbook.addWorksheet(sourceSheet.name, {
          properties: sourceSheet.properties,
          state: sourceSheet.state,
        });

        // Copy each cell (with style and values) from the source sheet to the new target sheet

        if (sourceSheet.name == "P&L Data") {
          copypnlSheet(sourceSheet, newTargetSheet, newpnLData, sourceSheetpnl);
        } else if (sourceSheet.name == "Labor Standard Variance") {
          copyLaborStandardVariance(
            sourceSheet,
            newTargetSheet,
            targetWorkbook,
            date
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

    const downloadFilePath = await copyDataJeUploadToJeUploadClean(
      targetWorkbook,
      targetWorkbookPath
    );
    return downloadFilePath;
  } catch (error) {
    console.error("Error copying sheets:", error.message);
  }
};

const copypnlSheet = (
  sourceSheet,
  newTargetSheet,
  newpnLData,
  sourceSheetpnl
) => {
  console.log("copy all p & l data");
  newTargetSheet.views = [
    {
      state: "frozen",
      ySplit: 6, // Split after this row
      xSplit: 5,
    },
  ];

  const pnlSheet = newpnLData.getWorksheet(1);

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
        newTargetCell.style = cell.style;
      } 
      // else if (colNum > 4 && sourceSheet.name == "P&L Data") {
      //   const sourceCell = pnlSheet.getCell(rowNum, colNum - 4);
      //   const sourceCell2 = sourceSheetpnl[sourceCell.address];
      //   const result = sourceCell2 ? sourceCell2.v : "";
      //   newTargetCell.value = result;
      //   newTargetCell.formula = sourceCell.formula;
      //   newTargetCell.style = sourceCell.style;
      // }
    });
  });

  pnlSheet.eachRow((sourceRow, rowNum) => {
     const newTargetRow = newTargetSheet.getRow(rowNum);
    sourceRow.eachCell((cell, colNum) => {
      const newTargetCell = newTargetRow.getCell(colNum+4);

      const sourceCell = pnlSheet.getCell(rowNum, colNum);
        const sourceCell2 = sourceSheetpnl[sourceCell.address];
        const result = sourceCell2 ? sourceCell2.v : "";
        newTargetCell.value = result;
        newTargetCell.formula = sourceCell.formula;
        newTargetCell.style = sourceCell.style;
    });
  });

  

  const columnCount = newTargetSheet.columnCount;
  newTargetSheet.autoFilter = `A6:${
    getColumnAddress(columnCount) + newTargetSheet.rowCount
  }`;
};

const copyLaborStandardVariance = (
  sourceSheet,
  newTargetSheet,
  targetWorkbook,
  date
) => {
  console.log("copy all Labor Standard Variance data");
  storeRecentStandardFoodCostAddress = [];
  storeFormulaJeUploadGcolumn = [];

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

  newTargetSheet.views = [
    {
      state: "frozen",
      ySplit: 7, // Split after this row
      xSplit: 1,
    },
  ];

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
          moment(date).add(1, "months").format("YYYY-MM-DD")
        );
        targetCell.style = targetCell.style;
      }

      if (colNum === 11 && rowNum === 4) {
        //update current month in column 3
        const targetCell = targetRow.getCell(colNum - 1);
        targetCell.value = new Date(
          moment(date).add(1, "months").format("YYYY-MM-DD")
        );
        targetCell.style = targetCell.style;
      }

      if (colNum > 10) {
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
          const formula = cell.formula;
          targetCell.value =
            cell.formula && rowNum == 71
              ? {
                  formula: formula.replaceAll(
                    getColumnAddress(colNum),
                    getColumnAddress(colNum + 1)
                  ),
                }
              : cell.value;
          targetCell.style = cell.style;
        }
      } else if(colNum == 5 && rowNum >7){
        const targetCell = targetRow.getCell(colNum);

        const formula = cell.formula;
        const targetCell2 = targetRow.getCell(tempColmunNum - 3);
          const targetCell3 = targetRow.getCell(tempColmunNum - 2);
          console.log(targetCell2.address,targetCell3.address)

        const newFormula = formula.replace(targetCell2.address,targetCell3.address)
        targetCell.value = {
          formula: newFormula
        }
        targetCell.formula = newFormula
        targetCell.style = cell.style;
        targetCell.result = cell.result;
      } 
      else {
        const targetCell = targetRow.getCell(colNum);
        targetCell.value = cell.value;
        targetCell.formula = cell.formula;
        targetCell.style = cell.style;
        targetCell.result = cell.result;
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

      if (colNum === 11 && rowNum === 7) {
        const targetCell = targetRow.getCell(colNum);
        targetCell.value = `Complete`;
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

  newTargetSheet.getRow(7).hidden = true;

  const columnCount = newTargetSheet.columnCount;
  newTargetSheet.autoFilter = `A6:${getColumnAddress(columnCount) + 69}`;
};

const getColumnAddress = (columnIndex) => {
  let columnAddress = "";
  while (columnIndex > 0) {
    const remainder = (columnIndex - 1) % 26;
    columnAddress = String.fromCharCode(65 + remainder) + columnAddress;
    columnIndex = Math.floor((columnIndex - 1) / 26);
  }
  return columnAddress;
};

const updateFormulaInJeUpload = (sourceSheet, newTargetSheet) => {
  console.log("update formula in je upload");
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
};

const getTagetFileName = (startDate) => {
  const dateStr = startDate;
  const date = new Date(dateStr);

  // Get the year and month parts
  const year = date.getFullYear();
  const month = date.getMonth() + 2; // Adding 1 because months are zero-based

  // Format the year and month as 'YYYY-MM'
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}`;

  const fileName = `../downloads/CJ Labor Standard  food cost ${formattedDate}.xlsx`; // Output: "2023-08"

  return fileName;
};

const copyDataJeUploadToJeUploadClean = async (
  targetWorkbook,
  targetWorkbookPath
) => {
  const jeUploadSheet = targetWorkbook.getWorksheet("JE Upload ");

  const addJeUploadClean = targetWorkbook.addWorksheet(JEUPLOADCLEAN);

  const headerRow = addJeUploadClean.getRow(2);

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

  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0000FF" }, // Blue color
    };
    cell.font = {
      bold: true,
      color: { argb: "FFFFFF" }, // White color
    };
  });

  let i = 2;

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
        }

        if (colNum === 16) {
          const newTargetCell = newTargetRow.getCell(11);
          newTargetCell.value = {
            formula: `=-IF(L${i}<0,L${i},0)`,
          };
          newTargetCell.formula = `=-IF(L${i}<0,L${i},0)`;
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

  const newTargetRow = addJeUploadClean.getRow(1);
  const newTargetCell = newTargetRow.getCell(10);
  newTargetCell.value = {
    formula: `=SUBTOTAL(9,J3:J${i})`,
  };
  newTargetCell.formula = `=SUBTOTAL(9,J3:J${i})`;

  const newTargetRow2 = addJeUploadClean.getRow(1);
  const newTargetCell2 = newTargetRow2.getCell(11);
  newTargetCell2.value = {
    formula: `=SUBTOTAL(9,K3:K${i})`,
  };
  newTargetCell2.formula = `=SUBTOTAL(9,K3:K${i})`;

  const columnCount = addJeUploadClean.columnCount;
  addJeUploadClean.autoFilter = `A2:${getColumnAddress(columnCount) + i}`;

  targetWorkbook.calcProperties.fullCalcOnLoad = true;

  await targetWorkbook.xlsx.writeFile(targetWorkbookPath);
  console.log("Sheets copied to the target workbook.");
  return targetWorkbookPath;
};

module.exports.copySales = async (
  sourceWorkbookPath,
  pnlWorkbookPath,
  salesWorkbookPath,
  date
) => {
  const targetWorkbookPath = getTagetFileName(date);

  const targetWorkbook2 = new ExcelJS.Workbook();
  await targetWorkbook2.xlsx.writeFile(targetWorkbookPath);
  const workbookGL = XLSX.readFile(salesWorkbookPath);
  const sourceSheetName = workbookGL.SheetNames[0];
  const sheet = workbookGL.Sheets[sourceSheetName];

  const formattedStartDate = moment(date);
  const endDate = formattedStartDate.add(27, "days");

  console.log("filter data on sales sheet");
  const startDate = moment((moment(date).format("DD-MM-YYYY")), "DD-MM-YYYY");
  const endDate2 = moment((endDate.format("DD-MM-YYYY")), "DD-MM-YYYY");

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
  console.log("copy all data from GL to target workbook");
  const downloadFile = await copySheets(
    sourceWorkbookPath,
    pnlWorkbookPath,
    targetWorkbookPath,
    date
  );
  return downloadFile;
};
