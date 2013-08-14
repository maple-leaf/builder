var initTemplate = function() {
  // init demo , default bootstrap mode
  var containerWidth = $('.template-current').width() !== null ? $('.template-current').width() : $('#template-main').width();
  var containerHeight = 450;
  $('#template-setting .bootstrap-tooltip').tooltip();
  $('#setting-demo').width(containerWidth);
  //init bootstrap mode
  $('#setting-demo .margin-col').hide();
  $('#setting-demo .parent-element').addClass('row-fluid');
  $('#setting-demo #setting1').addClass('span12');
  $('#setting1, #setting2, #setting3').height(containerHeight);
  $('#total-width').text($('#total-width').text() + '  span12');

  // handle theme changing
  $('#style-theme').change(function(){
    console.log('theme change');
    if($(this).val() === 'bootstrap') {
      $('#setting-demo .margin-col').hide();
      $('#setting-demo .parent-element').addClass('row-fluid');
      $('#setting-demo #setting1').addClass('span12');
      $('#setting1, #setting2, #setting3').height(containerHeight);
      $('#total-width').text('Total:  span12');
      $('#setting-demo .bootstrap-setting').show();
    }else{
      $('#setting-demo .parent-element').removeClass('row-fluid');
      $('#setting-demo #setting1').removeClass();
      var col = $('#template-setting form input[type="radio"]:checked').val();
      if(col > 1) {
        $('#setting-demo #setting2').removeClass();
      }
      if(col > 2) {
        $('#setting-demo #setting3').removeClass();
      }
      $('#setting-demo .col').height(containerHeight);
      $('#total-width').text('Total:  ' + containerWidth + '(px)');
      $('#setting-demo .margin-col').show();
      $('#setting-demo .bootstrap-setting').hide();
    }
    $('#template-setting form input[type="radio"]').trigger('change');
  });
  // handle column change 
  $('#template-setting form input[type="radio"]').change(function(){
    var col = $('form input[type="radio"]:checked').val() ;
    if($('#style-theme').val() !== 'bootstrap'){
    // clearf all previous setting
    $('#setting1, #setting1 .margin-col, #setting1 .col').removeAttr('style');
    $('#setting2, #setting2 .margin-col, #setting2 .col').removeAttr('style');
    $('#setting3, #setting3 .margin-col, #setting3 .col').removeAttr('style');
    }
    $('#setting-demo input[type="number"]').val(0);
    if(col == 2) {
      if($('#style-theme').val() === 'bootstrap'){
        $('#setting1, #setting2').attr('class','span6');
        $('#span-first, #span-second').val(6);
        $('#span-first').prop('disabled', false).removeClass('disabled');
        $('#span-second').prop('disabled', true).addClass('disabled');
      }else{
        var width = Math.round(0.48717948717948715*containerWidth);
        var padding_left = Math.round(0.02564102564102564*containerWidth);
        if((width * 2 + padding_left) > containerWidth) {
          padding_left -= 1;
        }
        $('#setting1 .col, #setting2 .col').css({'width': width + 'px', 'height': containerHeight+'px'});
        $('#setting2').css('padding-left', padding_left + 'px');
        $('#setting2 input#margin-left-second').val(parseInt(padding_left));
        $('#setting1, #setting2').find('input[name="width"]').val(parseInt(width));
      }
      $('#setting2').show();
      if($('#setting3').is(':visible')){
        $('#setting3').hide();
      }
    }else if(col == 3) {
      if($('#style-theme').val() === 'bootstrap'){
        $('#setting1, #setting2, #setting3').attr('class','span4');
        $('#span-first, #span-second, #span-third').val(4);
        $('#span-first, #span-second').prop('disabled', false).removeClass('disabled');
        $('#span-third').prop('disabled', true).addClass('disabled');
      }else{
        var width = Math.round(0.31623931623931625*containerWidth);
        var padding_left = Math.round(0.02564102564102564*containerWidth);
        if((width * 3 + padding_left * 2) > containerWidth) {
          padding_left -= 1;
        }
        $('#setting1 .col, #setting2 .col, #setting3 .col').css({'width':width + 'px','height': containerHeight+'px'});
        $('#setting2, #setting3').css('padding-left', padding_left + 'px');
        $('#setting2 input#margin-left-second, #setting3 input#margin-left-third').val(parseInt(padding_left));
        $('#setting1, #setting2, #setting3').find('input[name="width"]').val(parseInt(width));
      }
      $('#setting2, #setting3').show();
    }else {
      if($('#style-theme').val() === 'bootstrap'){
        $('#setting1').attr('class','span12');
        $('#span-first').val(12).prop('disabled', true).addClass('disabled');
      }else{
        $('#setting1 .col').css({'width': containerWidth + 'px', 'height': containerHeight+'px'});
        $('#setting1 .col input[name="width"]').val(parseInt(containerWidth));
      }
      $('#setting2, #setting3').hide();
    }
  });

  // handle margin, padding, width, height, span input change event
  $('#template-setting #setting-demo input[type="number"]').focus(function(){
    $(this).data('old-value', $(this).val());
  }).change(function(){
    var currentID = $(this).attr('id');
    var value = $(this).val();
    var gap = parseFloat($(this).data('old-value')) - parseFloat(value);
    // value validation , can't less than 0
    if(parseInt(value) < 0) {
      alert('The value should larger than 0');
      $(this).val(0);
    }
    if(currentID.search(/(width|height|span)/) === -1){
      // margin and padding changing at custom theme mode
      var property = 'padding-' + currentID.match(/(top|right|bottom|left)/)[0];
      var unit = 'px';
      if(property.search(/(top|bottom)/) !== -1){
        $(this).parent().find('.col').height(parseFloat($(this).parent().find('.col').height()) + gap);
        $(this).parent().parent().css(property, value+unit);
      }else{
        var width = parseFloat($(this).parent().find('.col').width()) + gap;
        if(width < 0){
          alert("Total cant' larger than " + containerWidth);
          value = parseFloat(value) + width;
          $(this).val(value);
          $(this).parent().find('.col').width(0).children('input[id^="width"]').val(0);
        }else{
          $(this).parent().find('.col').width(width).children('input[id^="width"]').val(width);
        }
        $(this).parent().parent().css(property, value+unit);
      }
    }else if(currentID.search(/span/) === -1){
      // height and width changing at custom theme mode
      if(currentID.search(/width/) !== -1) {
        $(this).parent().width($(this).val());
      }
      if(currentID.search(/height/) !== -1) {
        $(this).parent().height($(this).val());
      }
    }else{
      // span changing at bootstrap theme mode 
      var value = $(this).val();
      if(value < 1 || value > 11) {
        // alert('out of range: 1 - 11');
        $(this).val($(this).data('old-value'));
      }
      var col = $('form input[type="radio"]:checked').val() ;
      if(col === '2') {
        $('#span-second').val(12 - parseInt($('#span-first').val()));
      }else if(col === '3') {
        var span3 = 12 - parseInt($('#span-first').val()) - parseInt($('#span-second').val());
        if(span3 > 0){
          $('#span-third').val(span3);
        }else{
          $(this).val($(this).data('old-value'));
        }
      }
    }
    $(this).data('old-value', $(this).val()); // when input is always focus, save old value when changing 
  });
};

