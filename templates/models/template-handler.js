var initTemplate = function(){
  $.getJSON('templates/models/models.json',function(data){
    $('#models-list').on("pqgridrender", function (evt, obj) {
      var $toolbar = $("<div class='pq-grid-toolbar pq-grid-toolbar-crud'></div>").appendTo($(".pq-grid-top", this));

      $("<button class='btn btn-success'>Custom This Model</button>").appendTo($toolbar).click(function (evt) {
        selectModel();
      });
      $toolbar.disableSelection();
    }); // must register this event before create pqGrid instance
    var $pqgrid = $("#models-list").pqGrid({
      colModel : [
    { title: "Folder", width: 100,  dataType: 'integer', dataIndx: "folder", hidden: true },
        { title: "Name", width: 100,  dataType: 'integer', dataIndx: "name" },
        { title: "Category", width: 100,  dataType: 'string', dataIndx: "category"},
        { title: "Screenshot", width: 200, dataType: 'string', dataIndx: 'screenshot', render: function(ui){return '<img src="templates/models/' + ui.rowData['folder'] + "/" + ui.rowData[ui.dataIndx] + '" alt="screenshot"'}, className: 'model-screenshot'},
        { title: "Compatibility", width: 300, dataType: 'string',  dataIndx: "compatibility"},
        { title: "Description", width: 300, dataType: 'string',  dataIndx: "description"}
    ],
        dataModel: {
          data: data,
        location: 'local',
        sorting: 'local',
        paging: 'local',
        rPP: 6,
        useRp: true,
        sortIndx: 'name',
        sortDir: 'up',
        rPPOptions: [5, 10, 20, 50, 100, 200, 500, 1000]
        },
        editable: false,
        width: '98%',
        height: '600px',
        wrap: true,
        title: 'Models',
        selectionModel: {type: 'row', mode: 'single'}
    });
    var buttonClass = ['first', 'prev', 'next', 'last', 'refresh'];
    var i = 0;
    $('div.pq-grid-footer.pq-pager button').each(function(){
      $(this).addClass(buttonClass[i]);
      i++;
    });
  });
};

function selectModel() {
  var rowIndex = getRowIndex();
   if (rowIndex != null) {
     var DM = $('#models-list').pqGrid("option", "dataModel");
     var data = DM.data;
     var row = data[rowIndex];
     var modelPath = 'templates/models/' + row.folder + '/' + row.name + '.html';
     $('#cboxLoadedContent').load(modelPath,function(responseText, textStatus, XMLHttpRequest){initModel();})
   }
}

function getRowIndex() {
  var arr = $('#models-list').pqGrid("selection", { type: 'row', method: 'getSelection' });
  if (arr && arr.length > 0) {
    var rowIndx = arr[0].rowIndx;
    return rowIndx;
  }
  else {
    alert("Select a row.");
    return null;
  }
}
