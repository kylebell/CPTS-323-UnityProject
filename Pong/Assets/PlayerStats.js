#pragma strict

// Player Organization / Stats
public var PlayerNumber : int =1;

var PlayerHealth : float = 100.00;
var PlayerShield : float = 100.00;
var ShieldRecharge : float = 0.5;
private var Delay : int;

// GUI Attack Bar
var boxempty : Texture2D;
var boxselected : Texture2D;
public var selectedAttack : int = 1;


// GUI Health / Shield
private var HealthTexture : Texture2D;
private var ShieldTexture : Texture2D;

// Effects
var DeathEffect : ParticleSystem;






// Texture Setup
function Start () {

	HealthTexture = new Texture2D(1,1);
	HealthTexture.SetPixel(0,0,Color.red);
	HealthTexture.Apply();
	
	ShieldTexture = new Texture2D(1,1);
	ShieldTexture.SetPixel(0,0,Color.blue);
	ShieldTexture.Apply();

}


// Health / Shield / Attack Bars
function OnGUI()
{
	if(PlayerNumber == 1)
	{
		if(selectedAttack==1){GUI.Box(new Rect(20, Screen.height-35, 25, 25),boxselected);}else{GUI.Box(new Rect(20, Screen.height-35, 25, 25),boxempty);}
		if(selectedAttack==2){GUI.Box(new Rect(45, Screen.height-35, 25, 25),boxselected);}else{GUI.Box(new Rect(45, Screen.height-35, 25, 25),boxempty);}
		if(selectedAttack==3){GUI.Box(new Rect(70, Screen.height-35, 25, 25),boxselected);}else{GUI.Box(new Rect(70, Screen.height-35, 25, 25),boxempty);}
		
		// Draw Health / Shields
		GUI.Box(new Rect(0, Screen.height-160, 20, 150),boxempty);
		GUI.DrawTexture(new Rect(5, Screen.height-155+(140-140*(PlayerHealth/100)), 5, 140*(PlayerHealth/100)),HealthTexture);
		GUI.DrawTexture(new Rect(10, Screen.height-155+(140-140*(PlayerShield/100)), 5, 140*(PlayerShield/100)),ShieldTexture);
	}
	
	if(PlayerNumber == 2)
	{
		if(selectedAttack==1){GUI.Box(new Rect(20, 20, 25, 25),boxselected);}else{GUI.Box(new Rect(20, 20, 25, 25),boxempty);}
		if(selectedAttack==2){GUI.Box(new Rect(45, 20, 25, 25),boxselected);}else{GUI.Box(new Rect(45, 20, 25, 25),boxempty);}
		if(selectedAttack==3){GUI.Box(new Rect(70, 20, 25, 25),boxselected);}else{GUI.Box(new Rect(70, 20, 25, 25),boxempty);}
		
		// Draw Health / Shields
		GUI.Box(new Rect(0, 20, 20, 150),boxempty);
		GUI.DrawTexture(new Rect(5, 25, 5, 140*(PlayerHealth/100)),HealthTexture);
		GUI.DrawTexture(new Rect(10, 25, 5, 140*(PlayerShield/100)),ShieldTexture);
		
	}
	
}


public function Hit(damage : int)
{

	if(GetComponent(PlayerController).Dead == false)
	{
		// Apply Damage
		PlayerShield -= damage;
		if (PlayerShield<0)
		{
			var x = PlayerShield;
			PlayerHealth += x;
			PlayerShield = 0;
		}
		
		// Check for Death
		if(PlayerHealth<=0)
		{
			GetComponent(PlayerController).Dead = true;
			PlayerHealth=0;
			DeathEffect.Play();
			GameObject.Find("_GM").GetComponent(GameManagement).GameOverz();
		}
	}
}


function Update()
{

	if(GetComponent(PlayerController).Dead == false)
	{
		// Shield Recharge
		if(Time.time >= Delay && PlayerShield != 100)
		{
			//Debug.Log(PlayerShield);
			if (PlayerShield+ShieldRecharge>100){PlayerShield=100;}
			else{PlayerShield += ShieldRecharge;}
			Delay = Time.time + 1.5;
		}
	}

}





















