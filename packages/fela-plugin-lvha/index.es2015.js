var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

babelHelpers;

/*  weak */
var precedence = {
  ':link': 0,
  ':visited': 1,
  ':hover': 2,
  ':focus': 3,
  ':active': 4
};

var pseudoClasses = Object.keys(precedence);

function LVHA(style) {
  var pseudoList = [];

  for (var property in style) {
    if (precedence[property]) {
      pseudoList[precedence[property]] = style[property];
      delete style[property];
    }
  }

  for (var i = 0, len = pseudoList.length; i < len; ++i) {
    var pseudoStyle = pseudoList[i];

    if (pseudoStyle) {
      style[pseudoClasses[i]] = pseudoStyle;
    }
  }

  return style;
}

var LVHA$1 = (function () {
  return LVHA;
});

export default LVHA$1;