#pragma strict

var BackDropImage : Sprite;
var BackDrop : Transform;
var PanelObject : Transform;

var Enemy1 : Transform;
var Enemy2 : Transform;
var ItemRepair : Transform;
var ItemAttackSpeed : Transform;



public var Menu : boolean = false;
private var Fade : int = 4; // 1 = FadeIn , 2 = FadeOut , 3 = FadedIn , 4 = FadedOut
private var FadeLevel : float;
private var FadeSpeed : float = 1.8;
private var Shift : int = 0; // 1 = ShiftIn , 2 = ShiftOut

private var MM : int = 0;
private var SP : int = 0;
private var PVPF : int = 0;
private var PVPO : int = 0;

private var Resume;
private var Panel;

public var Selected : int = 0;
private var SelectDelay : float = 0.0;
private var MainButtons : int[]=[1,2,3,4];
private var MultiplayerButtons : int[]=[5,6,7,8];



function Start()
{
// Setup Backdrop
	BackDrop.GetComponent(SpriteRenderer).sprite = BackDropImage;
	var x : float = ((Screen.width*1.0)/700.06);
	var y : float = ((Screen.height*1.0)/400.041);
	BackDrop.localScale = new Vector2(x,y);
	BackDrop.transform.position = new Vector3(0,0,-4);
	BackDrop.renderer.material.color.a = 1.0;
	Fade = 2;
	FadeSpeed = .5;
	FadeLevel = 0.0;
}




// In Game Menu
public function OpenMenu(answer : boolean)
{
	if(answer == true && Menu == false)
	{
		// Setup the Texture and the scale
		BackDrop.transform.position = new Vector3(0,0,-3);
		
		// Side Panel
		PanelObject.position = new Vector3(GameObject.Find("_GM").GetComponent (GameManagement).x+2.5, 0, -4.8);
		Shift = 1;
		
		//FadeIn the texture
		
		Fade = 1;
		FadeLevel = .7;
		Menu = true;
		
	}else if(answer == false && Menu == true)
	{
		FadeLevel=0.0;
		Fade = 2;
		Shift = 2;
		Menu  = false;
	}
}


function Update()
{
	// Fade Loop
	if(Fade==1)
	{
		Fade=FadeIn(FadeLevel,1,FadeSpeed,BackDrop);
	}else if(Fade==2)
	{
		Fade=FadeOut(FadeLevel,-1,FadeSpeed,BackDrop);
	}else
	{
		if(MM==1){Application.LoadLevel("InvadersTest");}
		if(SP==1){Application.LoadLevel("Invaders lvl 1");}
		if(PVPF==1){Application.LoadLevel("Player vs Player");}
		if(PVPO==1){Application.LoadLevel("Player vs Player 2");}

	}
	
	
	
	// Shift Loop
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
	
	
	
	
	// Xbox Controlls
	if (Input.GetAxis("Vertical")==-1&&Time.time>SelectDelay)
	{
		SelectDelay=Time.time+0.25;
		
		if(Selected==0){Selected=4;}
		else if(Selected==4){Selected=3;}
		else if(Selected==3){Selected=2;}
		else if(Selected==2){Selected=1;}
		else if(Selected==1){Selected=4;}
		
	}else if (Input.GetAxis("Vertical")==1&&Time.time>SelectDelay)
	{
		SelectDelay=Time.time+0.25;
		if(Selected==0){Selected=1;}
		else if(Selected==1){Selected=2;}
		else if(Selected==2){Selected=3;}
		else if(Selected==3){Selected=4;}
		else if(Selected==4){Selected=1;}
	}
	
}


public function GrayOut()
{
	var x : float = ((Screen.width*1.0)/700.06);
	var y : float = ((Screen.height*1.0)/400.041);
	BackDrop.localScale = new Vector2(x,y);
	BackDrop.transform.position = new Vector3(0,0,-3);
	FadeLevel=.6;
	FadeSpeed = .8;
	Fade = 1;
	Invoke("MainMenu",15);
}


function MainMenu()
{
	BackDrop.transform.position = new Vector3(0,0,-4);
	FadeLevel=1.0;
	FadeSpeed = .2;
	Fade = 1;
	MM = 1;
	Shift = 2;
}

function SinglePlayer()
{
	FadeLevel=1.0;
	FadeSpeed = .2;
	Fade = 1;
	SP = 1;
	
	GameObject.Find("Buttonv21").GetComponent(CustomButton).CD = Time.time+0;
	GameObject.Find("Buttonv22").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv23").GetComponent(CustomButton).CD = Time.time+.5;
	GameObject.Find("Buttonv24").GetComponent(CustomButton).CD = Time.time+.75;
	
	GameObject.Find("Buttonv21").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv22").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv23").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv24").GetComponent(CustomButton).Shift = 2;
}


