#pragma strict

var mainCam: Camera;

var bgParticles1 : ParticleSystem;
var ReadySound : AudioClip;
var VictorySound : AudioClip;
var SelectSound : AudioClip;
var GoSound : AudioClip;
var Music : AudioClip;
var ShotSound1 : AudioClip;
var ShotSound2 : AudioClip;
var ShotSound3 : AudioClip;

private var ReadySoundPlayed : boolean = false;
private var ReadySoundDelay : float;
private var GoSoundPlayed : boolean = false;
private var GoSoundDelay : float;

var BG : Transform;
//var SpriteOptions : Sprite[] = Resources.LoadAll("Textures",Sprite);
//var bgParticles2 : ParticleSystem;

//var Player01 : Transform;
//var Player02 : Transform;

public var GameMode : String = "PVP";

public var x : double;
public var y : double;

var AstroidDelay : int = 5;
var Astroid1 : Transform;
var Astroid2 : Transform;
var Astroid3 : Transform;
private var Delay : float = 5;




function Awake ()
{
	
	ReadySoundDelay = Time.time+1;
	GoSoundDelay = Time.time+2;

	// Background Animations
	if(GameMode == "PVP")
	{
		bgParticles1.transform.position = new Vector2 (0f, mainCam.ScreenToWorldPoint (new Vector3 (0f, Screen.height, 0f)).y + 0.5f);
		bgParticles1.Play();		
	}else if(GameMode == "PVP2")
	{
		bgParticles1.transform.position.y = BG.renderer.bounds.size.y/2;
		bgParticles1.transform.position.x = 0;
		//bgParticles1.transform.position = new Vector2 (0f, mainCam.ScreenToWorldPoint (new Vector3 (0f, Screen.height, 0f)).y + 0.5f);
		bgParticles1.Play();
	}
}


