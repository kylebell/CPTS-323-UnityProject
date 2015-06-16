#pragma strict

public var Cooldown : float = 0.25;
private var Delay : float = 0.0;
private var Dead : boolean = false;

// Character Movement / Fire
private var Fire : String;
private var LeftStickV : String;
private var LeftStickH : String;
private var RightStickV : String;
private var RightStickH : String;



// Character Speed
var MaxSpeed : float = 7;
var Acceleration : float = 1.0;

// Change Attack
private var changeAttack1 : KeyCode = KeyCode.Joystick1Button4;
private var changeAttack2 : KeyCode = KeyCode.Joystick1Button5;
var selectedAttack : int = 1;
var projectile1 : Transform;
var projectile2 : Transform;
var projectile3 : Transform; 
public var ShotPoint : Transform;
private var LastPointAngle : float = 0.0;




// Setup Controlls (Multi Controller Support)
function Start()
{
	if(GetComponent(PlayerStats).PlayerNumber == 1)
	{
		Fire = "Fire1";
		LeftStickV = "Vertical";
		LeftStickH = "Horizontal";
		RightStickV = "Vertical2";
		RightStickH = "Horizontal2";
		changeAttack1 = KeyCode.Joystick1Button4;
		changeAttack2 = KeyCode.Joystick1Button5;
	}else{
		Fire = "Fire2";
		LeftStickV = "Vertical3";
		LeftStickH = "Horizontal3";
		RightStickV = "Vertical4";
		RightStickH = "Horizontal4";
		changeAttack1 = KeyCode.Joystick2Button4;
		changeAttack2 = KeyCode.Joystick2Button5;
	}

}




function Update () 
{

	// Make sure player is still alive
	if(Dead == false)
	{
		
		// Shoot
		if(Input.GetAxis(Fire)==-1 && Time.time>Delay)
		{
		
			// Set Shot Delay
			Delay = Time.time+Cooldown;
			
			// Update Stats
			if(GetComponent(PlayerStats).PlayerNumber==1){GameObject.Find("P1 PVP Board").GetComponent(PVPScript).AddShot();}
			else if(GetComponent(PlayerStats).PlayerNumber==2){GameObject.Find("P2 PVP Board").GetComponent(PVPScript).AddShot();}

			
			if(selectedAttack == 1)
			{
				var bullet1 = Instantiate(projectile1, ShotPoint.transform.position, Quaternion.identity);
				//GameObject.Find("_GM").GetComponent (GameManagement).GameMode == "PVP";
				//bullet1.transform.position.y+=.5;
				bullet1.GetComponent(BulletScript).SetOwner(tag);
				//bullet1.GetComponent(BulletScript).owner == tag;
				//bullet1.rigidbody2D.AddForce(transform.forward*2000);
				
			}else if(selectedAttack == 2)
			{
				var bullet2 = Instantiate(projectile2, ShotPoint.transform.position, Quaternion.identity);
				bullet2.GetComponent(BulletScript).SetOwner(tag);
			
			} else if(selectedAttack == 3)
			{
				var bullet3 = Instantiate(projectile3, ShotPoint.transform.position, Quaternion.identity);
				bullet3.GetComponent(BulletScript).SetOwner(tag);
				
			}

		}


		// Change Attack
		if (Input.GetKeyUp(changeAttack2))
		{
			if (selectedAttack==3)
			{
				selectedAttack=1;
			}else{
				selectedAttack+=1;
			}
		} else if (Input.GetKeyUp(changeAttack1))
		{
			if (selectedAttack==1)
			{
				selectedAttack=3;
			}else{
				selectedAttack-=1;
			}
		}
		

		// Movement (Vertical)
		if (Input.GetAxis(RightStickV)>0 && transform.position.y>=GameObject.Find("_GM").GetComponent (GameManagement).y)
		{
			rigidbody2D.velocity.y = 0;
		}else if (Input.GetAxis(RightStickV)<0 && transform.position.y<=GameObject.Find("_GM").GetComponent (GameManagement).y*-1)
		{
			rigidbody2D.velocity.y = 0;
		}else
		{
			if(rigidbody2D.velocity.y<MaxSpeed){rigidbody2D.velocity.y += MaxSpeed*2.9*Acceleration*Time.deltaTime*Input.GetAxis(RightStickV);}
			//rigidbody2D.velocity.y += speed*Input.GetAxis(RightStickV);
		}

		// Movement (Horizontal)
		if (Input.GetAxis(RightStickH)>0 && transform.position.x>=GameObject.Find("_GM").GetComponent (GameManagement).x)
		{
			rigidbody2D.velocity.x = 0;
		}else if (Input.GetAxis(RightStickH)<0 && transform.position.x<=GameObject.Find("_GM").GetComponent (GameManagement).x*-1)
		{
			rigidbody2D.velocity.x = 0;
		}else
		{
			if(rigidbody2D.velocity.x<MaxSpeed){rigidbody2D.velocity.x += MaxSpeed*2.9*Acceleration*Time.deltaTime*Input.GetAxis(RightStickH);}
		}
		
		
		
		var x : float;
		var y : float;
		var z : float;
		x = Input.GetAxis(LeftStickH);
		y = Input.GetAxis(LeftStickV) ;
		
		y*=-1;
		
		if(x==0&&y==0){z=LastPointAngle;}
		else if(y==0&&x<0){z=90;}
		else if(y<0&&x==0){z=180;}
		else if(y==0&&x>0){z=270;}
		else if(y>0&&x==0){z=0;}
		else if(y>0&&x<0){z = (Mathf.Atan((x*-1.0)/(y*1.0))*180)/Mathf.PI;}
		else if(y<0&&x<0){z = (Mathf.Atan((y*-1.0)/(x*-1.0))*180)/Mathf.PI+90.0;}
		else if(y<0&&x>0){z = (Mathf.Atan((x*1.0)/(y*-1.0))*180)/Mathf.PI+180.0;}
		else if(y>0&&x>0){z = (Mathf.Atan((y*1.0)/(x*1.0))*180)/Mathf.PI+270.0;}

		LastPointAngle = z;
		
		transform.rotation.eulerAngles.z = LastPointAngle;
		
		//if (Input.GetAxis("Horizontal")==1){transform.rotation.eulerAngles.z-=3;}
		
		//if (Input.GetAxis("Horizontal")==-1){transform.rotation.eulerAngles.z+=3;}

		rigidbody2D.velocity.y = rigidbody2D.velocity.y/1.04;
		rigidbody2D.velocity.x = rigidbody2D.velocity.x/1.04;
		
		
		// Pause / Menu
		if (Input.GetKeyDown(KeyCode.Joystick1Button7)){GameObject.Find("_GM").GetComponent(InGameMenu).OpenMenu(true);}
		
	}
}