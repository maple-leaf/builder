{{#with custom-style}}
<div class="custom_row_container clearfix">
  <div class="base_fl" style="{{setting1.style}}" data-style="{{setting1.style}}">
    <div class="template-placeHolder"> Place Holder </div>
  </div>
  {{#with setting2}}
  <div class="base_fl" style="{{style}}" data-style="{{style}}">
    <div class="template-placeHolder-light"> Plcae Holder </div>
  </div>
  {{/with}}
  {{#with setting3}}
  <div class="base_fl" style="{{style}}" data-style="{{style}}">
    <div class="template-placeHolder"> Plcae Holder </div>
  </div>
  {{/with}}
</div>
{{/with}}
{{#with bootstrap-style}}
<div class="row-fluid">
  <div class="span12">
    <div class="{{first_span.val}}">
      <div class="template-placeHolder"> Place Holder </div>
    </div>
    {{#with second_span}}
    <div class="{{val}}">
      <div class="template-placeHolder-light"> Plcae Holder </div>
    </div>
    {{/with}}
    {{#with third_span}}
    <div class="{{val}}">
      <div class="template-placeHolder"> Plcae Holder </div>
    </div>
    {{/with}}
  </div>
</div>
{{/with}}
