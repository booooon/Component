function html2node(str){
	var container = document.createElement('div');
	container.innerHTML = str;
	return container.children[0];
}

function extend(o1, o2){
	for(var i in o2) if (typeof o1[i] === 'undefined') {
		o1[i] = o2[i];
	}
	return o1;
}


var template = 
	'<div class="modal">\
		<div class="modal_warp">\
			<div class="modal_head">标题</div>\
			<div class="modal_body">内容</div>\
			<div class="modal_foot">\
				<a href="#" class="confirm">确认</a>\
				<a href="#" class="cancel">取消</a>\
			</div>\
		</div>\
	</div>'

function Modal(options){
	options = options || {};

	this.container = this._layout.cloneNode(true);

	this.body = this.container.querySelector('.modal_body');
	this.wrap = this.container.querySelector('.modal_warp');
	
	extend(this, options);

	this._initEvent();

}

extend(Modal.prototype, {
	_layout: html2node(template),

	setContent: function(content){
		if(!content) return;

		if(content.nodeType === 1){
			this.body.innerHTML = '';
			this.body.appendChild(content);
		}else{
			this.body.innerHTML = content;
		}
	},

	show: function(content){
		if(content) this.setContent(content);
		document.body.appendChild(this.container);
	},

	hide: function(){
		var container = this.container;
		document.body.removeChild(container);
	},


	_initEvent: function(){
		this.container.querySelector('.confirm').addEventListener('click', this._onConfirm.bind(this))
		this.container.querySelector('.cancel').addEventListener('click', this._onCancel.bind(this))
	
	},

	_onConfirm:function(){
		this.onConfirm();
		this.hide();
	},

	_onCancel:function(){
		this.onCancel();
		this.hide();
	}



})










