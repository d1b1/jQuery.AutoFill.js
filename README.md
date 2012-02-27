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

### Options:

* wrapper : (Optional) Enter a class name for the wrapper div.
* onkeydown : (Optional) Define a custom callback for the input.onkeydown event.
* onkeyup : (Optional) Define a custom callback for the input.onkeyup event.
* autodestroy : (Default: false) This is an experimental feature that will destroy the autofill input fields when focus is lost. This ensures that the form will not post with extra fields.

----
Demo attached. Test are coming along.