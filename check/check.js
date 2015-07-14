var Check = {
  timer : null,
  hasExtension : false, 
  urlParams : null,


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // xLabs API
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  onXlabsReady : function() {
    console.log( "xLabs OK." );
    Graphics.hideMessage();
    Check.hasExtension = true;
    xLabs.setConfig( "system.mode", "learning" );
  },
  onXlabsState : function() {
    //console.log( "on xLabs state." );
    Errors.update();
    Camera.show();
    debugError = Graphics.showDebug();
    if( debugError ) {
      Check.timer.reset(); // hold it in this state until after x seconds after fixing it
      Graphics.hideMessage();
    }
    else { // no errors
      var timeElapsed = Check.timer.hasElapsed();
      if( timeElapsed ) {
        // show the button to hide the persistent error mode:
        if( Check.urlParams['next'] ) {
          var help = "Camera image OK";
        }
        else {
          var help = "Camera image OK: Try gaze-tracking demo @ www.reddit.com";
        }
        var button = "Continue";
        Graphics.showMessage( help, button, false );//, "70%" );
      }
    }
  },
  onXlabsIdPath : function( id, path ) {
  },

  onMessageButtonClick : function() {
    if( Check.urlParams['next'] ) {
      window.location = Check.urlParams['next']; // navigate to user degined location
    }
    else if( Check.hasExtension ) {
      window.location = "http://www.reddit.com"; // navigate to demos
    }
    else {
      window.location = "http://www.xlabsgaze.com/extension"; // navigate to demos
    }
  },

  setup : function() {

    Check.urlParams = Util.getJsonFromUrl(true)
    // console.log( Check.urlParams )
    if( Check.urlParams['next'] ) {
      console.log("After camera check, will redirect you to: " + Check.urlParams['next'] )
    }


    Check.timer = new Timer();
    Check.timer.setDuration( 2000 );

    Errors.setup();

    window.addEventListener( "beforeunload", function() {
      //xLabs.setConfig( "system.mode", "off" ); // leave it running
    });

    xLabs.setToken( "4sds34k5d45pn4" );
    xLabs.setup( Check.onXlabsReady, Check.onXlabsState, Check.onXlabsIdPath );
    
    var help = "You need to install xLabs' browser extension to use this page.";
    var button = "Get xLabs";
    Graphics.showMessage( help, button, true );
  }
};
