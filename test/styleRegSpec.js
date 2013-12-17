/*
 * styleRegTest.js
 * Copyright (C) 2013  <@TJFDFS>
 *
 * Distributed under terms of the MIT license.
 */

describe("style regular matching test", function(){
    // Test "div#abc.read-more"
    var pattern = "((\\bdiv)+|(\\.read-more)+|(#abc)+)(\\s*|(:\\w+)+)\\s*(((?=,)(.*))|$)";

    var reg = new RegExp(pattern);
    console.log(reg);

    var matched = [
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
        "#abc:hover",
        "div:hover",
        "div.read-more#abc:hover",

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

    ];
    var unmatched = [
        "",
        " ",
        ".read-morediv",
        "#abcdiv",
        ".read-more#abcdiv",
        ".read-morediv#abc",
        "#abc.read-morediv",
        "#abcdiv.read-more",
        "div.read-morediv#abc",
        "div#abcdiv.read-more",
        "div.read-morediv",
        "div#abcdiv",
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

        ".read-mores:hover",
        ".read-more:hover .extra-error",
        "#abc:hover .extra-error",
        "div:hover .extra-error",
        "div.read-more#abc:hover .extra-error",
        ".read-more:hover>.extra-error",
        "#abc:hover>.extra-error",
        "div:hover>.extra-error",
        "div.read-more#abc:hover>.extra-error",
        ".read-more:hover+.extra-error",
        "#abc:hover+.extra-error",
        "div:hover+.extra-error",
        "div.read-more#abc:hover+.extra-error",

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

    function testMatched(style){
        it("'" + style + "' should be matched", function(){
            expect(reg.test(style)).toEqual(true);
        });
    }

    function testUnMatched(style){
        it("'" + style + "' should be unmatched", function(){
            expect(reg.test(style)).toEqual(false);
        });
    }


    for(var i=0; i<matched.length; i++){
        testMatched(matched[i]);
    }
    for(var i=0; i<unmatched.length; i++){
        testUnMatched(unmatched[i]);
    }
});

