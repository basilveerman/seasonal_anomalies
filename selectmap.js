1;3603;0cArray.prototype.rotate = (function() {
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

var today = new Date();
var month = today.getMonth() + 1;
var year = today.getFullYear();
var day = today.getDate();
var nowYear = year
var mfrac = month + day/32
if (mfrac < 1.125) { year=year-1;}
var season;
var seasonMinMonth;
var seasonMaxYear;

function populateYears(currentYear) {
  <!-- Populate year list -->
  for (i=currentYear;i>1971;i--){
    $('<option/>').val(i).html(i).appendTo('#yearList');
  };
}

function populateSeasons(currentMfrac) {
  <!-- Populate season list -->
  if (currentMfrac >= 1.125 && currentMfrac < 4.125) {
    seasonIndex=0;
  } else if (currentMfrac >= 4.125 && currentMfrac < 7.125) {
    seasonIndex=1;
  } else if (currentMfrac >=7.125 && currentMfrac < 10.125) {
    seasonIndex=2;
  } else if (currentMfrac >=10.125 || currentMfrac < 1.125) {
    seasonIndex=3;
  } else {
    seasonIndex=0;
  }

  var seasons = new Array("Winter", "Spring", "Summer", "Fall");
  seasons.rotate(seasonIndex);
  season = seasons[0]

  for (i=0;i<seasons.length;i++){
    $('<option/>').val(seasons[i]).html(seasons[i]).appendTo('#seasList');
  };
}

  
  
if (month == 12 || month == 1 || month == 2)
{
    season='Winter';
}
else if (month >= 3 && month <= 5) 
{
    season='Spring';
}
else if (month >=6 && month <= 8)
{
    season='Summer';
}
else
{
    season='Fall';
}

//var variable;

function getYear()
{
    var mylist=document.getElementById("yearList");
    year = mylist.options[mylist.selectedIndex].text;
}

function getSeason()
{
    var mylist=document.getElementById("seasList");
    season = mylist.options[mylist.selectedIndex].text;
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
