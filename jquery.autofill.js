/*!
 * jQuery.AutoFill.js: Input Autofill feature - v0.1 2/27/2012
 * 
 * Copyright (c) 2012 Stephan Smith
 *
 * Source: http://github.com/d1b1/jQuery.AutoFill.js
 * Demo:   http://autofill.happypath.ws/
 *
 * Licensed under the MIT license.
 *
 * v0.0 - Not 100% ready for production. Still in testing.
 *
 * v0.1 - Refactored to use the input siblings in the wrapper div, in place 
 *        of IDs. This is cleaner and does not generate more IDs the needed.
 *        Siblings are defined by class 'Autofill'.
 *
 *      - Added a data element to prevent the same element from getting 
 *        setup more then once.
 */
 
(function( $ ){

  var methods = {
     init : function( options ) {

       var settings = $.extend( {
          onkeyup     : '',
          onkeydown   : '',
          wrapper     : '',
          inputclass  : 'primary_input', // Class for the input element.
          debug       : false,
          onrender    : false,
          ignores     : '',      // Regex pattern of strings for the input element to ignore.
          recommender : ''       // Named function to populate the autofill element.
        }, options);
    
       return this.each(function(){

          var $this = $(this),
              data = $this.data('autofiller')

          if ( !data ) {
          
            $(this).data('autofiller', {
               target : $this,
               settings : settings
            });
           
            var wrap = $('<div>');
            
            if (settings.wrapper) {
              wrap.attr({ class: settings.wrapper });
            } else {
              wrap.attr({ style : 'position: relative; padding: 0; height: 18px; border: 0;' });
            }
            
            // Attach after the current element in the DOM.
            $this.after(wrap);
  
            $('<input>').attr({ 
                type:  'text', 
                name:  'hd_' + $this.attr('name'), 
                class: 'autofill hidden_input' 
            }).appendTo(wrap);
            
            $this.attr('class', 'autofiller primary_input').appendTo(wrap);
   
            if (settings.inputclass) {
               $this.attr('class', settings.inputclass);
            }
            
            // If we have a defined event callback for onKeyDown use it
            // otherwise use a default that uses the tab characters to
            // update the primary.
  
            if (settings.onkeydown) {
              $this.bind('keydown', eval(settings.onkeydown) );
            } else {
              if (settings.debug) { console.log($(this).attr('name') + ' : Using default keydown function.'); }
              
              $this.keydown(function() {
                if (event.keyCode == '9') { 
                  $(this).val(  $(this).siblings('.autofill').val() );
                }
              });
            }
        
            // If we have a defined event callback for the onKeyUp use it
            // othereise use a defaulot that uses the date default.
            
            if (settings.onkeyup) {
              $this.bind('keyup', eval(settings.onkeyup) );
            } else {
              if (settings.debug) { console.log($(this).attr('name')+' : Using default keyUp function.'); }
              
              $this.keyup(function() {
              
                // If the value is a or p then force to upper case.
                if (event.keyCode=='65' || event.keyCode=='80') {
                  $(this).val( $(this).val().toUpperCase() );
                  return;
                }
                
                // Only fire the recommendor when defined.
                if (settings.recommender) {
                  var rec = recommendTime( $(this).val() );
                  
                  $(this).siblings('.autofill').val(rec);
                  
                  if (settings.debug) { 
                    console.log('Recommend:' + $(this).siblings('autofill').attr('name').val() ); 
                  }
                } else {
                  console.log('No recommendation function defined.');
                }
  
              });
            }
  
            // Only force the keyup when the settings value is true. It is set to false by default.
            if (settings.onrender) {
              $this.keyup();
            }
            
         } else {
           console.log('Error: Can init the same element more then once');
           // End if ! data statement
         }
          
       });
     },

     destroy : function( ) {

       return this.each(function(){

         // Remove the onKeyDown, OnKeyUp form the inputs
         $(window).unbind('.autofiller');
         
         // TODO: retach any other events that might be removed.
         //$('#hd_'+$(this).attr('id')).remove();
         $(this).siblings('.autofill').remove();

         // TODO: Remove the data. $this.removeData('autofiller');
       })

     }
  };

  $.fn.autofill = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.AutoFiller' );
    }    
  };

})( jQuery );