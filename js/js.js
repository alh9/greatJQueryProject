$(document).ready(function(){
//right click ro hanuz ok nakardam ke nayad az page birun
//add white spaces to code to be more readable
//do optimization after it goes right
  var oddOrEven = 0;
  var myStudent = [];
  var oddOrEven2 =0;
  var T = setInterval(myTimer);
  var sortName = $('table thead tr th:nth-of-type(2) img');
  var sortTurn = $('table thead tr th:nth-of-type(3) img');
  var no = $('div#delCheck ~ p:last-of-type'); 
  var yes = $('div#delCheck ~ p#yes1');
  var yes2 = $('div#delCheck ~ p#yes2');
  var addBtn = $('form#myform button:first-of-type');
  var deleteBtn = $('form#myform button:last-of-type');
  var none = '<tr><td></td><td><p class="none">no result</p></td><td><p class="none">no result</p></td><td></td></tr>';
  var lengthPlace = $('table tfoot tr:first-of-type th:last-of-type');
  var maxPlace = $('table tfoot tr:last-of-type th:last-of-type');
  var myStudentBox = myStudent; 
  var bullet = $('div#delDone img')
  var rgb = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']  
  var color1='e';
  var color2='c';
  var clickCount ;
  var zarib;
  var zarib2;
  read(myStudent);
  
  bullet.on({mouseenter:greenBul,mouseleave:redBul,click:manualHide})
  yes.on({mouseenter:beGreen ,mouseleave: beWhite , click:okDelete})
  no.on({mouseenter:beRed ,mouseleave: beWhite , click:nokDelete})
  yes2.on({mouseenter:beGreen ,mouseleave: beWhite })
  $('*').contextmenu(function(){//right click //chera harbar ke right click mikonim in dobar ejra mishe??
	event.preventDefault();// console.count()
	var whereAmI = event.clientX;
	if(whereAmI>$(window).width()-100)
		whereAmI-=100;
	$('#rightClick').css({left:whereAmI,top:event.clientY}).fadeIn();//location for right click menus
	})
  $('body').click(function(){//when we click on body , the right click menu should fade out
	$('#rightClick').fadeOut();
  })
  $('div#rightClick div').on({click:changeColor})
  function myTimer() {//the timer
    var d = new Date();
    $('p#clock').text(d.toLocaleTimeString());
  }
  $('input#sName').on('focus',function(){
	$('input#sName').val('')	
  })
  $(window).scroll(function(){
	var st = $(document).scrollTop();
    if(st>=200)
		$('div.toTop').fadeIn();
	else 
		$('div.toTop').fadeOut();
  })  
  $('div.toTop').click(function(){
	  $('body').animate({scrollTop:0},2000)
  })
  function greenBul(){$(this).attr('src','img/bullet2.png')}//make the bullet green
  function redBul(){$(this).attr('src','img/bullet1.png')}//make the bullet red
  function manualHide(){$('div#delDone').hide()}//hide the black modal manually
  function beGreen(){$(this).parent().css('backgroundColor' , '#64dd22')}//the green hover for yes in modal
  function beWhite(){$(this).parent().css('backgroundColor' , 'white')}//mouse leave for yes and no in modal
  function beRed(){$(this).parent().css('backgroundColor' , 'red')}//the red hover for no in modal
  function changeColor(){
	var fard = $(this).children().text().toLowerCase()
	for(i in rgb){		  
	  if(fard==rgb[i]){
	    if(i-5<0){i=15-(i-5);var zoj=rgb[i]}
		else{var zoj = rgb[i-5]}
	  }
	  color1=fard;
	  color2=zoj;
	  }
	$('tr:nth-of-type(even) td').css('backgroundColor','#'+fard+fard+fard);
	$('tr:nth-of-type(odd) td').css('backgroundColor','#'+zoj+zoj+zoj);
  }
  function editInLocate(){//edit
	$('table tbody tr td:nth-last-of-type(2) img').on('click',function zasem(){
	  var editable = $(this).parent().siblings().eq(1)
	  
	  var nToEdit = $(this).parent().siblings().first().text()
	  var n2 = Number(nToEdit);
	  var placeHolder=$(this).parent().parent().find('td').eq(1).text();
	  if(this.src!='file:///D:/web/1project/JS%20Project/img/save.png'){
		$(this).attr('src','img/save.png');
		$(this).parent().siblings('td.editable').html("<input value = '"+placeHolder+"'></input>")
		$('table tbody tr td:nth-last-of-type(2) img').off('click')
		$(this).on('click',zasem)	
		}//pashmaaaam az in nokte ei ke inja yad gereftam =))))))) ba if kar nakard chon har dotasho hamzaman check mikard vali else ke gozashtam rahat ok shod chon avval if ro check kard 
	  else{
		var valueToSave= $(this).parent().siblings('td.editable').children().val()	
		$(this).attr('src','img/edit.png')
		myStudent[n2-1].name=valueToSave;
		read(myStudent,color1,color2)
	    }
	})
  }  
  function delDoneModal(f){
	$('div#delDone span#name').text(f[0].name);
    $('div#delDone span#turn').text(f[0].Turn);
	$('div#delDone').css('display','block')
    $('div#delDone').show('fast','linear',function(){$('div#delDone').delay(3000).hide(1000)})
  }
  function maxOfTurn(myStudentBox){
	var k ;  
    if (myStudentBox.length==1){var max = myStudentBox[0].Turn;}
	else{var max = 0}
	var l = 0;
	var nOfMax = [];  
	var box = []
	for(k in myStudentBox){
	  l+=1;
	  k=Number(k)
	  if(max<myStudentBox[k].Turn){
	    max = myStudentBox[k].Turn;
	    for(i=0 ; i<l;i++){
	      nOfMax[i]=l};
		  }  
	  }
	  box = nOfMax.length;
	  var maxAndNOfIt={Max : max , N : box }
	  maxPlace.text(max)
	  return maxAndNOfIt  
  }
  function read(myStudent,color1,color2){	
	
	console.log(myStudent)
	var t = '';
    var n = 0;	
    if (myStudent.length==0){$('table tbody').html(none);maxPlace.text('0');lengthPlace.text('0')}
	
	else{
	  
	  
	  for(m in myStudent){
		n+=1;
		t+=	"<tr>"+
			"<td>"+(n)+"</td>"+
			"<td class = 'editable'>"+myStudent[m].name+"</td>"+
			"<td>"+myStudent[m].Turn+"</td>"+
			'<td><img src="img/edit.png"> </td>'+
			'<td><img src="img/delete.png"> </td>'+
			"</tr>";
		$('table tbody').html(t)   
		l3(myStudent);
		maxOfTurn(myStudent);
	}}
	$('tr:nth-of-type(even) td').css('backgroundColor','#'+color1+color1+color1);
	$('tr:nth-of-type(odd) td').css('backgroundColor','#'+color2+color2+color2);
	kacku();
	editInLocate()
  }
  function kacku(){
	$('td:nth-child(5) ').on('click',function() {
	  $('div#delCheckMain').show();
		yes.hide();
		yes2.show();
		var zis = $(this).parent().find('td').first().text()
		yes2.on('click',function(){
		   $('div#delCheckMain').hide();
		   yes.show();
		   yes2.hide()
           var f2 = myStudent.splice(zis-1,1);
	       read(myStudent,color1,color2);
		   var bered2 = $('table tfoot tr:first-of-type th:last-of-type').text(l3(myStudent));
           if(l3(myStudent)!=50){bered2.css("color","black")}
           if(l3(myStudent)==0){document.getElementById('delBtn').disabled=true;}
		   delDoneModal(f2);
		   })
	    $('td:nth-child(5) ').off('click') 			
	  })
	  yes2.off('click');
	}
  function l3(myStudentBox){
	lengthPlace.text(myStudentBox.length);
	return myStudentBox.length
  };
  l3(myStudent);
  maxOfTurn(myStudent);
  if(l3(myStudent)==0){
	$('form#myform button:last-of-type').attr('disabled' , true)
  }
  addBtn.on("click" ,function(){
	event.preventDefault()
	if($('input#sName').val().trim().length==0){
	  alert('enter name');
    }
	else{
	if(l3(myStudent)==49){this.disabled=true}
	var x = $('input#sName').val();
	if(myStudent.length==0){
	  var y = Math.floor((Math.random() * 50) + 1);}
	else{
	  do {//haqiqatan bayad tarikh bezanam ke chand ruz dargir in fuckhead budam :)))
	    var y = Math.floor((Math.random() * 50) + 1);
	    var a = false;
		for(z in myStudent){
	 	  if(myStudent[z].Turn==y){
	 	    a=true
		  }
		}
	  }
	  while(a==true);
	}  
    var l = myStudent.length;
	myStudent.push({name: x , Turn: y});
    read(myStudent,color1,color2);
	
	var bered = $('table tfoot tr:first-of-type th:last-of-type').text(l);
	if(l3(myStudent)==50){bered.css("color","red")}
	if(l3(myStudent)!=0){$('form#myform button:last-of-type').attr('disabled',false)}
	maxOfTurn(myStudent)
	l3(myStudent);
	}
    });		
  deleteBtn.on("click" ,function(){
	event.preventDefault()
	$('div#delCheckMain').css('display','block');
  })
  function okDelete(){
	$('div#delCheckMain').css('display','none');
	l3(myStudent);
	var n9 = maxOfTurn(myStudent).N
    var f = myStudent.splice(n9-1,1)
	read(myStudent,color1,color2);
	var bered = $('table tfoot tr:first-of-type th:last-of-type').text(l3(myStudent));
    if(l3(myStudent)!=50){bered.css("color","black")}
    if(l3(myStudent)==0){document.getElementById('delBtn').disabled=true;}
	delDoneModal(f);
  }
  $('table thead img#filName').on('click',function(){
	$(this).after("<input id = 'filterName' placeholder='Filter Name'>")
    $(this).remove()
    filter1()	
  })
  $('table thead img#filTurn').on('click',function(){
	$(this).after("<input id = 'filterTurn' placeholder='Filter Turn'>")
    $(this).remove()
    filter2()	
  })
  function nokDelete(){$('div#delCheckMain').hide();kacku()}
  function filter1(){
    $('table thead input#filterName').on('keyup',function(){
	  
	  var val = $(this).val().toLowerCase();
	  var myStudent2 =[]
	  read(myStudent2,color1,color2);
	  for (i in myStudent){
		if(myStudent[i].name.search(val)!=-1){
			myStudent2.push(myStudent[i])
			read(myStudent2,color1,color2);
		}
	  }
	l3(myStudent2)  
  })
  }
  function filter2(){
    $('table thead input#filterTurn').on('keyup',function(){
	  var val2 = $(this).val().toString();
	  
	  var myStudent3 =[];
	  var box = [];
	  read(myStudent3,color1,color2);
	  for (j in myStudent){
		box[j] = myStudent[j].Turn.toString()
		if(box[j].search(val2)!=-1){
			myStudent3.push(myStudent[j])
			read(myStudent3,color1,color2);
		}
	  }
	  l3(myStudent3);
	  maxOfTurn(myStudent3)
    })
  }
  sortName.on("click" ,function(){
	oddOrEven2 +=1; 
    
	if (oddOrEven2%2==0){
    myStudentSortedName(1);
	read(myStudent,color1,color2);  
    }
	else{//split ye ('') azina ezafe mizare
  
    myStudentSortedName(-1);
	read(myStudent,color1,color2);
    }
  })
  	  function myStudentSortedName(zarib){
		console.log(myStudent)
		myStudent.sort(function(a, b){
		var x = a.name.toLowerCase();
		var y = b.name.toLowerCase();
		if (x < y) {return zarib;}
		if (x > y) {return -zarib;}
		return 0;
		
		});
	  }
	  
	  	  function myStudentSortedTurn(zarib2){
		myStudent.sort(function(a, b){return zarib2*a.Turn - zarib2*b.Turn});
	  }
  sortTurn.on("click" ,function(){
	oddOrEven+=1;
	if (oddOrEven%2==0){

	  myStudentSortedTurn(-1);
	  read(myStudent,color1,color2);
    }	
	else{ 		

	  myStudentSortedTurn(1);
	  read(myStudent,color1,color2);
	}	
  })
})
//382
//jesus , 70 khat ezafiiiiii , che mikoni maaardddd?:))))))


  var numberBox = [];
  
  // if(numberBox.length>0){
  //   for (n=0;n<data.length;n++){

  //     if()
  //     var number = Math.floor((Math.random() * x) + y);
  //   }
  // }
  // else{numberBox.push(Math.floor((Math.random() * x) + y))}
  