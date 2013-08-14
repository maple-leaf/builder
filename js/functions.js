/*
 * Function: get recursive items of jquery.contextMenu
 * Paras: parent object name , count
 * Return: json format data of items or parent object name
 */
function getChildItems(parent, count, inheritance) {
  var items = {};
  var itemcount = 1;
  var item = "child";
  var jsonString = "{";
  items['name'] = parent;
  var wholeSelector = inheritance + ' ' + parent;
  var last = {};
  if(count.length === 1) {
    last['root' + count] = {'name': 'parent'};
  }else{
    last[item + count] = {'name': 'parent'};
  }
  var itemsArray = [];
  itemsArray[0] = last;
  itemsArray[1] = {'seperator': '-----'};
  var startTime = Date.now();
  if($(wholeSelector).children().length > 0) {
    $(wholeSelector).children().each(function() {
      if($(this).attr('id') !== undefined) {
        if($(this).attr('id') !== "template-edit"){
          itemname = "#" + $(this).attr('id');
        }
      }else if($(this).attr('class') !== undefined) {
        var classString = $(this).attr('class');
        if(classString.indexOf(' ') !== -1) {
          classString = $.trim(classString);
          classString = classString.replace(/\s/g,'.');
        }
        itemname = "." + classString;
      }else {
        itemname = $(this).prop('tagName');
      }
      item = item + count + itemcount;
      var tmp = {};
      tmp[item] = getChildItems(itemname, count + itemcount, wholeSelector);
      if(items['items'] === undefined || $.isEmptyObject(items['items'])) {
        itemsArray[itemcount + 1] = tmp;
      }else{
        itemsArray[itemcount + 1].push(tmp);
      }
      itemcount++;
      item = "child";
    });
    console.log(Date.now() - startTime);
    // Convert array to json string
    for(var i = 0; i< itemsArray.length; i++) {
      var string = JSON.stringify(itemsArray[i]);
      string = string.substr(1,string.length - 2) +',';
      jsonString += string;
    }
    jsonString = jsonString.slice(0,jsonString.length -1) + "}";
    items['items'] = $.parseJSON(jsonString);
    console.log('convert to json' + (Date.now() - startTime));
    if(Date.now() - startTime > 500) {
      console.log('%c' + jsonString , 'color:red;font-size: 16px;');
    }
  }
  return items;
}

/*
 * Function: get values of a multi-level json object
 * Paras: JSON object , key array 
 * Return: JSON values string
 */
function getJSONValue(jsonObj, keys, level) {
  if(!$.isArray(keys) && $.type(node) !== "string") {
    return 'parameters error';
  }
  level = typeof level === 'undefined' ? 0 : level;
  if(jsonObj[keys[level]].items !== undefined && level < keys.length -1) {
    return jsonObj[keys[level]].name + " " + getJSONValue(jsonObj[keys[level]].items, keys, level+1);
  }
  return jsonObj[keys[level]].name;
}


/*
 * Function: simulate click event at specified coordinates
 * Paras: x coordinate , y coordinate 
 * Return: null
 */
function simulateClick(x, y) {
    jQuery(document.elementFromPoint(x, y)).click();
}  

/*
 * Function: get parent of given object
 * Paras: object
 * Return: string
 */
function getParent(obj) {
  if($(obj).parent()[0] !== $('#template-main')[0]) {
    return getParent($(obj).parent()) + ' ' + currentEle($(obj));
  }
  return "#template-main" + ' ' + currentEle($(obj));
}

/*
 * Function: get id/name/tagname of given object
 * Paras: object
 * Return: string
 */
function currentEle(obj) {
  if(obj.attr('id') !== undefined && obj.attr('id') !== '') {
    var id = '#' + obj.attr('id');
    if(id.indexOf(' ') != -1) {
      return id.replace(/\s/g,'#'); 
    }
    return id;
  }
  if(obj.attr('class') !== undefined && obj.attr('class') !== '') {
    var className = '.' + obj.attr('class');
    if(className.indexOf(' ') != -1) {
      return className.replace(/\s/g,'.'); 
    }
    return className;
  }
  return obj.prop('tagName'); 
}

