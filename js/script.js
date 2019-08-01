$(document).ready(function(){
  const reportedContainer = $('#reportedContainer');
  const measuredContainer = $('#measuredContainer');

  getReportedQuakeData = () => {
    $.ajax({
      url: 'https://api.geonet.org.nz/intensity?type=reported',
      type: 'GET',
      dataType: 'json',
      success: function(dataFromJSON){
        reportedContainer.empty();
        if(dataFromJSON.features.length === 0){
          reportedContainer.append(`There hasn't been any reported earthquakes`);
        } else {
          dataFromJSON.features.map(function(quake){
            reportedContainer.append(`<li>${quake.geometry.coordinates[0]}, ${quake.geometry.coordinates[1]} - MMI #${quake.properties.mmi}</li>`)
          })
        }
      },
      error: function(){
        console.log('something has gone wrong');
      }
    })
  }

  getMeasuredQuakeData = () => {
    $.ajax({
      url: 'https://api.geonet.org.nz/intensity?type=measured',
      type: 'GET',
      dataType: 'json',
      success: function(dataFromJSON){
        measuredContainer.empty();
        if(dataFromJSON.features.length === 0){
          measuredContainer.append(`There hasn't been any measured earthquakes`);
        } else {
          dataFromJSON.features.map(function(quake){
            measuredContainer.append(`<li>${quake.geometry.coordinates[0]}, ${quake.geometry.coordinates[1]} - MMI #${quake.properties.mmi}</li>`)
          })
        }
      },
      error: function(){
        console.log('something has gone wrong');
      }
    })
  }


  getQuakeData = (type, container) => {
    $.ajax({
      url: `https://api.geonet.org.nz/intensity?type=${type}`,
      type: 'GET',
      dataType: 'json',
      success: function(dataFromJSON){
        container.empty();
        if(dataFromJSON.features.length === 0){
          container.append(`There hasn't been any ${type} earthquakes`);
        } else {
          dataFromJSON.features.map(function(quake){
            container.append(`<li>${quake.geometry.coordinates[0]}, ${quake.geometry.coordinates[1]} - MMI #${quake.properties.mmi}</li>`)
          })
        }
      },
      error: function(){
        console.log('something has gone wrong');
      }
    })
  }



  // getReportedQuakeData();
  // getMeasuredQuakeData();
  setInterval(function(){
    console.log('tick');
    getQuakeData('reported', reportedContainer);
    getQuakeData('measured', measuredContainer);
    // getReportedQuakeData();
    // getMeasuredQuakeData();
  }, 10000);



});
