# Belly Button Biodiversity

![](Belly_Button_Diversity/static/images/bacteria.jpg)

In this assignment, I built an interactive dashboard to explore the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).

### Technologies Used

This is a full stack assignment using:

1. SQLite database
2. Plotly.js
3. Heroku

### Requirements

1. Use SQLite database and Plotly.js to build interactive charts for a dashboard.

2. Create a PIE chart that uses data from your samples route to display the top 10 samples.

3. Create a Bubble Chart that uses data from your samples route to display each sample.

4. Display the sample metadata from the route.

5. Update all of the plots any time that a new sample is selected.

6. Deploy Flask app to Heroku.

### Dashboard

The dashboard can by viewed at  https://plotlygene.herokuapp.com/

This project also functions by performing the following:

1. Download the repository.
2. Run the python app.py file.
3. Open the running local server in a browser.  
4. Select a sample from the dropdown list on the left.  The "Sample MetaData" provides information about the person owning belly button sample.  The pie chart shows the diversity of the belly sample.  Hover over the pie chart to see the bacteria. 
5. Scroll down to see the bubble chart.  (This chart doesn't tell much of a story, but it was the assignment.) 
6. I've included a screenshot of the dashboard below.

![](Belly_Button_Diversity\static\images\pieChart.png)
![](Belly_Button_Diversity\static\images\bubbleChart.png)
