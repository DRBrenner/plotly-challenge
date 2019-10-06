function buildMetadata(sample) {

// Use `d3.json` to fetch the metadata for a sample
// Use d3 to select the panel with id of `#sample-metadata`
  d3.json(`/metadata/${sample}`).then((data) => {
    var panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);

    })
  })
};


function buildCharts(sample) {

//  Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((response) => {
//  Build a Bubble Chart using the sample data
    var trace1 = {
      x: response.otu_ids,
      y: response.sample_values,
      text: response.otu_ids,
      mode: 'markers',
      marker: {
        size: response.sample_values,
        color: response.otu_ids,
        colorscale: "Rainbow"
      }
    };
    var bubble = [trace1];

    var layout = {
      showlegend: false,
      height: innerHeight,
      width: innerWidth,
      yaxis: {
        title: {
          text: 'Samples'
        }
      },
      xaxis: {
        title: {
          text: 'OTU ID'
          // font: {
          //   family: 'Courier New, monospace',
          //   size: 14,
          //   color: '#7f7f7f'
        }
      }
    };

    Plotly.newPlot('bubble', bubble, layout, { responsive: true });
  });


    // Build a Pie Chart
    // Use slice() to grab the top 10 sample_value
  d3.json(`/samples/${sample}`).then((response) => {
    var pieInfo = [{
      values: response.sample_values.slice(0, 10),
      labels: response.otu_ids.slice(0, 10),
      hovertext: response.otu_labels.slice(0, 10),
      type: 'pie'
    }];

    var layout = {
      height: 500,
      width: 800,
      margin: {
        l: 10,
        r: 10,
        b: 10,
        t: 1,
        pad: 1
      }

    };

    Plotly.newPlot('pie', pieInfo, layout, { displayModeBar: false }, { responsive: true });
  });
};

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

// Initialize the dashboard
init();
