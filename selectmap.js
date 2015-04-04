Array.prototype.rotate = (function() {
    // save references to array functions to make lookup faster
    var push = Array.prototype.push,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0, // convert to uint
            count = count >> 0; // convert to int

        // convert count to value in range [0, len[
        count = ((count % len) + len) % len;

        // use splice.call() instead of this.splice() to make function generic
        push.apply(this, splice.call(this, 0, count));
        return this;
    };
})();

function populateYears(year) {
  <!-- Populate year list -->
  for (i=year;i>1971;i--){
    $('<option/>').val(i).html(i).appendTo('#yearList');
  };
}

function populateSeasons(season) {
  <!-- Populate season list -->
  var seasons = new Array("Winter", "Spring", "Summer", "Fall");
  seasons.rotate(seasons.indexOf(season));
  for (i=0;i<seasons.length;i++){
    $('<option/>').val(seasons[i]).html(seasons[i]).appendTo('#seasList');
  };
}

function getSeasonFromMonth(month) {
  if (month == 11 || month == 0 || month == 1)
  {
      season='Winter';
  }
  else if (month >= 2 && month <= 4)
  {
      season='Spring';
  }
  else if (month >=5 && month <= 7)
  {
      season='Summer';
  }
  else
  {
      season='Fall';
  }
  return season;
}

function getSeasonMinMonth() 
{
    if (season == 'Winter') 
    {
        seasonMinMonth = 1;
        seasonMaxYear = nowYear + 1;
    }
    else if (season == 'Spring') 
    {
        seasonMinMonth = 3;
        seasonMaxYear = nowYear;
    }
    else if (season == 'Summer') 
    {
        seasonMinMonth=6;
        seasonMaxYear = nowYear;
    }
    else 
    {
        seasonMinMonth=9;
        seasonMaxYear = nowYear;
    }
}

function openURL()
{
    getSeasonMinMonth();
    if (season == null || year == null) {
        var win=window.open('http://www.pacificclimate.org/~fanslow/Files/SCRs/index.html', '_self');
    }
    else if (month < seasonMinMonth && year >= seasonMaxYear )
    {
        alert('Anomaly maps for ' + season + ' ' + year + ' not yet available')
    }
    else {
        var win=window.open('http://www.pacificclimate.org/~fanslow/Files/SCRs/map.php?season=' + season + '&year=' + year, '_self');
        win.focus();
    }
}
