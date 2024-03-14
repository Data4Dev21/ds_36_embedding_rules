console.log("Hello world!");

//create constants and variables to be used later
//to find workbook structure

const viz = document.getElementById("ourViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

//sheets we want to filter
let saleMap;
let totalSales;
let SalesByProduct;
let SalesBySegment;

//Log all the informatiom about the workbook
//with a function

function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  //Get the array of dashboards and standalone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}]
    is: "${element.name}`);
  });

  //we are only interested in the active sheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet name is: "${vizActiveSheet.name}`);

  //list all worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}]
    is: "${element.name}"`);
  });

  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  SalesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  SalesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}
//log the workbook info once the viz is interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

//Tell js which button to look for
const oregonWashingtonButton = document.getElementById("Oregon_and_Washington");
const clearfiltebutton = document.getElementById("clear_filter");
const undobutton = document.getElementById("undo");

//Functions to do when buttons are clicked
function oregonWashFunction() {
  //what is pressed
  console.log(oregonWashingtonButton.value);

  //Apply the filter to all sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  SalesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  SalesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearStatefilter() {
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  SalesByProduct.clearFilterAsync("State");
  SalesBySegment.clearFilterAsync("State");
}

function unDo() {
  viz.undoAsync();
}

oregonWashingtonButton.addEventListener("click", oregonWashFunction);
clearfiltebutton.addEventListener("click", clearStatefilter);
undobutton.addEventListener("click", unDo);
