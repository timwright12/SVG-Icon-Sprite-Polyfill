/*! SVG Icon Sprite Polyfill for IE9+
 * Copyright 2015 Tim Wright
 * Licensed under MIT
 * https://github.com/timwright12/SVG-Icon-Sprite-Polyfill/
 * 
 * HTML Example Usage:
 * 
 * <svg role="img" aria-label="Golf clubs in a bag" class="icon icon-add-to-my-bag">
 *   <title>Golf clubs in a bag</title>
 *   <use xlink:href="img/svg-defs.svg#icon-add-to-my-bag"></use>
 * </svg>
 */

;(function (doc) {
  
  // Enable strict mode
  "use strict";
  
  // Local object for method references
  var App = {};
  
  // A proper namespace
  App.ns = "SVG Sprite Polyfill";
  
  // Ajax that isn't jquery?!?!
  App.ajax = function(loopObj, callback) {
    
    var request = new XMLHttpRequest();
    var response;
    
    request.open('GET', loopObj, true);
      
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {

          response = request.responseText;
          
          if (typeof callback === 'function') {
            callback.call(this, response);
          }
          
        } else {
          
          console.log('Error reaching the server');
        
        }
        
      };
      
      request.onerror = function() {
        
        console.log('Connection error');
      
      };
      
      request.send();
    
  }; // Ajax
  
  // Start the application
  App.init = function() {
    
    // Set up and cache variables
    var svgUse = doc.querySelectorAll("svg > use");
    var fragment = App.create('<div id="svg-poly-target" style="position: absolute;height: 0; width: 0;"></div>');
    var svgUrls = [];
    var attrArray = [];
    var url;
    var hash;
    var i;
    var j;
    var obj;
    var loopObj;
    var attr;
    
    // Insert the document fragment catch the contents of the SVG
    doc.body.insertBefore(fragment, doc.body.childNodes[0]);
    
    // Loop through all the svg <use> elements
    for (i = 0; i < svgUse.length; i = i + 1) {
      
      obj = svgUse[i];
      attr = obj.getAttribute('xlink:href');
      attrArray = attr.split('#');
      url = attrArray[0];
      hash = attrArray[1];
      
      if( url ) {
        svgUrls.push( url );
        obj.setAttribute('xlink:href', '#' + hash);
      }
      
    } // for
    
    // Remove duplicate URLs from the array so we're not making double Ajax calls
    svgUrls = svgUrls.filter( function( item, pos ) {
      return svgUrls.indexOf(item) == pos;
    });
    
    // Loop through all the URLs in the Array
    for (j = 0; j < svgUrls.length; j = j + 1) {
      
      loopObj = svgUrls[j];
      
      App.ajax( loopObj, function( response ) {
        doc.getElementById('svg-poly-target').innerHTML += response;
      });

    } // for

  }; // App.init
  
  // Helper function to create a document fragment
  
  App.create = function( htmlStr ) {

    var frag = doc.createDocumentFragment();
    var temp = doc.createElement('div');
    
    temp.innerHTML = htmlStr;
    
    while ( temp.firstChild ) {
      frag.appendChild(temp.firstChild);
    }
    
    return frag;

  };
  
  // Only use it in IE, this should be a feature detect, but... I'm not sure what the feature is to detect.
  
  /MSIE|Trident/.test(navigator.userAgent) && doc.addEventListener('DOMContentLoaded', function () {
  
    App.init();
  
  });

} )( this.document );
