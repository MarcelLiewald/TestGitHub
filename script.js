$(document).ready(function(){
	/* DEKLARARTIONEN UND INITIALISIERUNGEN */
	
	//Variablen
	var drag = false;
	
	
	/* Funktionen*/
	
	//"debugging"
	function Bla(bla) {
		alert(bla);
	}
	
	//Getter des Images "Mitarbeiter" 
	function getPositionMitarbeiter(){
		var posMit = $("#imgMit").position();
		
		return posMit;
	}
	
	//Getter des Images "Roboter" 
	function getPositionRobot(){
		var posRob =$("#imgRob").position();
		
		return posRob;
	}
	
	//Setter für Position des Mitarbeiters
	function setXMit(x){
		$('#x_Mit').html(x);
		
	}
	
	function setYMit(y){
		$('#y_Mit').html(y);
		
	}
	
	//Setter für Position des Roboters
	function setXRob(x){
		$('#x_Rob').html(x);
		
	}
	
	function setYRob(y){
		$('#y_Rob').html(y);
		
	}
	
	
	
	//Wertetabelle ausfüllen
	function fillTable( ){
		var xRob = Math.round(getPositionRobot().left);
		var yRob = Math.round(getPositionRobot().top);
		
		$('#x_Rob').html(xRob);
		$('#y_Rob').html(yRob);
		
		var xMit = Math.round(getPositionMitarbeiter().left);
		var yMit = Math.round(getPositionMitarbeiter().top);
		
		$('#x_Mit').html(xMit);
		$('#y_Mit').html(yMit);
	}
		
	// Getter & Setter für V von Mitarbeiter
	function getVMit(){
		var vMit = $('#v_Mit').text();
		
		return vMit;
	}
	
	function setVMit(v){
		$('#v_Mit').html(v);
		
	}
	
	
	//Gewinnbedingung prüfen
	function gewinnPruefen(){
		var x = parseInt($('#x_Rob').text(),10);
		var y = parseInt($('#y_Rob').text(),10);
		if (x<= 710 && x>=480 ){
			if (y<=350 && y>=270){
				if ( drag == false ){
					Bla("Sie haben es geschafft!!");
				}
			}
			
		}
	}
	 
	 
	 //Roboter aufnehmen
	 function grabRob(){
		 var xR = parseInt($('#x_Rob').text(),10);
		 var yR = parseInt($('#y_Rob').text(),10);
		 var xM = parseInt($('#x_Mit').text(),10);
		 var yM = parseInt($('#y_Mit').text(),10);
		 if (xR == xM && yR == yM ){
			  Bla("Mitarbeiter hat den Roboter aufgenommen");
			  
			  $("#imgRob").hide();
		 }else{
			 Bla("Roboter und Mitarbeiter befinden sich NICHT auf der gleichen Position!!");
		 }
	 }
	 
	 function dropRob(){
		 var xM = parseInt($('#x_Mit').text(),10);
		 var yM = parseInt($('#y_Mit').text(),10);
		 //setXRob(xM);
		 //setYRob(yM);
		 var posX =getPositionMitarbeiter().left;
		 var posY =getPositionMitarbeiter().top;
		 $('#imgRob').css({ 
			position: "absolute",
			marginLeft: 0, marginTop: 0,
			top: posY, left: posX
		}).appendTo('body');
		fillTable();
		 $("#imgRob").show();
	 }
	
	
	/*PROGRAMMABLAUF*/
	

	// "Startbefüllung" der Seite	
	Bla("hello");
	$("#mitteSteuerung").append('<center><button id="drag" class=buttonPfeil><img src="imgDrag.jpg"></button></center>');
	fillTable();
	
	
	
	
		
	//neue Geschwindigkeit wählen
	$('#vSet1').click(function(){
			setVMit(1);	
	});
	
	$('#vSet10').click(function(){
			setVMit(10);	
	});
	
	$('#vSet100').click(function(){
			setVMit(100);	
	});
	
	// Mitarbeiter Bewegungsaktionen
	$('#rechts').click(function(){
		var posX =getPositionMitarbeiter().left;
		var posY =getPositionMitarbeiter().top;
		var vR =getVMit();
		var v = parseInt(vR,10);
		var posZiel=posX+v;
		$('#imgMit').css({ 
			position: "absolute",
			marginLeft: 0, marginTop: 0,
			top: posY, left: posZiel
		}).appendTo('body');
		fillTable();		
		gewinnPruefen();
	}); 
	
	$('#links').click(function(){
		var posR =getPositionMitarbeiter().left;
		var posX = parseInt(posR,10);
		var vR =getVMit();
		var v = parseInt(vR,10);
		var posZiel=posX-v;;
		var posY =getPositionMitarbeiter().top;
		//if( posZiel <= 720 && posZiel >=30){
		$('#imgMit').css({ 
			position: "absolute",
			marginLeft: 0, marginTop: 0,
			top: posY, left: posZiel
		}).appendTo('body');
		
		fillTable();
		gewinnPruefen();
		//}else{
		//	Bla("Sie können hier nicht hingehen!");
			
		//}
	}); 
	
	$('#hoch').click(function(){
		var posX =getPositionMitarbeiter().left;
		var posY =getPositionMitarbeiter().top;
		var vR =getVMit();;
		var v = parseInt(vR,10);
		var posZiel=posY-v;
		$('#imgMit').css({ 
			position: "absolute",
			marginLeft: 0, marginTop: 0,
			top: posZiel, left: posX
		}).appendTo('body');
		fillTable();		
		gewinnPruefen();
		
	}); 
	
	$('#runter').click(function(){
		var posX =getPositionMitarbeiter().left;
		var posY =getPositionMitarbeiter().top;
		var vR =getVMit();
		var v = parseInt(vR,10);
		var posZiel=posY+v;
		$('#imgMit').css({ 
			position: "absolute",
			marginLeft: 0, marginTop: 0,
			top: posZiel, left: posX
		}).appendTo('body');
		fillTable();		
		gewinnPruefen();
		
	}); 
	
	$('#drag').click(function(){
		
		if (drag == false){
			grabRob();
			drag = true;
		}else if (drag==true){
			dropRob();	
			drag = false;
			gewinnPruefen();
		}else{
			Bla("Irgendwas ist schief gelaufen -.-");
		}	 
		
	}); 
	
	// Drag and Drop Funktionen 
	function allowDrop(ev) {
		Bla("allowDrop(ev)");
		ev.preventDefault();
	}

	function drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
		Bla("drag(ev)");
	}

	function drop(ev) {
		Bla("drop(ev)");
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		ev.target.appendChild(document.getElementById(data));
	}
	
	//Programmneustart
	$('#neustarten').click(function() {
    location.reload();
	});
	
	// aktuellen Tab schließeb bzw. Programm beenden
	$('#beenden').click(function() {
	window.top.close();
	});
	
});