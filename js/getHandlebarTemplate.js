Handlebars.getTemplate = function(name) {
	if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
		$.ajax({
			url : name + '.handlebars.js',
          statusCode: {
            200: function(data) {
                   if (Handlebars.templates === undefined) {
                     Handlebars.templates = {};
                   }
                   Handlebars.templates[name] = Handlebars.compile(data.responseText);
                 }
          },
			async : false
		});
	}
	return Handlebars.templates[name];
};