var insertTemplate = function(parentSelector, path) {
  parentSelector = typeof parentSelector !== 'undefined' && parentSelector !== "" ? parentSelector : $('#template-main');
  console.log(parentSelector);
  var target = $('#template-setting form#basic-setting');
  if(target.length !== 0) {
    var template = Handlebars.getTemplate(path + 'cols');
    if(template !== undefined){
      if(parentSelector.search('template-placeHolder') !== -1) {
        $(parentSelector).parent().append($.trim(template(createData($('form[id^="setting"]'))))).children('.template-placeHolder').remove();
      }else{
        $(parentSelector).append($.trim(template(createData($('#template-setting #setting-demo div[id^="setting"]'))))).children('.template-placeHolder').remove();
      }
    }
  }
};

function createData(obj) {
  var data = {};
  var col = $('form input[type="radio"]:checked').val() ;
  if($('#style-theme').val() === 'bootstrap'){
    var spans = {};
    spans['first_span'] = {'val':'span'+$('#setting1 .bootstrap-setting input').val()};
    if(col > 1){
      spans['second_span'] = {'val':'span'+$('#setting2 .bootstrap-setting input').val()};
    }
    if(col > 2){
      spans['third_span'] = {'val':'span'+$('#setting3 .bootstrap-setting input').val()};
    }
    data['bootstrap-style'] = spans;
  }else if($('#style-theme').val() === 'custom'){
    var unit = 'px'
    var styles = {};
    var style = "width:" + $(obj[0]).find('input#width-first').val() + unit + ';'
                 + "margin:" + $(obj[0]).find('input#margin-top-first').val() + unit + ' '
                 + $(obj[0]).find('input#margin-right-first').val() + unit + ' '
                 + $(obj[0]).find('input#margin-bottom-first').val() + unit + ' '
                 + $(obj[0]).find('input#margin-left-first').val() + unit + ';'
                 + "padding:" + $(obj[0]).find('input#padding-top-first').val() + unit + ' '
                 + $(obj[0]).find('input#padding-right-first').val() + unit + ' '
                 + $(obj[0]).find('input#padding-bottom-first').val() + unit + ' '
                 + $(obj[0]).find('input#padding-left-first').val() + unit;
    styles['setting1'] = {'style': style};
    if(col > 1){
    style = "width:" + $(obj[1]).find('input#width-second').val() + unit + ';'
                 + "margin:" + $(obj[1]).find('input#margin-top-second').val() + unit + ' '
                 + $(obj[1]).find('input#margin-right-second').val() + unit + ' '
                 + $(obj[1]).find('input#margin-bottom-second').val() + unit + ' '
                 + $(obj[1]).find('input#margin-left-second').val() + unit + ';'
                 + "padding:" + $(obj[1]).find('input#padding-top-second').val() + unit + ' '
                 + $(obj[1]).find('input#padding-right-second').val() + unit + ' '
                 + $(obj[1]).find('input#padding-bottom-second').val() + unit + ' '
                 + $(obj[1]).find('input#padding-left-second').val() + unit;
    styles['setting2'] = {'style': style};
    }
    if(col > 2){
    style = "width:" + $(obj[2]).find('input#width-third').val() + unit + ';'
                 + "margin:" + $(obj[2]).find('input#margin-top-third').val() + unit + ' '
                 + $(obj[2]).find('input#margin-right-third').val() + unit + ' '
                 + $(obj[2]).find('input#margin-bottom-third').val() + unit + ' '
                 + $(obj[2]).find('input#margin-left-third').val() + unit + ';'
                 + "padding:" + $(obj[2]).find('input#padding-top-third').val() + unit + ' '
                 + $(obj[2]).find('input#padding-right-third').val() + unit + ' '
                 + $(obj[2]).find('input#padding-bottom-third').val() + unit + ' '
                 + $(obj[2]).find('input#padding-left-third').val() + unit;
    styles['setting3'] = {'style': style};
    }
    data['custom-style'] = styles;
  }
  console.log(data);
  return data;
}
