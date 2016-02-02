/*!
 * SnackBar v0.1.0
 * http://polonel.com/Snackbar
 *
 * Copyright 2016 Chris Brame and other contributors
 * Released under the MIT license
 * https://github.com/polonel/SnackBar/blob/master/LICENSE
 */

(function (window, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory.apply(window);
    });
  }

  // Node.JS
  else if (typeof exports === 'object') {
    module.exports = factory.call(window);
  }

  // Browser
  else {
    window.SnackBar = factory.call(window);
  }
})(typeof global === 'object' ? global : this, function () {
  'use strict';

  var SnackBar = SnackBar || {};
  SnackBar.current = null;
  var $defaults = {
    text: 'Default',
    textColor: '#ffffff',
    showActionButton: true,
    actionText: 'Dismiss',
    actionTextColor: '#4caf50',
    backgroundColor: '#070B0E',

    duration: 5000,

    onActionClick: function (element) {
      element.style.opacity = 0;
    }
  };

  SnackBar.show = function ($options) {
    var options = Extend(true, $defaults, $options);

    if (SnackBar.current) {
      SnackBar.current.style.opacity = 0;
      setTimeout(function () {
        var $parent = this.parentElement;
        if ($parent) // possible null if too many/fast SnackBars
          $parent.removeChild(this);
      }.bind(SnackBar.current), 500);
    }

    SnackBar.snackbar = document.createElement('div');
    SnackBar.snackbar.className = 'paper-snackbar';
    SnackBar.snackbar.appendChild(document.createTextNode(options.text));
    SnackBar.snackbar.style.background = options.backgroundColor;
    SnackBar.snackbar.style.color = options.textColor;
    if (options.showActionButton) {
      var actionButton = document.createElement('button');
      actionButton.className = 'action';
      actionButton.innerHTML = options.actionText;
      actionButton.style.color = options.actionTextColor;
      actionButton.addEventListener('click', function () {
        SnackBar.snackbar.style.opacity = 0;
      });
      SnackBar.snackbar.appendChild(actionButton);
    }

    setTimeout(function () {
      if (SnackBar.current === this) {
        SnackBar.current.style.opacity = 0;
      }

    }.bind(SnackBar.snackbar), $defaults.duration);

    SnackBar.snackbar.addEventListener('transitionend', function (event, elapsed) {
      if (event.propertyName === 'opacity' && this.style.opacity === 0) {
        this.parentElement.removeChild(this);
        if (SnackBar.current === this) {
          SnackBar.current = null;
        }
      }
    }.bind(SnackBar.snackbar));

    SnackBar.current = SnackBar.snackbar;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(SnackBar.snackbar);
    var $bottom = getComputedStyle(SnackBar.snackbar).bottom;
    SnackBar.snackbar.style.bottom = '0';
    SnackBar.snackbar.style.opacity = 1;
    setTimeout(function () {
      document.body.style.overflow = 'auto';
    }, 500);
  };

  // Pure JS Extend
  // http://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
  var Extend = function () {

    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }

    var merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;

  };

  return SnackBar;
});