#pragma strict

var Button : Transform;
var Command : String;
var DefaultTexture : Sprite;
var OnHoverTexture : Sprite;
var Shift : int = 0;
var ShiftDelay : float = 0.0;
var CD : float = 0.0;
var SelectIndex : int = 0;


var enemy : Transform;



private var Selected : int = 1;


		
function Start()
{
	//Set Start Position for main menu
	if(GameObject.Find("_GM").GetComponent(GameManagement).GameMode == "Menu")
	{
		Button.position = new Vector3(-14.5, Button.position.y, -2);

		CD = Time.time + ShiftDelay;
	}
}



function Update()
{

	// Select (xbox)
	//if(GameObject.Find("_GM").GetComponent(InGameMenu).Selected == SelectIndex){XboxSelect();}else{XboxUnSelect();}
	//if(GameObject.Find("_GM").GetComponent(InGameMenu).Selected == SelectIndex && Input.GetKeyDown(KeyCode.Joystick1Button0)){XboxPick();}


	// Shift Stuff
	if(Shift==1&&Time.time>=CD)
	{
		Shift = ShiftIn();
	}else if(Shift==2&&Time.time>=CD)
	{
		Shift = ShiftOut();	
	}

}



function ShiftIn() : int
{
	Button.transform.position.x += 25*Time.deltaTime;
	if(Button.transform.position.x<0){return 1;}else{Button.transform.position.x=0; return 0;}
}

function ShiftOut() : int
{
	Button.transform.position.x -= 25*Time.deltaTime;
	if(Button.transform.position.x>-14){return 2;}else{Button.transform.position.x=-14.5;return 0;}
}


// TESSSSSSSSSSSSSSSSSSSSSSSST
function Spawn()
{
	var enemyvar = Instantiate(enemy, new Vector3(0,0,0), Quaternion.identity);
}



function XboxSelect(){GetComponent(SpriteRenderer).sprite = OnHoverTexture;}
function XboxUnSelect(){GetComponent(SpriteRenderer).sprite = DefaultTexture;}
function XboxPick()
{
	GameObject.Find("_GM").GetComponent (GameManagement).PlaySelect();
	if(Command=="Resume"){GameObject.Find("_GM").GetComponent (InGameMenu).OpenMenu(false);}
	else if(Command=="Exit"){GameObject.Find("_GM").GetComponent (InGameMenu).MainMenu();}
	else if(Command=="Single Player"){GameObject.Find("_GM").GetComponent (InGameMenu).SinglePlayer();}
	else if(Command=="Multiplayer"){GameObject.Find("_GM").GetComponent (InGameMenu).Multiplayer();}
	else if(Command=="PVP Fixed"){GameObject.Find("_GM").GetComponent (InGameMenu).PVPFixed();}
	else if(Command=="PVP Open"){GameObject.Find("_GM").GetComponent (InGameMenu).PVPOpen();}
	else if(Command=="Back"){GameObject.Find("_GM").GetComponent (InGameMenu).Back();}
}



function OnMouseDown()
{
	GameObject.Find("_GM").GetComponent (GameManagement).PlaySelect();
}

function OnMouseUp()
{
	if(Command=="Resume"){GameObject.Find("_GM").GetComponent (InGameMenu).OpenMenu(false);}
	else if(Command=="Exit"){GameObject.Find("_GM").GetComponent (InGameMenu).MainMenu();}
	else if(Command=="Single Player"){GameObject.Find("_GM").GetComponent (InGameMenu).SinglePlayer();}
	else if(Command=="Multiplayer"){GameObject.Find("_GM").GetComponent (InGameMenu).Multiplayer();}
	else if(Command=="PVP Fixed"){GameObject.Find("_GM").GetComponent (InGameMenu).PVPFixed();}
	else if(Command=="PVP Open"){GameObject.Find("_GM").GetComponent (InGameMenu).PVPOpen();}
	else if(Command=="Back"){GameObject.Find("_GM").GetComponent (InGameMenu).Back();}
	else if(Command=="Spawn"){Spawn();}
}




function OnMouseEnter()
{
	GetComponent(SpriteRenderer).sprite = OnHoverTexture;
}

function OnMouseExit()
{
	GetComponent(SpriteRenderer).sprite = DefaultTexture;
}