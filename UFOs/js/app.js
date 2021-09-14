// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

//11.5.1 Dynamic Tables
function buildTable(data) {
  // First, clear out any existing data 11.5.1
  //references the table tbody.html ("")references emptystring
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  //11.5.2forEach == loop
  data.forEach((dataRow) => {
    // Append a row to the table body 11.5.2 chained into for loop
    //note that were using let instead of var.
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // 11.5.2 each value as a table cell (td) confusing. (td) appends <tr>. code is given.
    // val argument represents each item in the object. such as location shape of duration.
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// data.forEach(() => {}) // for looping through array []
// Object.values().forEach(() => {}) // for looping through object {}

// 1. Create a variable to keep track of all the filters as an object. 11.3.2 DEVTools = undefined
//do you want this as let? should this be wrapped in <tr> 11.5.2?
//i question that this is correct.askBCS. In Step 1 of the app.js file, 
//create an empty filters variable to keep track of all the elements that change when a search is entered. 
//This variable will be used in Step 5 to store the property "id" and the value that was entered from user input.
//11.5.1 tbody.html("") Basically, this entire line—tbody.html("");—tells JavaScript to use an empty string when creating the table; 
//in other words, create a blank canvas.
//const filters = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];

const filters = {};

// 2.In the index.html file, remove the list (<li></li>) element that creates the button. (## OK....
//why is this? messes with the saved ...so it is commented out in the HTML file.

// 3. Use this function to update the filters. 
function updateFilters() {
//Return to VS Code and our app.js file and start a new function. 
//We'll name this one "handleClick" because it will be handling what to do after an input is given, 
 

// 4a. Save the element that was changed as a variable.
// 11.5.3 Since we're adding a date function, we need to create a couple of variables to hold our date data, both filtered and unfiltered.
    let handleClick = d3.select(this);

//we're telling D3 not only to look for where our date values are stored on the webpage, 
//but to actually grab that information and hold it in the "date" variable. fxs

// 4b. Save the value that was changed as a variable.
    let changedValue = handleClick.property("value");
    console.log(changedhandleClick);

// 4c. Save the id of the filter that was changed as a variable. 11.6.1 BootStrap fxs
    let filteredValue = handleClick.attr("id");

// 5. If a filter value was entered then add that filterId and value
// to the filters list. Otherwise, clear that filter from the filters object.fxs 11.5.4
    if (changedValue) {
    filters[filteredValue] = changedValue;
    }
      else {
      delete filters[filteredValue];
    }

// 6. Call function to apply all filters and rebuild the table
    filterTable();
}

// 7. Use this function to filter the table when data is entered. 11.5.3 fxs look at 4b.
function filterTable() {

// 8. Set the filtered data to the tableData.
  let filteredData = tableData

// 9. Loop through all of the filters and keep any data that
// matches the filter values
Object.entries(filters).forEach(([key, value]) => {
filteredData = filteredData.filter(row => row[key] === value);
});

// 10. Finally, rebuild the table using the filtered data 11.5.4
// 11.5.4 given code After we pass filteredData in as our new argument, our full handleClick() function should look like the one below:
  buildTable(filteredData)
}


// 2. Attach an event to listen for changes to each filter 11.5.4 given code fxs
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads 11.5.4 given code fxs
buildTable(tableData);
