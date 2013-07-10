;var scrollTimeLineGUI = function(_options, callback){
	
	////////////////////
	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var Element;
	var options;
	var masterJSON;
	var instructions = "these are the rules for using this Object";
	var JSONP = "";
	var easingArray = [ "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint", "easeInSine", "easeOutSine", "easeInOutSine", "easeInExpo", "easeOutExpo", "easeInOutExpo", "easeInCirc", "easeOutCirc", "easeInOutCirc" ];
	var cssArray = ['top','left','bottom','right','opacity','rotate','height','width'];
		
	var scrollTimeLineGUIInitialize = function(_options, callback) {
	
		var defaults = { 
			element:$('#timeline'),
			add_row_btn: $('.add.row'),
			output: $('.output'),
			editor: $('#item-editor'),
			height:"100%",
			width:"100%",
			jsonArray:[],
			currentFile:'default.js',
			currentVar:'defaultJSON',
			zoom:1,
			CallBack:function(e) {}
			};
	
		options = $.extend(defaults, _options);
		if(callback) {
			options.scrollCompleteCallback = callback;
		}
		
		Element = $(options.element);
		Element.data("scrollTimeLineGUI", _inst);
		generalUI();
	}
	
	var generalUI = function() {
		$('.top-fixed.open').bind('click', function() {
			$('.json.files').stop().animate({top: 100},300)
		})
		
		$('.json.files .close').bind('click', function() {
			$('.json.files').stop().animate({top: -400},300)
		})
		
		$('.top-fixed.create').bind('click', function() {
			$('.json.create').stop().animate({top: 100},300)
		})
		
		$('.json.create .create.btn').bind('click', function() {
			$.ajax({
	            type: "POST",
	            url: "libs/write-data.php",
	            dataType: 'text',
	            data: { json: JSONP, file: $('.json.create input[name=filename]').attr('value'), varName: $('.json.create input[name=varname]').attr('value'), newfile: "true" },
	            complete: function(e) {
	            	window.location = document.URL
	            }
	        });
		})
		
		$('.json.create .close').bind('click', function() {
			$('.json.create').stop().animate({top: -400},300)
		})
		
		$('.json-link').bind('click', function() {
			$('.json-link').not($(this)).removeClass('active');
			$(this).addClass('active');
			$('#timeline').html('');
			options.jsonArray = eval($(this).attr('ref'));
			options.currentFile = $(this).attr('rel');
			options.currentVar = $(this).attr('ref')
			buildUI();
		})
	}
	
	var buildUI = function() {
		for(i=0;i<options.jsonArray.length;i++) {
			var obj = options.jsonArray[i]
			var rF = $( rowFormat(obj) );
			rF.data({animationObj: {'element':obj.element, 'start':obj.startend.s, 'end':obj.startend.e, 'easing':obj.easing, 'values':obj.values} })
			Element.append( rF )
		}
		enableUI()
	}
	
	
	var rowFormat = function(obj) {
		
		var row = "<div class='ui-row' style='left:"+(obj.startend.s/options.zoom)+"px; width:"+((obj.startend.e-obj.startend.s)/options.zoom)+"px '>";
		row += "<div class='left anchor'></div>";
		row += "<div class='right anchor'></div>";
		row += "<div class='values'>";
		row += "<span class='preview' >"+obj.element+"</span>";
		var values = JSON.stringify( obj.values )
		row += "<span class='preview' >"+values+"</span>";
		row +="<span class='preview' >"+obj.easing+"</span>";
		row += "</div>";
		row += "</div>";
		return row;
	}
	
	
	var enableUI = function() {
	
		$(".ui-row").draggable({
										axis:"x", grid:[5,5],
										stop: function() {
                							$(this).data('animationObj').start = parseInt($(this).css('left').replace('px', ''))*options.zoom; 
                							$(this).data('animationObj').end = (parseInt($(this).css('width').replace('px', ''))*options.zoom)+$(this).data('animationObj').start;
                							Editor( $(this) );
										}
								});
								
		$(".ui-row .left.anchor" ).draggable({ 
										axis: "x",
										grid:[5,5],
										stop: function() {
											var dist = $(this).css('left');
											$(this).parent().css('left', "+="+dist);
                							$(this).parent().css('width', "-="+dist);
                							$(this).css('left', 0);
                							$(this).parent().data('animationObj').start = parseInt($(this).parent().css('left').replace('px', ''))*options.zoom; 
                							$(this).parent().data('animationObj').end = (parseInt($(this).parent().css('width').replace('px', ''))*options.zoom)+$(this).parent().data('animationObj').start;
                							Editor( $(this).parent() );
            							}
        							});
		$( ".ui-row .right.anchor" ).draggable({ 
										axis: "x",
										grid:[5,5],
										stop: function() {
											var dist = parseInt($(this).css('left'))+parseInt($(this).css('width'));
                							$(this).parent().css('width', dist);
                							$(this).css({'left': '', "right":0});
                							$(this).parent().data('animationObj').start = parseInt($(this).parent().css('left').replace('px', ''))*options.zoom; 
                							$(this).parent().data('animationObj').end = (parseInt($(this).parent().css('width').replace('px', ''))*options.zoom)+$(this).parent().data('animationObj').start;
                							Editor( $(this).parent() );
            							}
            						});
        $(".ui-row").click(function() {
        	 el = $(this)
        	 $(".ui-row").not(el).removeClass('selected');
        	 if(!el.hasClass('selected')) {
        	 	el.addClass('selected')
        	 	Editor(el)
        	 }
        })
        
		options.save_btn.bind('click', saveJSON);
		
		options.add_row_btn.bind('click', addRow);
		

	}
	
	var Editor = function(el) {
		options.editor.find('.selector').attr('value', "")
		options.editor.find('.start').attr('value', "")
		options.editor.find('.end').attr('value', "")
		options.editor.find('.easing').attr('value', "")
		options.editor.find('.values').html('<div class="title">Values</div>')
		
		options.editor.find('.selector').attr('value', el.data('animationObj').element)
		options.editor.find('.start').attr('value', el.data('animationObj').start)
		options.editor.find('.end').attr('value', el.data('animationObj').end)
		options.editor.find('.easing').attr('value', el.data('animationObj').easing)
		for (var val in el.data('animationObj').values) {
			vR = $("<div class='val-row'></div>");
			var typeSelect = $('<select class="type"></select>');
			for(i=0;i<cssArray.length;i++) {
				typeSelect.append('<option value="'+cssArray[i]+'">'+cssArray[i]+'</option>');
			}
			typeSelect.find("option[value='"+val+"']").attr('selected', 'selected')
			vR.append( typeSelect ) 
			vR.append( $("<input name='start' type='text' value='"+el.data('animationObj').values[val].s+"' />") )
			vR.append( $("<input name='end' type='text' value='"+el.data('animationObj').values[val].e+"' />") )
			vR.append( $("<div class='remove'>X</div>") )
			options.editor.find('.values').append(vR)
			
		};
		
		options.editor.data('reference', el);
		
		options.editor.find(".save.btn").unbind().bind('click', function() {
			var values = {};
			if(options.editor.find('.val-row').length < 1 || options.editor.find('.val-row input[name=type]').attr('value') == '' || options.editor.find('.val-row input[name=start]').attr('value') == '' || options.editor.find('.val-row input[name=end]').attr('value') == '' ) {
				alert('there must be values set to save')
				return false;
			}
			if( options.editor.find('.main').find('.selector').attr('value') == '' || options.editor.find('.main').find('.start').attr('value') == '' || options.editor.find('.main').find('.end').attr('value') == '' || options.editor.find('.main').find('.easing').attr('value') == '' ) {
				alert('selector, start, end and easing must be specified')
				return false;
			}
			$.each( options.editor.find('.val-row'), function() {
				values[$(this).find('select.type').val()] = {s: parseInt($(this).find('input[name=start]').attr('value') ), e: parseInt($(this).find('input[name=end]').attr('value') ) }
			})
        	var row = options.editor.data('reference');
        	row.data({
        			animationObj: {
	        			'element':options.editor.find('.selector').attr('value'), 
	        			'start':parseInt(options.editor.find('.start').attr('value')), 
	        			'end':parseInt(options.editor.find('.end').attr('value')), 
	        			'easing':options.editor.find('.easing').attr('value'), 
	        			'values':values}
        			});
        			row.css({'left': options.editor.find('.start').attr('value')/options.zoom, 'width': (options.editor.find('.end').attr('value') - options.editor.find('.start').attr('value') )/options.zoom})
        			
			values = JSON.stringify( values )
        	row.find('.values').html('').append("<span class='preview' >"+options.editor.find('.selector').attr('value')+"</span><span class='preview' >"+values+"</span><span class='preview' >"+options.editor.find('.easing').attr('value')+"</span></div>");
        	
        	
        });
        
        options.editor.find(".remove.btn").unbind().bind('click', function() {
        	var answer = confirm('do you really want to remove this animation reference?')
        	if(answer) {
        		options.editor.data('reference').remove();
        	} else {
        		return false;
        	}
        })
        
        options.editor.find(".val-row").find(".remove").bind('click', function() {
        	$(this).parent().remove();
        })
        
        options.editor.find(".add.btn").bind('click', function() {
        	vR = $("<div class='val-row'><input name='start' type='text' value='' /><input name='end' type='text' value='' /><div class='remove'>X</div></div>");
        	var typeSelect = $('<select class="type"></select>');
			for(i=0;i<cssArray.length;i++) {
				typeSelect.append('<option value="'+cssArray[i]+'">'+cssArray[i]+'</option>');
			}
			vR.prepend(typeSelect);
			options.editor.find('.values').append(vR)
			
			options.editor.find(".remove").bind('click', function() {
	        	$(this).parent().remove();
	        })
        })
		
	}
	
	var addRow = function() {
		var newObj = {element:'', startend: {s: '', e: ''}, values: {}, easing: 'none'};
		var rF = $( rowFormat(newObj) );
		rF.css('width', 200)
		rF.data( {animationObj: newObj} );
		Element.append( rF );
		enableUI();
		rF.trigger('click');
		$('#timeline').scrollTop(200000)
	}
	
	var saveJSON = function() {
	
		JSONP = ""; 
		options.jsonArray = [];
		$(".ui-row").each( function(index, element) {   
			var row = '{ "element": "'+ $(this).data('animationObj').element+'", "values": '+ JSON.stringify( $(this).data('animationObj').values )+', "startend": {"s":'+$(this).data('animationObj').start+',"e": '+$(this).data('animationObj').end+'}, "unit": "px", "easing": "'+$(this).data('animationObj').easing+'" }';
			options.jsonArray.push($.parseJSON(row))
			row += ', ';
			JSONP += row
		});
		$.ajax({
            type: "POST",
            url: "libs/write-data.php",
            dataType: 'text',
            data: { json: JSONP, file: options.currentFile, varName: options.currentVar  }
        });
	}
	
	
	scrollTimeLineGUIInitialize(_options, callback)
	
	////PUBLIC METHODS
	
	this.model = function() {
		return options;
	}
	
	this.element = function() {
		return options.element;
	}
	
	this.print = function() {
		printJSON();
	}
	
}