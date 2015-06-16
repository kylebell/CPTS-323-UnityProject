#pragma strict


var Board : Transform;
var AstroidsDestroyed : TextMesh;
var AD : int=0;
var DamageDelt : TextMesh;
var DD : int=0;
var GameDuration : TextMesh;
var GD : int=0;
var Accuracy : TextMesh;
var AC : float=0;
var ItemsObtained : TextMesh;
var IO : int=0;
var ShotsFired : TextMesh;
var SF : int=0;
var WinnerText : TextMesh;
var WT : int=0;

var Shift = 0;
var Player : int =1;
private var ShiftDirection : int = 1; // 1 = right, -1 = left




public function AddShot(){SF+=1; ShotsFired.text="Shots Fired : "+SF;
						  Accuracy.text="Accuracy : "+((AC*1.0/SF*1.0)*100.0)+"%";
							}
public function AddDamage(Damage : int){DD+=Damage; DamageDelt.text="Damage Delt : "+DD;
										AC+=1; Accuracy.text="Accuracy : "+((AC*1.0/SF*1.0)*100.0)+"%";
										}
public function AddAstroid(){AD+=1; AstroidsDestroyed.text="Astroids Destroyed : "+AD;}

public function AddItem(){IO+=1; ItemsObtained.text="Items Obtained : "+IO;}


public function Showz()
{

	// Start Victory Music
	GameObject.Find("_GM").GetComponent(GameManagement).PlayVictory();
	
	// Set Game Time
	GameDuration.text = "Duration : "+Time.time;

	// Begin Shift In
	if(Player == 1){Board.position = new Vector3(-18, 1, -3.3); ShiftDirection=1;}
	else{Board.position = new Vector3(16, 1, -3.3); ShiftDirection=-1;}
	
	Shift=1;
}





function Update()
{

	if(Shift==1)
	{
		Shift = ShiftIn();
	}else if(Shift==2)
	{
		Shift = ShiftOut();	
	}else
	{
		//Time.timeScale = 0;
	}
	
}



function ShiftIn() : int
{
	if(Player==1)
	{
		Board.transform.position.x += 8*Time.deltaTime;
		if(Board.transform.position.x<-7){return 1;}else{return 0;}
	}else{
		Board.transform.position.x -= 8*Time.deltaTime;
		if(Board.transform.position.x>7){return 1;}else{return 0;}
	}
}

function ShiftOut() : int
{
	Board.transform.position.x += 8*Time.deltaTime*ShiftDirection;
	if(Board.transform.position.x<GameObject.Find("_GM").GetComponent (GameManagement).x+2.5*ShiftDirection){return 2;}else{return 0;}
}
 



