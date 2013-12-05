$(function () {
    // Add a position-fixed handler
    var editorHtml ='<div id="embed-inline-editor-handler"> <style scoped id="embed-inline-editor-style"> #embed-inline-editor-handler { background-color: goldenrod; width: 40px; height: 40px; position: fixed; bottom: 40px; right: 0px;} </style></div> <div id="embed-inline-editor"> Can\'t connect to Server</div>';
    var styleMapping = {};
    var ajaxQueue = [];
    var stylePath = "css/"
    $('body').append(editorHtml);


    // Show or hide editor
    $('body').on('click','#embed-inline-editor-handler',function(){
        embedInlineEditorInit();
        $('#embed-inline-editor').css('display','block');
        // Create Json mapping
        $('link').each(function () {
            console.log($(this).attr('href'));
            ajaxQueue.push($(this).attr('href'));
            createStyleMapping($(this).attr('href'), styleMapping);
        });
    })

    $(document).bind('ajaxProcessingSuccess', function(e, file){
        ajaxQueue = jQuery.grep(ajaxQueue, function(value){
            return value != file;
        })
    })

    $(document).ajaxStop(function(){
        if(!ajaxQueue.length){
            console.log(styleMapping['#logo']);
            $("#embed-inline-editor-ajax-loading").hide();
        }else{
            if(confirm("Can't load:\n"+ajaxQueue.join('\n')+'\nLoad again?')){
                $.each(ajaxQueue, function (index, value) {
                    console.log(value);
                    createStyleMapping(value, styleMapping);
                });
            }else{
                ajaxQueue = [];
                $("#embed-inline-editor-ajax-loading").hide();
                // editor Robot start
                $('body').children().not('#embed-inline-editor-handler, #embed-inline-editor, script, style').bind('click',function (e) {
                    e.preventDefault();
                }).bind('mousedown', function (e) {
                    e.preventDefault();
                    if(e.which === 1){
                        /*
                         * TODO: someplace involed with other js function will take not effect
                         */
                        setTreeNodes(e.target);
                        displayMatchingStyle(e.target, styleMapping);
                    }
                });
            }
        }
    })

    function embedInlineEditorInit(){
        // Get HTML structure
        $.ajax('/embedInlineEditor.html').success(function(html){
            $('#embed-inline-editor').html(html);
            $('.designer').hide();
            // Colorpicker init
            $('.embed-inline-editor-colorpicker').colpick({
                colorScheme: 'dark',
                layout: 'rgbhex',
                color: 'ff8800',
                flat: true,
                onSubmit: function (hsb, hex, rgb, el) {
                    $(el).css('background-color','#'+hex);
                    $(el).colpickHide();
                },
                onBeforeShow: function(el){
                },
                onShow: function (el) {
                    $(el).css({'position':'absolute','left':'10','top':'0'});
                },
                onHide: function (el) {
                }
            }).css('background-color', '#ff8800');
            $('.embed-inline-editor-colorpicker').children('.colpick').css('display','none');
            $('.embed-inline-editor-colorpicker').click(function(e){
                if(!$(e.target).hasClass('colpick_submit'))
                    $(this).colpickShow();
            });
        });

        // Get style
        $.ajax('/css/embedInlineEditor.css').success(function(style){
            $('#embed-inline-editor-style').text(style);
        });
    }

    //  Style mapping function
    function createStyleMapping(file) {
        if(styleMapping === undefined)
            return false;
        $.ajax(file).success(function (styles) {
            // replace EOL with whitespace
            styles = styles.replace(/\n/g,' ')
            // remove comments
            styles = styles.replace(/\/\*.*?\*\//g,'');     // Lazy mode, not greedy mode
            var importCss = styles.match(/@import url\([^)]*\);/g);
            if(importCss !== null){
                $.each(importCss, function(index, value){
                    value = value.substring(value.indexOf('(')+1, value.indexOf(')')).replace(/'|"/g,"");
                    ajaxQueue.push(stylePath + value);
                    createStyleMapping(stylePath + value);
                });
            }
            // remove import
            styles = styles.replace(/@import url\([^)]*\);/g,'')
            var stylearr = styles.match(/[^{]*{[^}]*}/g);
            $.each(stylearr, function(index,value){
                var index = value.indexOf('{');
                var selector = (value.substr(0,index)).trim();
                var style = (value.substring(index+1,value.indexOf('}')-1)).trim();
                var filemapping = {};
                filemapping[file] = style;
                if(styleMapping[selector]){
                    styleMapping[selector].push(filemapping);
                }else{
                    styleMapping[selector] = [filemapping];
                }
            });
            $(document).trigger('ajaxProcessingSuccess',file);
        });
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

    // Set elment dome tree
    function setTreeNodes(target){
        if($(target).parents().length){
            var parents = [];
            $.each($(target).parents().splice(0,3),function (key, value) {;
                parents.push(getSelector(value));
            });
            var html = "<ul>";
            $.each(parents.reverse(), function (key, value) {
                html += "<li><a href='javascript:;'>" + value + "</a><span>&gt;</span></li>";
            });
            html += "</ul>"
            $('#target-ele-parents').html(html);
        }
        $('#target-ele-current').html(getSelector(target) + "<span>&gt;</span>");
        if($(target).children().length){
            var childs = []
            $.each($(target).children(),function (key, value) {;
                childs.push(getSelector(value));
            });
            var html = "<ul>";
            $.each(childs.reverse(), function (key, value) {
                html += "<li><a href='javascript:;'>" + value + "</a><span>|</span></li>";
            });
            html += "</ul>"
            $('#target-ele-childs').html(html);
        }
    }

    // Get selector string of given dom element
    function getSelector(ele){
        var selector = ele.tagName.toLowerCase();
        if(ele.id !== ""){
            selector += "#" + ele.id.trim();
        }
        if(ele.className !== ""){
            selector += "." + ele.className.trim().replace(' ','.');
        }
        return selector.toString();
    }

    // Get matching style to target
    function displayMatchingStyle(target, styleObj) {
        console.log(target);
        console.log(styleObj);
        var parents = [];
        $.each($(target).parents(),function (key, value) {;
               parents.push(getSelector(value));
        });
        var targetWholeSelector = parents.reverse().join(' ') + ' ' + getSelector(target);
        console.log('-------------\n');
        console.log(targetWholeSelector);

        // Match target tag's style
        var tagMatching = $.each(objKeyMatching(styleObj, "(((?!"+ target.tagName.toLowerCase() +").)*)" + target.tagName.toLowerCase() + "(((?!"+ target.tagName.toLowerCase() + ").)*)"), function(index, value){
            return value.replace(/\s|,/g,'');
        });
        console.log(tagMatching);
    }

    // Get matching keys of a json obj using given pattern string
    function objKeyMatching(obj, pattern) {
        if($.isArray(pattern)){

        }
        var reg = new RegExp(pattern);
        return Object.keys(obj).map(function(key) {
            if(reg.test(key)){
                return key;
            }else{
                return false;
            }
        }).filter(function(item){
            return item !== false;
        });
    }

})
