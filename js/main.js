$(function() {
  /* List elements using contextMenu , for its heavy performance when having too many elements , drop this */
  /*
  $.contextMenu({
    selector: '#template-main',
  build: function($trigger, e) {
    var menu = {};
    var rootcount = 1;
    if($('#template-main').children().length > 1) {
      $('#template-main').children().each(function(){
        var item = "root";
        var itemname = "";
        if($(this).attr('id') !== undefined) {
          if($(this).attr('id') !== "template-edit"){
            itemname = "#" + $(this).attr('id');
          }else {
            return true;
          }
        }else if($(this).attr('class') !== undefined) {
          itemname = "." + $(this).attr('class');
        }else {
          itemname = $(this).prop('tagName');
        }
        item = item + rootcount;
        menu[item] =  getChildItems(itemname,rootcount.toString(),'#template-main');
        rootcount++;
      });
    }
    else {
      menu = {"root": {name: 'template-body'}};
    }
    return {
      callback: function(key, options) {
                  var target = "#template-main";
                  if(key.indexOf('root') !== -1) {
                    target += " " + menu[key].name;
                  }else {
                    var numLength = key.length - 5;
                    var target2 = "";
                    for(var i = numLength - 2; i >= 0; i--) {
                      var child = key.substring(0, key.length - i);
                      if(i == numLength - 2) {
                        target2 += child.replace(/child(.)./,'root$1') + " " + child;
                      }else{
                        target2 += " " + child;
                      }
                    }
                    target = target + " " + getJSONValue(menu,target2.split(' '));
                  }
                  $('#template-edit').css({
                    "width": $(target).width(),
                    "height": $(target).height(),
                    'left': ($(target).offset().left - $('#template-main').offset().left) + 'px',
                    'top': ($(target).offset().top - $('#template-main').offset().top) + 'px' ,
                    'display': 'block'
                  });
                  $('#template-main').attr('data-target', target);
                },
      items: menu
    }
  }
  });
  */

  //Get target element by left click
  $('#template-main').click(function(e){
    e.preventDefault();
    // var parents = getParent(e.target);
    if(e.target === document.getElementById('template-edit')) {
      $('#template-edit').hide();
      console.log('template-edit');
      simulateClick(e.pageX, e.pageY);
    }else if(getParent(e.target).indexOf('setting-panel') != -1) {
      setting($(e.target).attr('class'));
      return false;
    }else{
      console.log('object');
      $('#template-edit').css({
        "width": $(e.target).outerWidth(),
        "height": $(e.target).outerHeight(),
        'left': ($(e.target).offset().left - $('#template-main').offset().left) + 'px',
        'top': ($(e.target).offset().top - $('#template-main').offset().top) + 'px' ,
        'display': 'block'
      });
      $('.template-current').removeClass('template-current');
      $('.parent-of-template-current').removeClass('parent-of-template-current');
      $(e.target).addClass('template-current');
      if($(e.target).attr('id') === 'template-main') {
        $('#template-edit #setting-panel').hide();
        $('#template-edit #setting-disable').text('Body');
        $('#template-edit #setting-disable').show();
      }else{
        $('.template-current').parent().addClass('parent-of-template-current');
        $('#template-edit #setting-panel').show();
        $('#template-edit #setting-disable').hide();
      }
      $('#template-main').data('target', getParent(e.target));
    }
  });

  function setting(parents) { //setting panel functions
    if(parents.indexOf('parent') != -1) {
      if($('.template-current').attr('id') !== "template-main") {
        $('.template-current').removeClass('template-current');
        $('.parent-of-template-current').addClass('template-current');
        $('.parent-of-template-current').removeClass('parent-of-template-current');
        $('.template-current').parent().addClass('parent-of-template-current');
        if($('.template-current').attr('id') === 'template-main') {
          $('#template-edit #setting-panel').hide();
          $('#template-edit #setting-disable').text('Body');
          $('#template-edit #setting-disable').show();
          $('.template-current').removeClass('template-current');
          $('.parent-of-template-current').removeClass('parent-of-template-current');
          $('#template-main').removeData('target');
          adjustEdit('#template-main');
        }else{
          $('#template-edit #setting-panel').show();
          $('#template-edit #setting-disable').hide();
          var target = getParent($('.template-current'));
          $('#template-main').data('target', target);
          adjustEdit(target);
        }
      }
    } else if(parents.indexOf('style-setting') != -1) {
      $.colorbox({
        href: $('#template-edit #setting-panel .style-setting').attr('href'),
        width: '100%',
        height: '100%',
        overlayClose: false,
        onComplete: function() {
          var target = $('#template-main').data('target') === undefined ? '#template-main' : $('#template-main').data('target');
          fillValues(target);
          $('#cboxContent #cboxConfirm').unbind('click');
          $('#cboxContent #cboxConfirm').click(function(){
            console.log('confirm');
            var target = $('#template-main').data('target') === undefined ? '#template-main' : $('#template-main').data('target');
            var style = "";
            var padding = "";
            var margin = "";
            var background = "";
            var border = {};

            //calculate style
            var width = $('#cboxContent #element-setting input[name="width"]').val();
            var height = $('#cboxContent #element-setting input[name="height"]').val();
            $('#cboxContent #element-setting input[name^="padding"]').each(function(){
              var value = $.trim($(this).val());
              value = value === "" ? "0" : value;
              value = hasUnit(value) ? value : value + 'px';
              padding = padding + " " + value;
            });
            $('#cboxContent #element-setting input[name^="margin"]').each(function(){
              var value = $.trim($(this).val());
              value = value === "" ? "0" : value;
              value = hasUnit(value) ? value : value + 'px';
              margin = margin + " " + value;
            });
            if($('#cboxContent #element-setting select#background').val() === "1"){
              background += "#" + $('#cboxContent #element-setting #colorpicker-holder .colorpicker_hex input').val();
            }else if($('#cboxContent #element-setting select#background').val() === "2"){
              background += "url(" + $('#cboxContent #element-setting #background-image img').attr('src') +")" + " " + $('#cboxContent #element-setting #background-image #Repeat').val();
              if($('#cboxContent #element-setting #background-image .background-position #position-left').val() !== undefined && $('#cboxContent #element-setting #background-image .background-position #position-left').val() !== ""){
                background += " " + $('#cboxContent #element-setting #background-image .background-position #position-left').val();
              }
              if($('#cboxContent #element-setting #background-image .background-position #position-top').val() !== undefined && $('#cboxContent #element-setting #background-image .background-position #position-top').val() !== ""){
                background += " " + $('#cboxContent #element-setting #background-image .background-position #position-top').val();
              }
            }else if($('#cboxContent #element-setting select#background').val() === "3"){
              background += "url(" + $('#cboxContent #element-setting #background-image img').attr('src') +")" + " " + $('#cboxContent #element-setting #background-image #Repeat').val();
              if($('#cboxContent #element-setting #background-image .background-position #position-left').val() !== undefined && $('#cboxContent #element-setting #background-image .background-position #position-left').val() !== ""){
                background += " " + $('#cboxContent #element-setting #background-image .background-position #position-left').val();
              }
              if($('#cboxContent #element-setting #background-image .background-position #position-top').val() !== undefined && $('#cboxContent #element-setting #background-image .background-position #position-top').val() !== ""){
                background += " " + $('#cboxContent #element-setting #background-image .background-position #position-top').val();
              }
              background += " " + "#" + $('#cboxContent #element-setting #colorpicker-holder .colorpicker_hex input').val();
            }
            if($('#border-top-type').val() === 'none' && $('#border-right-type').val() === 'none' && $('#border-bottom-type').val() === 'none' && $('#border-left-type').val() === 'none'){
              border['border'] = 'none';
            }else if($('#cboxContent #element-setting #same_border').is(':checked')){
                border['border'] = $('#border-top-size').val() + 'px ' + $('#border-top-type').val() + ' #' + $('#border-top-color-holder .colorpicker_hex input').val();
            }else{
              if($('#border-top-type').val() !== 'none' && $('#border-top-size').val() !== '' && $('#border-top-size').val() !== '0'){
                border['border-top'] = $('#border-top-size').val() + 'px ' + $('#border-top-type').val() + ' #' + $('#border-top-color-holder .colorpicker_hex input').val();
              }else{
                border['border-top'] = 'none';
              }
              if($('#border-right-type').val() !== 'none' && $('#border-right-size').val() !== '' && $('#border-right-size').val() !== '0'){
                border['border-right'] = $('#border-right-size').val() + 'px ' + $('#border-right-type').val() + ' #' + $('#border-right-color-holder .colorpicker_hex input').val();
              }else{
                border['border-right'] = 'none';
              }
              if($('#border-bottom-type').val() !== 'none' && $('#border-bottom-size').val() !== '' && $('#border-bottom-size').val() !== '0'){
                border['border-bottom'] = $('#border-bottom-size').val() + 'px ' + $('#border-bottom-type').val() + ' #' + $('#border-bottom-color-holder .colorpicker_hex input').val();
              }else{
                border['border-bottom'] = 'none';
              }
              if($('#border-left-type').val() !== 'none' && $('#border-left-size').val() !== '' && $('#border-left-size').val() !== '0'){
                border['border-left'] = $('#border-left-size').val() + 'px ' + $('#border-left-type').val() + ' #' + $('#border-left-color-holder .colorpicker_hex input').val();
              }else{
                border['border-left'] = 'none';
              }
            }

            // apply style
            if(width !== undefined && width !== ""){
              width = hasUnit(width) ? width : width + 'px';
              $(target).css('width', width);
              style += 'width:' + width + ';';
            }
            if(height !== undefined && height !== ""){
              height = hasUnit(height) ? height : height + 'px';
              $(target).css('height', height);
              style += 'height:' + height + ';';
            }
            if(margin !== " 0px 0px 0px 0px"){ 
              $(target).css('margin', margin);
              style += 'margin:' + margin + ';';
            }
            if(padding !== " 0px 0px 0px 0px"){
              $(target).css('padding', padding);
              style += 'padding:' + padding + ';';
            }
            if(background !== ""){
              $(target).css('background', background);
              style += 'background:' + background + ';';
            }else{
              $(target).css('background', 'none');
              style += 'background:none;';
            }
            if(border.length !== 0){
              if(border['border'] !== undefined){
                $(target).css('border', border['border']);
                style += 'border:' + border['border'] + ';';
              }else{
                $(target).css('border-top', border['border-top']);
                style += 'border-top:' + border['border-top'] + ';';
                $(target).css('border-right', border['border-right']);
                style += 'border-right:' + border['border-right'] + ';';
                $(target).css('border-bottom', border['border-bottom']);
                style += 'border-bottom:' + border['border-bottom'] + ';';
                $(target).css('border-left', border['border-left']);
                style += 'border-left:' + border['border-left'] + ';';
              }
            }

            $(target).data('style', style); // record lastest style and keep original style string to prevent changing by browser and jquery
            adjustEdit(target);
            $('#template-main').data('target', target);
            console.log('data-target:' + $('#template-main').data('target'));
            console.log('data-style:' + $(target).data('style'));
            $('#cboxContent #cboxClose').trigger('click');
          });
        }
      });
    }else if(parents.indexOf('text-edit') != -1) {
      var target = $('#template-main').data('target') === undefined ? '#template-main' : $('#template-main').data('target');
      var content = "";
      var oldcontent = "";
      var empty = false; // when has children and doesn't have text, true
      var hasChild = false;
      console.log(target);
      $.colorbox({
        width: '100%',
        height: '50%',
        overlayClose: false,
        html: "<textarea id='content-edit' class='popup-editor'></textarea>",
        onComplete: function(){
          if($(target).children().length === 0) {
            $('#content-edit').val($(target).text());
          }else{
            $('#content-edit').val(getText($(target)));
          }
          oldcontent = encode($('#content-edit').val());
          $('#cboxContent #cboxConfirm').unbind('click');
          $('#cboxContent #cboxConfirm').click(function(){
            if($(target).children().length !== 0) { // put in click function to make hasChild as a flag to point out if confirm click before close event
              hasChild = true;
            }
            content = encode($('#content-edit').val());
            if(oldcontent !== content){
              empty = saveText(target, oldcontent, content, hasChild, empty);
            }
            $('#cboxContent #cboxClose').trigger('click');
          });
      },
        onCleanup: function(){
                     //before close colorbox , check if content changes saved
                     if($(target).children().length === 0) {
                       oldcontent = $(target).text();
                     }else{
                       oldcontent = encode(getText($(target)));
                       if(empty){ // if confirm click before close event, prevent clean text when delete all text in textarea('{childNode}{childNode}')
                         oldcontent = oldcontent.replace(/{childNode}/g,'');
                       }
                     }
                     content = encode($('#content-edit').val());
                     if(hasChild){
                       content = content.replace(/{childNode}/g,'') === '' ? '' : content;
                     }
                     if(oldcontent !== content){
                       if(confirm('Save changes?')) {
                         saveText(target, oldcontent, content, hasChild, empty);
                       }
                     }
                     adjustEdit(target);
                   }
      });
    }else if(parents.indexOf('html-edit') != -1) {
      var target = $('#template-main').data('target') === undefined ? '#template-main' : $('#template-main').data('target');
      $.colorbox({
        width: '100%',
        height: '50%',
        overlayClose: false,
        html: "<textarea id='html-edit' class='popup-editor'></textarea>",
        onComplete: function(){
          var oldhtml = $(target).html()
          $('#html-edit').val(oldhtml);
          $('#cboxContent #cboxConfirm').unbind('click');
          $('#cboxContent #cboxConfirm').click(function(){
            if(oldhtml !== $('#html-edit').val()){
              $(target).html($('#html-edit').val());
            }
            $('#cboxContent #cboxClose').trigger('click');
          });
      },
        onCleanup: function(){
                     //before close colorbox , check if content changes saved
                     if($(target).html() !== $('#html-edit').val()){
                       if(confirm('Save changes?')) {
                         $(target).html($('#html-edit').val());
                       }
                     }
                     adjustEdit(target);
                   }
      });
    }
  }

  // insert template when close popup dialog
  $('a.colorbox').colorbox({
    width: '100%',
  height: '80%',
  overlayClose: false,
  onLoad: function(){
    //Callback that fires right before attempting to load the target content.
    //pre-define functions which will be override by template setting page to null
    window.initTemplate = null;
    window.insertTemplate = null;
  },
  onComplete: function() {
    // Callback that fires right after loaded content is displayed.
    var target = $('#template-main').data('target') === undefined ? '#template-main' : $('#template-main').data('target');
    if($('#cboxContent #cboxConfirm').length === 0) {
      $('#cboxContent').append('<button id="cboxConfirm">confirm</button>');
    }
    $('#cboxContent #cboxConfirm').unbind('click');
    if($('#cboxContent #template-setting').length != 0) {
      console.log('insert template');
      var source = $(this).attr('href').substring(0,$(this).attr('href').lastIndexOf('/') + 1);
      if(initTemplate !== undefined && initTemplate !== null) {
        initTemplate();
      }
      initTemplate = null; // nulltify initTemplate , prevent it existing till next template call
      $('#cboxContent #cboxConfirm').click(function(){
        if(insertTemplate !== undefined && insertTemplate !== null) {
          insertTemplate($('#template-main').data('target'), source);
        }
        insertTemplate = null; // nulltify initTemplate , prevent it existing till next template call
        $('#cboxContent #cboxClose').trigger('click');
      });
    }else {
    }
    adjustEdit(target);
  }
  });
});
