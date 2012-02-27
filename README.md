jQuery.AutoFill.js
=============

![](http://github.com/d1b1/jQuery.AutoFill.js/raw/master/demo/sample.png) 

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

### Custom Callbacks
You will want to write your own callbacks for the onKeyDown and OnKeyUp events. This plugin does not handle ajax callbacks for recommendations, yet. Best usage is to write a recommendation function that uses the user input to build the background input. 

Custom Input.OnKeyDown Event Function

    function customCallbackforKeyDown(event) { 
      console.log('IN Key down');
      if (event.keyCode == '9') { 
         $(this).val(  $('#hd_'+$(this).attr('id')).val() );
      }         
    }

Custom Input.OnKeyUp Event Function

    function customCallbackforKeyUp(event) { 
      console.log('In Custom Key Up: ' + event.keyCode + ' ' + $(this).attr('id') );

      /* Calls a function that uses regex to match and set a look ahead value.
      
         Example: Input: '1' will recommend 1:00 AM, 
         Example: Input: '12:' will recommdn 12:00 AM
      */
      var rec = recommendTime($(this).val());
    
      // Log the recommendation to the console to help. 
      console.log(rec);
      $('#hd_'+$(this).attr('id')).val(rec);     
    }

### Debugging
While testing or writing your recommendation code do not use alerts(), as they will cause issues with the input events. Use the console to see how your functions are working. Additionally add the `debug` flag to your input options. This will tell the plugin to output a bit more information.

### Options:

* `wrapper` : (Optional) Enter a class name for the wrapper div.
* `onkeydown` : (Optional) Define a custom callback for the input.onkeydown event.
* `onkeyup` : (Optional) Define a custom callback for the input.onkeyup event.
* `autodestroy` : (Default: false) This is an experimental feature that will destroy the autofill input fields when focus is lost. This ensures that the form will not post with extra fields.
* `debug` : (Optional) Lets the plugin dump out debug information to the console.

----
Demo attached. Test are coming along.