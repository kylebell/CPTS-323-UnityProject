#pragma strict

var Background : Texture2D;
var SelectSound : AudioClip;
var customGuiStyle : GUIStyle;

private var MainMenu : boolean = true;
private var Multiplayer : boolean = false;
private var Options : boolean = false;


private var Selected : int = 0;
private var SelectCooldown : float = 0;
private var A : KeyCode = KeyCode.Joystick1Button0;
private var B : KeyCode = KeyCode.Joystick1Button1;

// Buttons
private var SP : boolean = false;
private var MP : boolean = false;
private var EX : boolean = false;
var BlankTexture : Texture2D;




function Update () {
	
	//Debug.Log(Selected);

	// Xbox Controller Select
	if (Input.GetAxis("Vertical2")>0 && SelectCooldown<Time.time)
	{
		SelectCooldown = Time.time+.5;
		if(Selected == 0 || Selected == 1){Selected = 3;}
		else{Selected-=1;}
		
		if(Selected == 1){GUI.FocusControl ("SinglePlayer");}
		else if(Selected == 2){GUI.FocusControl ("Multiplayer");}
		else if(Selected == 3){GUI.FocusControl ("Exit");}
	}
	
	
	if(Fade==true)
	{
		FadeOut();
	}
	

}



function OnGUI()
{
	//GUI.DrawTexture (new Rect (0,0,Screen.width,Screen.height),Background);
	
	
	if(MainMenu == true)
	{
		// Single Player Button
		//GUI.SetNextControlName ("SinglePlayer");
		SP = GUI.Button (new Rect(Screen.width *.25f, Screen.height *.15f, Screen.width *.5f, Screen.height * .15f), "Single Player");
		if (SP)
		{
			Application.LoadLevel("Invaders lvl 1");
			print ("Single Player Clicked!");
		}
		// Multiplayer
		//GUI.SetNextControlName ("Multiplayer");
		MP = GUI.Button (new Rect(Screen.width *.25f, Screen.height *.325f, Screen.width *.5f, Screen.height * .15f), "Multiplayer");
		if (MP)
		{
			audio.PlayOneShot(SelectSound);
			Multiplayer = true;
			MainMenu = false;
			//Application.LoadLevel("Player vs Player");
		}
		// Exit Button (doesnt work. dont know why =/ )
		//GUI.SetNextControlName ("Exit");
		EX = GUI.Button (new Rect(Screen.width *.25f, Screen.height *.5f, Screen.width *.5f, Screen.height * .15f), "Exit");
		if (EX)
		{
			audio.PlayOneShot(SelectSound);
			Application.Quit();
		}
	}
	else if(Multiplayer == true)
	{
		// Co-op
		if (GUI.Button (new Rect(Screen.width *.25f, Screen.height *.15f, Screen.width *.5f, Screen.height * .15f), "Co-op"))
		{
			audio.PlayOneShot(SelectSound);
		}
		// PVP - Fixed Map
		if (GUI.Button (new Rect(Screen.width *.25f, Screen.height *.325f, Screen.width *.5f, Screen.height * .15f), "PVP - Fixed Map"))
		{
			audio.PlayOneShot(SelectSound);
			//SelectedLevel="Player vs Player";
			//Fade = true;
			Application.LoadLevel("Player vs Player");
		}
		// PVP - Open Map
		if (GUI.Button (new Rect(Screen.width *.25f, Screen.height *.5f, Screen.width *.5f, Screen.height * .15f), "PVP - Open Map"))
		{
			audio.PlayOneShot(SelectSound);
			Application.LoadLevel("Player vs Player 2");
		}
		// Back
		if (GUI.Button (new Rect(Screen.width *.25f, Screen.height *.675f, Screen.width *.5f, Screen.height * .15f), "Back"))
		{
			audio.PlayOneShot(SelectSound);
			Multiplayer = false;
			MainMenu = true;
		}
	}
	

	
}

	private var Fade : boolean = false;
	private var alpha = 0.0; 
	private var fadeDir = 1;
	private var SelectedLevel : String;
function FadeOut()
{

	var fadeSpeed = 0.2;
    alpha += fadeDir * fadeSpeed * Time.deltaTime;  
    alpha = Mathf.Clamp01(alpha);   
    
    GUI.color.a = alpha;
 
    GUI.DrawTexture(
    Rect(0, 0, Screen.width, Screen.height), 
    BlankTexture);
 }
 /*
    if(alpha==1)
    {
    	Application.LoadLevel(SelectedLevel);
    }
 }*/
 
 