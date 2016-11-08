
function postaction(){
	var title = document.getElementById("title");
	if(title.value == "") {
		alert("内容不为空");
	}else{
		var data=ldtd();
		var todo={"title":title.value,"done":false};
		data.push(todo);
		save(data);
		var form=document.getElementById("form");
		form.reset();
		render();
	}
}

function ldtd(){
	var collection=localStorage.getItem("todo");
			if(collection!=null){
				return JSON.parse(collection);
			}else {
				return [];
			}
}

function sa(){
			var one=document.getElementById("one");
			var two=document.getElementById("two");
			var ts=one.getElementsByTagName("p");
			var ds=two.getElementsByTagName("p");
			var data=[];
					for(i=0;i<ts.length; i++){
						var todo={"title":ts[i].innerHTML,"done":false};
						data.unshift(todo);
					}
					for(i=0;i<ds.length; i++){
						var todo={"title":ds[i].innerHTML,"done":true};
						data.unshift(todo);
					}
			save(data);
}

function save(data){
	localStorage.setItem("todo",JSON.stringify(data));
}

function remove(i){
	var data=ldtd();
	var todo=data.splice(i,1)[0];
	save(data);
	render();
}

function up(i,field,value){
	var data = ldtd();
	var todo = data.splice(i,1)[0];
	todo[field] = value;
	data.splice(i,0,todo);
	save(data);
	render();
}

function panduan(i)
{
	render();
	var p = document.getElementById("p-"+i);
	title = p.innerHTML;

	p.innerHTML="<input id='input-"+i+"' value='"+title+"' />";
	var input = document.getElementById("input-"+i);
	input.setSelectionRange(0,input.value.length);
	input.focus();
	input.onblur =function(){
		if(input.value.length == 0){
			p.innerHTML = title;
			alert("内容不能为空");
		}
		else{
			up(i,"title",input.value);
		}
	};
}

function render(){
	var one=document.getElementById("one");
	var two=document.getElementById("two");
	var collection=localStorage.getItem("todo");
	if(collection!=null){
		var data=JSON.parse(collection);
		var jiShu=0;
		var jiShu1=0;
		var shuzi="";
		var shuzi1="";
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].done){
				shuzi1+="<li draggable='true'><input type='checkbox' onchange='up("+i+",\"done\",false)' checked='checked' />"
				+"<p id='p-"+i+"' onclick='panduan("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'>x</a></li>";
				jiShu1++;
			}
			else{
				shuzi+="<li draggable='true'><input type='checkbox' onchange='up("+i+",\"done\",true)' />"
				+"<p id='p-"+i+"' onclick='panduan("+i+")'>"+data[i].title+"</p>"
				+"<a href='javascript:remove("+i+")'>x</a></li>";
				jiShu++;
			
			        }
		      };
				jishu.innerHTML=jiShu;
				one.innerHTML=shuzi;
				jishu1.innerHTML=jiShu1;
				two.innerHTML=shuzi1;
                 	}
			else{
				jishu.innerHTML=0;
				one.innerHTML="";
				jishu1.innerHTML=0;
				two.innerHTML="";
			}

		
}

window.onload=render;

function clear(){
	localStorage.clear();
	render();
}