/*
 * Function: adjust template-edit style to fit target
 * Paras: target object
 * Return: null
 */
function adjustEdit(target) {
  $('#template-edit').css({
    "width": $(target).outerWidth(),
  "height": $(target).outerHeight(),
  'left': ($(target).offset().left - $('#template-main').offset().left) + 'px',
  'top': ($(target).offset().top - $('#template-main').offset().top) + 'px' ,
  'display': 'block'
  });
}

/*
 * Function: determine wheather value has unit
 * Paras: string
 * Return: boolean
 */
function hasUnit(value) {
  if(value.indexOf('px') !== -1 || value.indexOf('em') !== -1 || value.indexOf('%') !== -1) {
    return true;
  }
  return false;
}

/*
 * Function: get direct text of current node only, exclude text in childnode
 * Paras: object, string
 * Return: string
 */
function getText(obj, delimiter){
  var text = "";
  var delimiter = typeof delimiter === 'undefined' ? "{childNode}" : delimiter;
  console.log('delimiter' + delimiter);
  obj.contents().each(function(){
      if(this.toString() === '[object Text]'){
        text += $.trim(this.textContent);
      }else{
        text += delimiter;
      }
  });
  if(text.replace(/{childNode}/g,'') === ""){
    text = "";
  }
  return text;
}


/*
 * Function: save changes of text edit
 * Paras: string[target object selector string], string[oldcontent], string[newcontent]
 * Return: boolean[empty]
 */
function saveText(target, oldcontent, content, hasChild, empty) {
  if(oldcontent.indexOf('{childNode}') !== -1){
    var textArr = content.split('{childNode}'); 
    var htmlArr = [];
    var html = "";
    $(target).contents().each(function(){
      if(this.toString() !== "[object Text]"){
        htmlArr.push(this.outerHTML);
      }
    });
    $.each(htmlArr, function(index, value){
      console.log('%c'+index+'-'+value,'color:green');
      if(index !== (htmlArr.length - 1)){
        html += textArr[index] + value;
      }else{
        if(textArr.length < (index+1)){
          html += textArr[index] + value;
        }else{
          html += textArr[index] + value + textArr[index+1];
        }
      }
    });
    $(target).html(html);
  }else if(oldcontent === "" && hasChild){
    $(target).html(content + $(target).html());
    empty = true;
  }else{
    $(target).text(content);
  }
  return empty;
}

/*
 * Function: encode html string
 * Paras: string
 * Return: string
 */
function encode(str){
  if(str.search(/&/g) != -1 || str.search(/</g) != -1 || str.search(/>/g) != -1){
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  return str;
}

/*
 * Function: turn rgb to hex
 * Paras: none
 * Return: none
 * PS:  IE8 already returns colors as hexadecimal when getting the current style, this way: document.getElementById("your_id").currentStyle["backgroundColor"].
 * HowtoUse: $('').css('backgroundColor')
 */
$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["background-color"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}

/*
 * Function: get value of property in inline-style string
 * Paras: style, property
 * Return: value
 */
function getPropertyVal(styles, property) {
  var start = styles.indexOf(property);
  if(start !== -1) {
    var valStart = styles.indexOf(':', start) + 1;
    var valEnd = styles.indexOf(';', start);
    valEnd = valEnd === -1 ? styles.length : valEnd;
    return $.trim(styles.substring(valStart,valEnd));
  }
  return undefined;
}

/*
 * Function: get inline style and external style of an element
 * Paras: elment object
 * Return: JSON object
 */
function css(a){
    var o = {};
    var rules = window.getMatchedCSSRules(a.get(0));
    for(var r in rules) {
        o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
    }
    return o;
}

/*
 * Function: convert CSSSTYLEDECLARATION or css string to json object
 * Paras: CSSSTYLEDECLARATION or css string
 * Return: JSON object
 */
function css2json(css){
    var s = {};
    if(!css) return s;
    if(css instanceof CSSStyleDeclaration) {
        for(var i in css) {
            if((css[i]).toLowerCase) {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } 
    else if(typeof css == "string") {
        css = css.split("; ");          
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        };
    }
    return s;
}
