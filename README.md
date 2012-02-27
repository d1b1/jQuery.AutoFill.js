jQuery.AutoFill.js
=============

This project is a plugin for jQuery that makes simple form inputs into google-like autofill features that we all see on the google search page.

### Simple:
$('#start_time_1').autofill();

### With Custom Class and Callbacks:
$('#start_time_2').autofill({
  onkeydown : 'customCallbackforKeyDown',
  onkeyup   : 'customCallbackforKeyUp',
  wrapper   : 'mywrapper',
  onrender  : true
});

Demo attached.