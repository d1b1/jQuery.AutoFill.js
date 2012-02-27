
function recommendTime( time ) {

  //if (isValidTime(time)) { return time; }

  var pattern = new RegExp(/^(10|11|12|[1-9])$/);
  if (pattern.test(time))
     return time + ':00 AM';
     
  var pattern = new RegExp(/^(10|11|12|[1-9]):$/);
  if (pattern.test(time))
     return time + '00 AM';
    
  var pattern = new RegExp(/^(10|11|12|[1-9]):0$/);
  if (pattern.test(time))
     return time + '0 AM';
      
  var pattern = new RegExp(/^(10|11|12|[1-9]):[0-5][0-9]$/);
  if (pattern.test(time))
     return time + ' AM';

  var pattern = new RegExp(/^(10|11|12|[1-9]):[0-5][0-9]( A| P)$/);
  if (pattern.test(time))
     return time + 'M';
       
  return time;
}