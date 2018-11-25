class Chart {
    
    constructor(category, id) {
        this.category = category; // name of property in result object
        this.id = id; // id of chart div in html file
    }
  
    drawPieChart() {
        let valueArr = [];
  
        for (let i = 0; i<results.length; i++) { // valueArr gets filled with the answers the subjects gave
            let usr = results[i]
            valueArr.push(usr[this.category]);
        }
        
        // Create object listing the number of times each answer possibility occurs
        var numberOfValue = {};
  
        valueArr.forEach(function(n) {  // Creates a property for each answer possibility with its amount as the value
            numberOfValue[n] = (numberOfValue[n] || 0) + 1; 
        });
  
        // 2-Dimensional array with each answer possibility and their number of occurence
        var rankedValues = [];
      
        for(let x in numberOfValue){
            rankedValues.push([x, numberOfValue[x]]) // x is the name of the answer
        }
  
        rankedValues.sort(function(a,b){ // Sort array descending by the amount an answer occurs
            return b[1] - a[1];
        }); 
  
        // We just want to display the top 5 recurring answers in the dataset, therefore we will further adjust
        var otherValues = 0; // This will become the number of answers given that were not part of the top 5
  
        for(let i=5; i<rankedValues.length; i++) { // Start from 5 and loop through rankedValues and add values to otherValues
            otherValues += rankedValues[i][1]; // We only want elements from the second column, which are the number of occurences
        }
  
        // Adjusting rankedValues to go into pie chart
        rankedValues.splice(4,rankedValues.length-5); // Remove every element but the first five
        rankedValues.unshift(['Name','Number']) // Add labels
        rankedValues.push(['Other',otherValues]); // Add total of other answers
  
        var data = google.visualization.arrayToDataTable(rankedValues); // Make pie chart
  
        var options = {}; // Special options, like animations, colors, etc. for the charts could go here
  
        var chart = new google.visualization.PieChart(document.getElementById(this.id)); // Reference to pie chart in .html file
        chart.draw(data, options);   
    }
    
    drawBarChart() {
        let valueArr = []
  
        for (let i = 0; i<results.length; i++) { // valueArr gets filled with the answers the subjects gave
            let usr = results[i]
            valueArr.push(usr[this.category]);
        }
  
        var numberOfValue = {};
  
        valueArr.forEach(function(n) {  
            numberOfValue[n] = (numberOfValue[n] || 0) + 1; 
        });
  
        var rankedValues = []; 
  
        for(let x in numberOfValue){
            rankedValues.push([x, numberOfValue[x]])
        }
  
        rankedValues.sort(function(a,b){
            return b[1] - a[1];
        });
  
        rankedValues.unshift(['Name','Number']) // Add labels, as required by Google Charts
  
        var data = google.visualization.arrayToDataTable(rankedValues); // Make chart
  
        var options = {};
  
        var chart = new google.visualization.BarChart(document.getElementById(this.id)); // Reference to bar chart in .html file
        chart.draw(data, options);
    }
}