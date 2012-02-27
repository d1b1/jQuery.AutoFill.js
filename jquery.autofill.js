(function( $ ){

  var methods = {
     init : function( options ) {

       var settings = $.extend( {
          onkeyup   : '',
          onkeydown : '',
          wrapper   : '',
          debug     : false,
          onrender  : false
        }, options);
    
       return this.each(function(){

          var $this = $(this);

          var wrap = $('<div>');
          if (settings.wrapper) {
            wrap.attr({ class: settings.wrapper });
          } else {
            wrap.attr({ style : 'position: relative; padding: 0; height: 18px; border: 0;' });
          }
          
          // Attach after the current element in the DOM.
          $this.after(wrap);

          $('<input>').attr({ type:'', id:'hd_'+$this.attr('id'), name:'test', class:'hidden_input' }).appendTo(wrap);
          
          $this.attr('class', 'primary_input autofiller').appendTo(wrap);
 
          // If we have a defined event callback for onKeyDown use it
          // otherwise use a default that uses the tab characters to
          // update the primary.

          if (settings.onkeydown) {
            $this.bind('keydown', eval(settings.onkeydown) );
          } else {
            if (settings.debug) { console.log($(this).attr('id')+' : Using default keydown function.'); }
            
            $this.keydown(function() {
              if (event.keyCode == '9') { 
                $(this).val(  $('#hd_'+$(this).attr('id')).val() );
              }
            });
          }
      
          // If we have a defined event callback for the onKeyUp use it
          // othereise use a defaulot that uses the date default.
          
          if (settings.onkeyup) {
            $this.bind('keyup', eval(settings.onkeyup) );
          } else {
            if (settings.debug) { console.log($(this).attr('id')+' : Using default keyUp function.'); }
            
            $this.keyup(function() {
              // If the value is a or p then force to upper case.
              if (event.keyCode=='65' || event.keyCode=='80') {
                $(this).val( $(this).val().toUpperCase() );
                return;
              }
              
              var rec = recommendTime($(this).val());

              $('#hd_'+$(this).attr('id')).val(rec);
              
              if (settings.debug) { console.log('Found ' + $('#hd_'+$(this).attr('id')).val() ); }
            });
          }

          // Only force the keyup when the settings value is true. It is set to false by default.
          if (settings.onrender) {
            $this.keyup();
          }
  
       });
     },

     destroy : function( ) {

       return this.each(function(){

         var $this = $(this);
         
         // Remove the onKeyDown, OnKeyUp form the inputs
         $(window).unbind('.autofiller');
         
         // ToDo: retach any other events that might be removed.
         $('#hd_'+$this.attr('id')).remove();

         // data = $this.data('tooltip');

         //data.tooltip.remove();
         //$this.removeData('tooltip');
       })

     }
  };

  $.fn.autofill = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.AutoFill' );
    }    
  
  };

})( jQuery );