function Multiplayer()
{	
// Depth 1
	GameObject.Find("Buttonv21").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv22").GetComponent(CustomButton).CD = Time.time+0;
	GameObject.Find("Buttonv23").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv24").GetComponent(CustomButton).CD = Time.time+.5;
	
	GameObject.Find("Buttonv21").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv22").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv23").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv24").GetComponent(CustomButton).Shift = 2;
	
// Multiplayer
	GameObject.Find("Buttonv25").GetComponent(CustomButton).CD = Time.time+0;
	GameObject.Find("Buttonv26").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv27").GetComponent(CustomButton).CD = Time.time+.5;
	GameObject.Find("Buttonv28").GetComponent(CustomButton).CD = Time.time+.75;
	
	GameObject.Find("Buttonv25").GetComponent(CustomButton).Shift = 1;
	GameObject.Find("Buttonv26").GetComponent(CustomButton).Shift = 1;
	GameObject.Find("Buttonv27").GetComponent(CustomButton).Shift = 1;
	GameObject.Find("Buttonv28").GetComponent(CustomButton).Shift = 1;
}


function PVPFixed()
{
	FadeLevel=1.0;
	FadeSpeed = .2;
	Fade = 1;
	PVPF = 1;
	
	GameObject.Find("Buttonv25").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv26").GetComponent(CustomButton).CD = Time.time+0;
	GameObject.Find("Buttonv27").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv28").GetComponent(CustomButton).CD = Time.time+.5;
	
	GameObject.Find("Buttonv25").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv26").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv27").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv28").GetComponent(CustomButton).Shift = 2;
}

function PVPOpen()
{
	FadeLevel=1.0;
	FadeSpeed = .2;
	Fade = 1;
	PVPF = 1;
	
	GameObject.Find("Buttonv25").GetComponent(CustomButton).CD = Time.time+5;
	GameObject.Find("Buttonv26").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv27").GetComponent(CustomButton).CD = Time.time+.0;
	GameObject.Find("Buttonv28").GetComponent(CustomButton).CD = Time.time+.25;
	
	GameObject.Find("Buttonv25").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv26").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv27").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv28").GetComponent(CustomButton).Shift = 2;
}


function Back()
{	
// Depth 1
	GameObject.Find("Buttonv21").GetComponent(CustomButton).CD = Time.time+.75;
	GameObject.Find("Buttonv22").GetComponent(CustomButton).CD = Time.time+.5;
	GameObject.Find("Buttonv23").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv24").GetComponent(CustomButton).CD = Time.time+0;
	
	GameObject.Find("Buttonv21").GetComponent(CustomButton).Shift = 1;
	GameObject.Find("Buttonv22").GetComponent(CustomButton).Shift = 1;
	GameObject.Find("Buttonv23").GetComponent(CustomButton).Shift = 1;
	GameObject.Find("Buttonv24").GetComponent(CustomButton).Shift = 1;
	
// Multiplayer
	GameObject.Find("Buttonv25").GetComponent(CustomButton).CD = Time.time+.75;
	GameObject.Find("Buttonv26").GetComponent(CustomButton).CD = Time.time+.5;
	GameObject.Find("Buttonv27").GetComponent(CustomButton).CD = Time.time+.25;
	GameObject.Find("Buttonv28").GetComponent(CustomButton).CD = Time.time+0;
	
	GameObject.Find("Buttonv25").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv26").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv27").GetComponent(CustomButton).Shift = 2;
	GameObject.Find("Buttonv28").GetComponent(CustomButton).Shift = 2;
}

function ShiftIn() : int
{
	PanelObject.transform.position.x -= 8*Time.deltaTime;
	if(PanelObject.transform.position.x>GameObject.Find("_GM").GetComponent (GameManagement).x-2){return 1;}else{return 0;}
}

function ShiftOut() : int
{
	PanelObject.transform.position.x += 8*Time.deltaTime;
	if(PanelObject.transform.position.x<GameObject.Find("_GM").GetComponent (GameManagement).x+2.5){return 2;}else{return 0;}
}

function FadeIn(alphaEnd : float, fadeDir : int, fadeSpeed : float, Txt : Transform) : int
{
		var alphaStart = Txt.renderer.material.color.a;
	    alphaStart += fadeDir * fadeSpeed * Time.deltaTime;  
	    alphaStart = Mathf.Clamp01(alphaStart);
	    Txt.renderer.material.color.a = alphaStart;   
	    if(alphaStart<alphaEnd){return 1;}else{return 0;}
 }
 
 function FadeOut(alphaEnd : float, fadeDir : int, fadeSpeed : float, Txt : Transform) : int
{
		var alphaStart = Txt.renderer.material.color.a;
	    alphaStart += fadeDir * fadeSpeed * Time.deltaTime;  
	    alphaStart = Mathf.Clamp01(alphaStart);
	    Txt.renderer.material.color.a = alphaStart;   
	    if(alphaStart>alphaEnd){return 2;}else{return 0;}
 }


