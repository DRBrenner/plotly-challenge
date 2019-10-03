function buildMetadata(sample) {

  // THIS FUNCTION WORKS!

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(`/metadata/${sample}`).then((data) => {
    var panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);

    })
  })
}


function buildCharts(sample) {


 //THIS IS THE BUBBLE CHART.  I WASN'T SURE IF I SHOULD KEEP USING THE SAME
 //NAMES FOR THINGS SO I USED 'RESPONSE' AND 'BUBBLE' - BUT NOT SURE IF I DID IT
 //CORRECTLY.  ALSO, IT SEEMS LIKE THE BUBBLE SIZE SHOULD BE ON THE "COUNT"
 //OF SAMPLE VALUES, NOT SAMPLE VALUES, BUT THE EXAMPLE PHOTO LOOKS LIKE
 //IT WAS JUST DON'T ON THE VALUE.

  //   // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((response) => {
  //   // @TODO: Build a Bubble Chart using the sample data
  var trace1 = {
    x: response.map(data => data.otu_ids),
    y: response.map(data => data.sample_values),
    marker: {
      size: response.map(data => data.sample_values),
      color: response.map(data => data.otu_ids)
    }
  };
}
  var bubble = [trace1];

  var layout = {
    title: 'Bubble Chart',
    showlegend: false,
    height: 400,
    width: 800
  };

  Plotly.newPlot('bubble', bubble, layout);


//THIS IS THE PIE CHART. AGAIN, I WASN'T SURE IF I SHOULD REUSE VARIABLES,
// SO I CALLED THINGS 'RESPONSE' AND 'PIEINFO.'  NOT SURE IF I DID THE SLICE
// IN THE CORRECT PLACE

      //   // @TODO: Build a Pie Chart
      //   // HINT: You will need to use slice() to grab the top 10 sample_values,
      //   // otu_ids, and labels (10 each).
      d3.json(`/samples/${sample}`).then((response) => {
        var pieInfo = [{
          values: response.map(data => data.sample_values.slice(0, 10)),
          labels: response.map(data => data.otu_ids.slice(0, 10)),
 ??????? hovertext : response.map(data => data.otu_labels.slice(0, 10)),  
        type: 'pie'
      }];

      var layout = {
        height: 400,
        width: 400
      };

??Plotly.newPlot('pie', pieInfo, layout);


//THIS PART IS WORKING FOR THE SELECT SAMPLE AND METADATA DISPLAY, BUT
//I THINK I MESSED UP CLOSING [],(), OR {}. AND NOT SURE IF THE LAST LINE,
//"INIT()" GOES INSIDE OR OUTSIDE THE LAST BRACKETS.

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};
}
// Initialize the dashboard
init();
