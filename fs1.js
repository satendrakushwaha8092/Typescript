const fs= require('fs');  


//fs.mkdirSync("newfilesystem")
if (fs.existsSync('target3.xlsx')) {
    fs.unlinkSync('target3.xlsx');
  }

fs.writeFileSync('target3.xlsx',"check")


