/*
 * ultis.js
 * Copyright (C) 2013  <@TJFDFS>
 *
 * Distributed under terms of the MIT license.
 */

define(['jquery', 'underscore'], function($, _){
    // Get matching keys of a json obj using given pattern string
    function objKeyMatching(obj, pattern) {
        var matches = [];
        if($.isArray(pattern)){
            $.each(pattern, function(index, value){
                var reg = new RegExp(value);
                var match = Object.keys(obj).map(function(key) {
                    if(reg.test(key)){
                        return key;
                    }else{
                        return false;
                    }
                }).filter(function(item){
                    return item !== false;
                });

                matches = matches.concat(match);
            });
        }else{
            var reg = new RegExp(pattern);
            matches = Object.keys(obj).map(function(key) {
                if(reg.test(key)){
                    return key;
                }else{
                    return false;
                }
            }).filter(function(item){
                return item !== false;
            });
        }

        return matches;
    }

    // Get selector string of given dom element
    function getSelector(ele){
        var selector = ele.tagName.toLowerCase();
        if(ele.id !== ""){
            selector += "#" + ele.id.trim();
        }
        if(ele.className !== ""){
            selector += "." + ele.className.trim().replace(/\s/g,'.');
        }
        return selector.toString();
    }


    // Get matching style to target
    function getMatchingStyle(target, styleObj) {
        var parents = [], pattern="";
        $.each($(target).parents(),function (key, value) {;
               parents.push(getSelector(value));
        });
        var targetWholeSelector = parents.reverse().join(' ') + ' ' + getSelector(target);  /* ! parents reverse here */
        console.log(targetWholeSelector);
        console.log("----------------");

        /*
         * match all selectors that contain tagName or className or id of target element, and match pseudo-element too
         */
        pattern = "((\\b" + target.tagName.toLowerCase() + ")+";
        if(target.className.trim() !== ""){
            pattern += "|(\\." + target.className.trim().replace(/\s/,')+|(\\.') + ")+";
        }
        if(target.id.trim() !== ""){
            pattern += "|(#" + target.id.trim() + ")+"; /* id should only have single value. style will not be applied if id has multiple values */
        }
        var regMatchTagClassId = new RegExp(pattern + ")\\s*");
        pattern += ")((\\s*)|(:\\w+)+)\\s*(((?=,)(.*))|$)";
        /*
         * pattern used here is like this: /((\bdiv)+|(\.read-more)+|(#abc)+)(\s*|(:\w+)+)\s*(((?=,)(.*))|$)/
         * This is not a perfect solution, cause this will fail when encounter these situations:
         * .read-morediv#abc , #abcdiv.read-more , div.read-morediv#abc, div#abcdiv.read-more
         * These will be filtered out when through allSelectorMatching later
         */
        var allSelectorMatching = objKeyMatching(styleObj, pattern);

        /* Get target selectors
         * filter allSelectorMatching that don't match target's parent dom tree
         */
        var finalMatched = allSelectorMatching.filter(function (item) {
            var selectorContainedTarget = [];
            $.each(item.split(','), function (index, value) {
                if(regMatchTagClassId.test(value)){
                    selectorContainedTarget.push(value);
                }
            });
            return selectorContainedTarget.filter(function (value) {
                var index = selectorContainedTarget.indexOf(value);
                var selectorArray = value.trim().split(' ');
                var len = selectorArray.length;
                var match = false;
                var last = selectorArray[len - 1];
                if(last.match(target.tagName.toLowerCase())){
                    /* second filter here: make sure tagName is at the beginning */
                    var trimEverythingExcerptTagName = last.substr(last.lastIndexOf(">") === -1 ? 0 : last.lastIndexOf(">") + 1);
                    trimEverythingExcerptTagName = trimEverythingExcerptTagName.substr(trimEverythingExcerptTagName.lastIndexOf("+") === -1 ? 0 :trimEverythingExcerptTagName.lastIndexOf("+") + 1);
                    trimEverythingExcerptTagName = trimEverythingExcerptTagName.substring(0, trimEverythingExcerptTagName.indexOf('.') === -1 ? trimEverythingExcerptTagName.length : trimEverythingExcerptTagName.indexOf('.'));
                    trimEverythingExcerptTagName = trimEverythingExcerptTagName.substring(0 ,trimEverythingExcerptTagName.indexOf('#') === -1 ? trimEverythingExcerptTagName.length : trimEverythingExcerptTagName.indexOf('#'));

                    if(trimEverythingExcerptTagName.trim().search(new RegExp("\\b" + target.tagName.toLowerCase() + "\\b")) !== 0){
                        return match;
                    }
                }
                if(last.indexOf('>') !== -1){
                    var pop = selectorArray.pop();
                    // use lastindexof in case of multiple direct parent
                    $.each($(selectorArray.join(' ') + " " + last.substring(0, last.lastIndexOf('>'))), function (index, value) {
                        $.each($(parents.join(' ')), function(i,parent){
                            if(value === parent && getSelector(value) === getSelector($(target).parent()[0])){
                                match = true;
                                return false;
                            }
                        });
                        if(match) return false;
                    });
                    if(!match){
                        return match;
                    }
                    selectorArray.push(pop);
                }else if(last.indexOf('+') !== -1){
                    $(targetWholeSelector), function (index, value) {
                        if($(value).siblings(last.substring(0, last.indexOf('+'))).length > 0){
                            match = true;
                            return false;
                        }
                    }
                    if(!match){
                        return match;
                    }
                }
                if(len === 1) return true;
                var matchIndex = -1;
                for(var i = len -2; i > -1 && matchIndex > -2; i--){
                    var atomSelectors = selectorArray[i].replace(/\./," \.").replace(/#/, " #").trim().split(" ");
                    $.each(parents, function (index, parent) {
                        if(atomSelectors.filter(function(value){
                            return parent.indexOf(value) !== -1;
                        }).length !== atomSelectors.length){
                            // all atomSelector should be matched by current parent selector
                            matchIndex = -2;
                        }else{
                            // current matchIndex should larger than previous
                            matchIndex < index ? matchIndex = index : matchIndex = -2 ;
                            // Terminate when find a match, store matchIndex
                            return false;
                        }
                    })
                }
                matchIndex > -1 ? match = true : match = false;
                return match;
            }).length > 0;
        });

        var matchedObj = {}
        $.each(finalMatched,function(index, key){;
            matchedObj[key] = styleObj[key];
        });
        return matchedObj;
    }


    // Get element from point of mouse
    function getElementFromPoint(mouseX,mouseY) {
        if(!document.elementFromPoint) return null;
        if(!check) {
            var sl;
            if((sl = $(document).scrollTop()) >0)
                {
                    isRelative = (document.elementFromPoint(0, sl + $(window).height() -1) == null);
                }
                else if((sl = $(document).scrollLeft()) >0)
                    {
                        isRelative = (document.elementFromPoint(sl + $(window).width() -1, 0) == null);
                    }
                    check = (sl>0);
        }

        if(!isRelative) {
            x += $(document).scrollLeft();
            y += $(document).scrollTop();
        }

        return document.elementFromPoint(x,y);
    }

    // Get dom element tree
    function getDomTreeOfTargetNode(target, parentLevel){
        var parents = [], childs = [];
        if($(target).parents().length){
            $.each($(target).parents().splice(0,parentLevel),function (key, value) {;
                   parents.push(getSelector(value));
            });
        }
        if($(target).children().length){
            $.each($(target).children(),function (key, value) {;
                   childs.push(getSelector(value));
            });
        }

        return {
            "parents": parents.reverse(),
            "current": getSelector(target),
            "childs": childs
        };
    }

    /*  Style mapping function
     *  args: Array, json, number(used to make file's privilege)
     *  return: json
     */
    function createStyleMapping(fileQueue, styleMapping, givenPrivilege) {
        var styleMapping = styleMapping || {};
        if(!$.isArray(fileQueue)){
            return false;
        }
        $.each(fileQueue, function (index, file) {
            var privilege;
            if(givenPrivilege){
                privilege = givenPrivilege;
            }else{
                privilege = index + 1;
            }

            $.ajax({
                url: file,
                async: false
            }).success(function (styles) {
                // replace EOL with whitespace
                styles = styles.replace(/\n/g,' ')
                // remove comments
                styles = styles.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/g,'');
                // remove @keyframes
                styles = styles.replace(/@[^@]*?}\s*}/g, '');
                var importCss= styles.match(/@import url\([^)]*\);/g);
                if(importCss !== null){
                    var stylePath = file.substring(0, file.lastIndexOf('/')+1);
                    $.each(importCss, function(index, value){
                        value = value.substring(value.indexOf('(')+1, value.indexOf(')')).replace(/'|"/g,"");
                        /* Only consider less than 10 file will be import in single css file */
                        styleMapping = createStyleMapping([stylePath + value], styleMapping, parseFloat((privilege - (9 - index) * 0.1).toFixed(1)));
                    });
                    styles = styles.replace(/@import url\([^)]*\);/g,'');
                }
                // remove import
                var stylearr = styles.match(/[^{]*{[^}]*}/g);
                $.each(stylearr, function(index,value){
                    var index = value.indexOf('{');
                    var selector = (value.substr(0,index)).trim();
                    var style = (value.substring(index+1,value.indexOf('}')-1)).trim();
                    var filemapping = {};
                    filemapping[file] = style;
                    filemapping['style'] = {};
                    style.split(';').forEach(function(v, i){
                        if (v === "") return;
                        var css = v.trim().split(':');
                        filemapping['style'][css[0].trim()] = css[1].trim();
                    });
                    filemapping['privilege'] = privilege;
                    /* this definition's order in this css file */
                    filemapping['order'] = index;
                    if(styleMapping[selector]){
                        styleMapping[selector].push(filemapping);
                    }else{
                        styleMapping[selector] = [filemapping];
                    }
                });
                fileQueue = jQuery.grep(fileQueue, function(value){
                    return value != file;
                })
            })
            .error(function(){
                if(!confirm("Can't fetch file:" + file + "\nAbort this file?")) {
                    styleMapping = createStyleMapping([file], styleMapping, privilege);
                }
            });
        });

        return styleMapping;
    }

    /*
     * Sort object by keys
     * @param: Object
     * @return: Object
     * Reqirement: Items of object must have same structure
     * Object is like this:
     * {
     * 'key1':value1,
     * 'key2': value2
     * }
     */
    function objSortByKey(obj) {
        var keys = [];
        var sortedObj = {};
        for(var key in obj){
            keys.push(key);
        }
        keys.sort().forEach(function(key){
            sortedObj[key] = obj[key];
        })
        return sortedObj;
    }
    /*
     * Sort object by values
     * @param: Object
     * @return: Object
     * Reqirement: Items of object must have same structure
     * values must be sortable type: number or string
     * Object is like this:
     * {
     * 'key1':value1,
     * 'key2': value2
     * }
     */
    function objSortByValue(obj, reverse) {
        var toArr = _.map(obj, function(v,k){
            return [k,v];
        });
        var sortedArr = _.sortBy(toArr, function(v){
            return v[1];
        });
        if(reverse)
            sortedArr.reverse();
        var sortedObj = {};
        _.each(sortedArr, function(v){;
               sortedObj[v[0]] = v[1];
        });
        return sortedObj;
    }
    /*
     * Sort object using given keys
     * @param: Object, Array
     * @return: Object
     * Reqirement: Items of object must have same structure
     * values of given key must be sortable type: number or string
     * Object is like this:
     * {
     * 'key1':{'key':value},
     * 'key2': {'key', value}
     * }
     */
    function objDeepLvSort(obj, keys) {
    }
    /*
     * Sort object using given keys
     * @param: Array, Array, Boolean
     * @return: Object
     * Reqirement: Items of object must have same structure
     * values of given key must be sortable type: number or string
     */
    function sortObjArray(arr, keys, reverse) {
        console.log(arr);
        if(!reverse)
            reverse = false;

    }

    /*
     * Exchange key and value of obj
     * @param: Object, Boolean
     * @return: Object
     * Reqirement: typeof value must be number or string, otherwise, return original obj
     * Description: if there are some keys have same value and override is true, they will be replaced by new key after.
     */
    function exchangeKeyValue(obj, override) {
        var rObj = {};
        var override = override || true;
        for(var key in obj){
            var val = obj[key];
            var typeofVal = $.type(val);
            if(typeofVal !== "number" && typeofVal !== "string")
                return false;
            val = val.toString().trim();
            if(override){
                rObj[val] = key;
            }else{
                if(rObj.hasOwnProperty(val)){
                    rObj[val + " "] = key;
                }else{
                    rObj[val] = key;
                }
            }
        }
        return rObj;
    }

    /* Convert obj to Array
     * param: object
     * return: array
     */
    function objToArr(obj){
        var arr = [];
        _.each(obj, function(v, k){
            var item = {};
            item[k] = v;
            arr.push(item);
        });
        return arr;
    }

    return {
        "objKeyMatching": objKeyMatching,
        "getSelector": getSelector,
        "getMatchingStyle": getMatchingStyle,
        "getElementFromPoint": getElementFromPoint,
        "getDomTreeOfTargetNode": getDomTreeOfTargetNode,
        "createStyleMapping": createStyleMapping,
        "sortObjArray": sortObjArray,
        "exchangeKeyValue": exchangeKeyValue,
        "objToArr": objToArr
    };
});


