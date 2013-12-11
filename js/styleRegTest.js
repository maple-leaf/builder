/*
 * styleRegTest.js
 * Copyright (C) 2013  <@TJFDFS>
 *
 * Distributed under terms of the MIT license.
 */

var a = [
    "div",
    "ul, div",
    "div , li , ul",
    ".read-more",
    "#abc",
    ".read-more#abc",
    "div.read-more",
    "div#abc",
    "div.read-more#abc",
    "div#abc.read-more",

    ".read-more:hover",

    "#posts .entry-buttons div, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons div",
    "#posts .entry-buttons, #posts .entry-buttons div, .somethingelse .others",

    "#posts .entry-buttons+div, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+div",
    "#posts .entry-buttons, #posts .entry-buttons+div, .somethingelse .others",

    "#posts .entry-buttons>div, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>div",
    "#posts .entry-buttons, #posts .entry-buttons>div, .somethingelse .others",

    "#posts .entry-buttons .read-more, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons .read-more",
    "#posts .entry-buttons, #posts .entry-buttons .read-more, .somethingelse .others",
    "#posts .entry-buttons #abc, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons #abc",
    "#posts .entry-buttons, #posts .entry-buttons #abc, .somethingelse .others",
    "#posts .entry-buttons #abc.read-more, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons #abc.read-more",
    "#posts .entry-buttons, #posts .entry-buttons #abc.read-more, .somethingelse .others",
    "#posts .entry-buttons .read-more#abc, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons .read-more#abc",
    "#posts .entry-buttons, #posts .entry-buttons .read-more#abc, .somethingelse .others",

    "#posts .entry-buttons+.read-more, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+.read-more",
    "#posts .entry-buttons, #posts .entry-buttons+.read-more, .somethingelse .others",
    "#posts .entry-buttons+#abc, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+#abc",
    "#posts .entry-buttons, #posts .entry-buttons+#abc, .somethingelse .others",
    "#posts .entry-buttons+#abc.read-more, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+#abc.read-more",
    "#posts .entry-buttons, #posts .entry-buttons+#abc.read-more, .somethingelse .others",
    "#posts .entry-buttons+.read-more#abc, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+.read-more#abc",
    "#posts .entry-buttons, #posts .entry-buttons+.read-more#abc, .somethingelse .others",

    "#posts .entry-buttons>.read-more, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>.read-more",
    "#posts .entry-buttons, #posts .entry-buttons>.read-more, .somethingelse .others",
    "#posts .entry-buttons>#abc, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>#abc",
    "#posts .entry-buttons, #posts .entry-buttons>#abc, .somethingelse .others",
    "#posts .entry-buttons>#abc.read-more, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>#abc.read-more",
    "#posts .entry-buttons, #posts .entry-buttons>#abc.read-more, .somethingelse .others",
    "#posts .entry-buttons>.read-more#abc, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>.read-more#abc",
    "#posts .entry-buttons, #posts .entry-buttons>.read-more#abc, .somethingelse .others",

    "log false",

    // false
    "",
    " ",
    "div .extra-error",
    "ul, div .extra-error",
    "div .extra-error , li , ul",
    ".zoom-it",
    ".read-more .extra-error",
    "#abc .extra-error",
    ".read-more#abc .extra-error",
    "div.read-more .extra-error",
    "div#abc .extra-error",
    "div.read-more#abc .extra-error",
    "div#abc.read-more .extra-error",
    ".read-more:hover .extra-error",

    ".read-more+.extra-error",
    "#abc+.extra-error",
    ".read-more#abc+.extra-error",
    "div.read-more+.extra-error",
    "div#abc+.extra-error",
    "div.read-more#abc+.extra-error",
    "div#abc.read-more+.extra-error",
    ".read-more:hover+.extra-error",

    ".read-more>.extra-error",
    "#abc>.extra-error",
    ".read-more#abc>.extra-error",
    "div.read-more>.extra-error",
    "div#abc>.extra-error",
    "div.read-more#abc>.extra-error",
    "div#abc.read-more>.extra-error",
    ".read-more:hover>.extra-error",

    "#posts .entry-buttons div .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons div .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons div .extra-error, .somethingelse .others",

    "#posts .entry-buttons+div .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+div .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons+div .extra-error, .somethingelse .others",

    "#posts .entry-buttons>div .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>div .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons>div .extra-error, .somethingelse .others",

    "#posts .entry-buttons .read-more .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons .read-more .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons .read-more .extra-error, .somethingelse .others",
    "#posts .entry-buttons #abc .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons #abc .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons #abc .extra-error, .somethingelse .others",
    "#posts .entry-buttons #abc.read-more .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons #abc.read-more .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons #abc.read-more .extra-error, .somethingelse .others",
    "#posts .entry-buttons .read-more#abc .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons .read-more#abc .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons .read-more#abc .extra-error, .somethingelse .others",

    "#posts .entry-buttons+.read-more .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+.read-more .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons+.read-more .extra-error, .somethingelse .others",
    "#posts .entry-buttons+#abc .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+#abc .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons+#abc .extra-error, .somethingelse .others",
    "#posts .entry-buttons+#abc.read-more .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+#abc.read-more .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons+#abc.read-more .extra-error, .somethingelse .others",
    "#posts .entry-buttons+.read-more#abc .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons+.read-more#abc .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons+.read-more#abc .extra-error, .somethingelse .others",

    "#posts .entry-buttons>.read-more .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>.read-more .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons>.read-more .extra-error, .somethingelse .others",
    "#posts .entry-buttons>#abc .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>#abc .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons>#abc .extra-error, .somethingelse .others",
    "#posts .entry-buttons>#abc.read-more .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>#abc.read-more .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons>#abc.read-more .extra-error, .somethingelse .others",
    "#posts .entry-buttons>.read-more#abc .extra-error, #posts .entry-buttons .zoom-it",
    "#posts .entry-buttons, #posts .entry-buttons>.read-more#abc .extra-error",
    "#posts .entry-buttons, #posts .entry-buttons>.read-more#abc .extra-error, .somethingelse .others",
];

// Test "div#abc.read-more"
var pattern = "(div)+|(\\.read-more)+|(#abc)+";

var reg = new RegExp(pattern);

console.log(reg);
for(var i=0; i<a.length; i++){
    if(a[i] != "log false"){
        console.log(a[i]);
        reg.test(a[i])?console.log("true"):console.error("false");
        console.log("-------");
    }else{
        console.log("================== Should be False");
    }
}