function Update () {

	y = mainCam.ScreenToWorldPoint (new Vector3 (0f, Screen.height, 0f)).y;// + 0.5f;
	x = mainCam.ScreenToWorldPoint (new Vector3 (Screen.width, 0f, 0f)).x;// + 0.5f;


	if(GameMode!="Menu")
	{
	
		// Ready Sounds
		if(Time.time >= ReadySoundDelay && ReadySoundPlayed == false)
		{
			ReadySoundPlayed = true;
			audio.PlayOneShot(ReadySound,.5);
		}
		if(Time.time >= GoSoundDelay && GoSoundPlayed == false)
		{
			GoSoundPlayed = true;
			audio.PlayOneShot(GoSound,.5);
			audio.PlayOneShot(Music,.6); 
		}


			if(GameMode == "PVP")
			{
				y = mainCam.ScreenToWorldPoint (new Vector3 (0f, Screen.height, 0f)).y;// + 0.5f;
				x = mainCam.ScreenToWorldPoint (new Vector3 (Screen.width, 0f, 0f)).x;// + 0.5f;
			}else if(GameMode == "PVP2")
			{
				y = BG.renderer.bounds.size.y/2;// + 0.5f;
				x = BG.renderer.bounds.size.x/2;// + 0.5f;
			}
			//BG = x/10;
			//BG.localScale.y = y/6;
		
		// Astroid Spawn	
		if(Time.time > Delay)
		{
			Delay = Time.time + Random.Range(0,AstroidDelay);
			
			var x1 = Random.Range(Mathf.Floor(-1*x),Mathf.Floor(x)); // Game Screen X
			var y1 = Random.Range(Mathf.Floor(-1*y),Mathf.Floor(y)); // Game Screen Y
			
			var x2 = Random.Range(Mathf.Floor(x+3),Mathf.Floor(x+12)); // Right Side X
			var y2 = Random.Range(Mathf.Floor(-1*y),Mathf.Floor(y)); // Right/Left Side Y
			
			var x3 = Random.Range(Mathf.Floor((-1*x)-3),Mathf.Floor((-1*x)-12)); // Right Side X
			var y3 = Random.Range(Mathf.Floor(-1*y),Mathf.Floor(y)); // Right/Left Side Y
			
			
			
			var x4 : int;
			var y4 : int;
			var Pos : Vector2;
			
			var Ast = Mathf.Floor(Random.Range(1,5));
			
			var Side = Mathf.Floor(Random.Range(1,3));
			if(Side == 1)
			{
				Pos = new Vector2(x2,y2);
				x4 = x1-x2;
				y4 = y1-y2;
			}else if(Side == 2)
			{
				Pos = new Vector2(x3,y3);
				x4 = x1-x3;
				y4 = y1-y3;
			}
			
			
				
			if(Ast == 1)
			{
				var Astroid11 = Instantiate(Astroid1, Pos, Quaternion.identity);
				Astroid11.rigidbody2D.AddForce(new Vector2(x4*1050,y4*1050));
			}else if(Ast == 2)
			{
				var Astroid22 = Instantiate(Astroid2, Pos, Quaternion.identity);
				Astroid22.rigidbody2D.AddForce(new Vector2(x4*1050,y4*1050));
			}else if(Ast == 3)
			{
				var Astroid33 = Instantiate(Astroid3, Pos, Quaternion.identity);
				Astroid33.rigidbody2D.AddForce(new Vector2(x4*1050,y4*1050));
			}
			
		}
	}

		//Move each wall to its edge location
		//topWall.size = new Vector2 (mainCam.ScreenToWorldPoint (new Vector3 (Screen.width* 2f, 0f, 0f)).x, 1f);
		//topWall.center = new Vector2 (0f, mainCam.ScreenToWorldPoint (new Vector3 (0f, Screen.height, 0f)).y + 0.5f);
		
		//bottomWall.size = new Vector2 (mainCam.ScreenToWorldPoint (new Vector3 (Screen.width* 2f, 0f, 0f)).x, 1f);
		//bottomWall.center = new Vector2 (0f, mainCam.ScreenToWorldPoint (new Vector3 (0f, 0f, 0f)).y - 0.5f);
		
		//leftWall.size = new Vector2 (1f, mainCam.ScreenToWorldPoint (new Vector3 (0f, Screen.height* 2f, 0f)).y);
		//leftWall.center = new Vector2 (mainCam.ScreenToWorldPoint (new Vector3 (0f, 0f, 0f)).x - 0.5f, 0f);
		
		//rightWall.size = new Vector2 (1f, mainCam.ScreenToWorldPoint (new Vector3 (0f, Screen.height* 2f, 0f)).y);
		//rightWall.center = new Vector2 (mainCam.ScreenToWorldPoint (new Vector3 (Screen.width, 0f, 0f)).x + 0.5f, 0f);
		
		//Player01.position.x = mainCam.ScreenToWorldPoint (new Vector3 (Screen.width/2-100f, 0f, 0f)).x;
		//Player02.position.x = mainCam.ScreenToWorldPoint (new Vector3 (Screen.width-75f, 0f, 0f)).x;
	
	
	
}

function OnGUI()
{
	if(GameMode!="Menu")
	{
		GUI.Box(new Rect(Screen.width-160, 10, 90, 30),new Texture2D(0,0));
		GUI.Label (new Rect (Screen.width-150, 15, 100, 30), Time.time.ToString());
	}
}



// Sounds
public function PlaySelect()
{
	audio.PlayOneShot(SelectSound);
}

public function PlayVictory()
{
	audio.Stop();
	audio.PlayOneShot(VictorySound,.5);
}

public function PlayShotFire1()
{
	audio.PlayOneShot(ShotSound1);
}
public function PlayShotElectric1()
{
	audio.PlayOneShot(ShotSound2);
}
public function PlayShotIce1()
{
	audio.PlayOneShot(ShotSound3);
}




// Game Over
public function GameOverz()
{
	GameObject.Find("P1 PVP Board").GetComponent(PVPScript).Showz();
	GameObject.Find("P2 PVP Board").GetComponent(PVPScript).Showz();
	GetComponent(InGameMenu).GrayOut();
	
}


