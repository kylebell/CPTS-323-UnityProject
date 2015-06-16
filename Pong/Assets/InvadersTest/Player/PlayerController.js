#pragma strict


var Cooldown : float = .25;

public var Dead : boolean = false;

// Character Movement
var moveUp : KeyCode;
var moveDown : KeyCode;
var moveLeft : KeyCode;
var moveRight : KeyCode;
var Rotate1 : KeyCode;
var Rotate2 : KeyCode;
var shoot : KeyCode;

// Character Speed
var MaxSpeed : float = 7;
var Acceleration : float = 1.0;

// Change Attack
var changeAttack : KeyCode;
var projectile1 : Transform;
var projectile2 : Transform;
var projectile3 : Transform; 
public var ShotPoint : Transform;






// ============================= IDEAS ==================================
// Ship damage effects and textures. Impared controls. shields. location damage / destructable parts
// Dual camera, Othe collision objects (Astroids), Neutral hostile units that drop buffs.
// Minimap + fog of war to accompany larger scale map with dual camera component. 
// Different ship types, Helpers, Customizable ships, ship upgrades






function Update () 
{

	// Make sure player is still alive
	if(Dead == false && GameObject.Find("_GM").GetComponent(InGameMenu).Menu == false)
	{
	
		
	
		// Shoot
		if(Input.GetKeyUp(shoot))
		{
			// Update Stats
			if(GetComponent(PlayerStats).PlayerNumber==1){GameObject.Find("P1 PVP Board").GetComponent(PVPScript).AddShot();}
			else{GameObject.Find("P2 PVP Board").GetComponent(PVPScript).AddShot();}
			
			if(GetComponent(PlayerStats).selectedAttack == 1)
			{
				var bullet1 = Instantiate(projectile1, ShotPoint.transform.position, Quaternion.identity);
				bullet1.GetComponent(BulletScript).SetOwner(tag);
				GameObject.Find("_GM").GetComponent(GameManagement).PlayShotFire1();
				//GameObject.Find("_GM").GetComponent (GameManagement).GameMode == "PVP";
				//bullet1.transform.position.y+=.5;
				//Debug.Log(tag);
				//bullet1.GetComponent(BulletScript).owner == tag;
				//bullet1.rigidbody2D.AddForce(transform.forward*2000);
				
			}else if(GetComponent(PlayerStats).selectedAttack == 2)
			{
				var bullet2 = Instantiate(projectile2, ShotPoint.transform.position, Quaternion.identity);
				bullet2.GetComponent(BulletScript).SetOwner(tag);
				GameObject.Find("_GM").GetComponent(GameManagement).PlayShotElectric1();
			
			} else if(GetComponent(PlayerStats).selectedAttack == 3)
			{
				var bullet3 = Instantiate(projectile3, ShotPoint.transform.position, Quaternion.identity);
				bullet3.GetComponent(BulletScript).SetOwner(tag);
				GameObject.Find("_GM").GetComponent(GameManagement).PlayShotIce1();
				
			}

		}


		// Change Attack
		if (Input.GetKeyUp(changeAttack))
		{
			if (GetComponent(PlayerStats).selectedAttack==3)
			{
				GetComponent(PlayerStats).selectedAttack=1;
			}else{
				GetComponent(PlayerStats).selectedAttack+=1;
			}
		}
		
		 
		var x= ShotPoint.transform.position.x - transform.position.x;
		var y= ShotPoint.transform.position.y - transform.position.y;
	
		 
		 
		
		// Movement Mode 1
		if(GameObject.Find("_GM").GetComponent(GameManagement).GameMode == "PVP")
		{
			if (Input.GetKey(moveUp))
			{
				if(transform.position.y>=GameObject.Find("_GM").GetComponent (GameManagement).y){
					// Top Wall
					rigidbody2D.velocity.y = 0;
				}else
				{
					// Gradual Acceleration
					if(rigidbody2D.velocity.y<MaxSpeed){rigidbody2D.velocity.y += MaxSpeed*1.5*Acceleration*Time.deltaTime;}
				}
			}
			
			if (Input.GetKey(moveDown))
			{
				if(transform.position.y<=GameObject.Find("_GM").GetComponent (GameManagement).y*-1){
					// Bottom Wall
					rigidbody2D.velocity.y = 0;
				}else
				{
					// Gradual Acceleration
					if(rigidbody2D.velocity.y>MaxSpeed*-1){rigidbody2D.velocity.y -= MaxSpeed*1.5*Acceleration*Time.deltaTime;}
				}
			}
			
			if (Input.GetKey(moveLeft))
			{
				if(transform.position.x<=GameObject.Find("_GM").GetComponent (GameManagement).x*-1){
					// Left Wall
					rigidbody2D.velocity.x = 0;
				}else
				{
					// Gradual Acceleration
					if(rigidbody2D.velocity.x>MaxSpeed*-1){rigidbody2D.velocity.x -= MaxSpeed*1.5*Acceleration*Time.deltaTime;}
				}
			}
			
			if (Input.GetKey(moveRight))
			{
				if(transform.position.x>=GameObject.Find("_GM").GetComponent (GameManagement).x){
					// Right Wall
					rigidbody2D.velocity.x = 0;
				}else
				{
					// Gradula Acceleration
					if(rigidbody2D.velocity.x<MaxSpeed){rigidbody2D.velocity.x += MaxSpeed*1.5*Acceleration*Time.deltaTime;}
				}
			}
		}
		// Movement Mode 2
		else if(GameObject.Find("_GM").GetComponent(GameManagement).GameMode == "PVP2")
		{
			if (Input.GetKey(moveUp))
			{
				if(transform.position.y<GameObject.Find("_GM").GetComponent (GameManagement).y && y>0){
					if(rigidbody2D.velocity.y<MaxSpeed){rigidbody2D.velocity.y += y*MaxSpeed*Time.deltaTime;}
				}else if(transform.position.y>GameObject.Find("_GM").GetComponent (GameManagement).y*-1 && y<0){
					if(rigidbody2D.velocity.y<MaxSpeed){rigidbody2D.velocity.y += y*MaxSpeed*Time.deltaTime;}
				}
				if(transform.position.x<GameObject.Find("_GM").GetComponent (GameManagement).x && x>0){
					if(rigidbody2D.velocity.x<MaxSpeed){rigidbody2D.velocity.x += x*MaxSpeed*Time.deltaTime;}
				}else if(transform.position.x>GameObject.Find("_GM").GetComponent (GameManagement).x*-1 && x<0){
					if(rigidbody2D.velocity.x<MaxSpeed){rigidbody2D.velocity.x += x*MaxSpeed*Time.deltaTime;}
				}
			}
			
			if (Input.GetKey(moveDown))
			{
				if(transform.position.y<GameObject.Find("_GM").GetComponent (GameManagement).y && y<0){
					rigidbody2D.velocity.y = y*-Acceleration;
				}else if(transform.position.y>GameObject.Find("_GM").GetComponent (GameManagement).y*-1 && y>0){
					rigidbody2D.velocity.y = y*-Acceleration;
				}
				if(transform.position.x<GameObject.Find("_GM").GetComponent (GameManagement).x && x<0){
					rigidbody2D.velocity.x = x*-Acceleration;
				}else if(transform.position.x>GameObject.Find("_GM").GetComponent (GameManagement).x*-1 && x>0){
					rigidbody2D.velocity.x = x*-Acceleration;
				}
			}
			
			if (Input.GetKey(moveLeft))
			{
				if(transform.position.y<GameObject.Find("_GM").GetComponent (GameManagement).y && y>0){
					rigidbody2D.velocity.y = y*Acceleration;
				}else if(transform.position.y>GameObject.Find("_GM").GetComponent (GameManagement).y*-1 && y>0){
					rigidbody2D.velocity.y = y*-Acceleration;
				}
				if(transform.position.x<GameObject.Find("_GM").GetComponent (GameManagement).x && x<0){
					rigidbody2D.velocity.x = x*Acceleration;
				}else if(transform.position.x>GameObject.Find("_GM").GetComponent (GameManagement).x*-1 && x>0){
					rigidbody2D.velocity.x = x*-Acceleration;
				}
			}
			
			if (Input.GetKey(moveRight))
			{
				if(transform.position.x>=GameObject.Find("_GM").GetComponent (GameManagement).x){
					rigidbody2D.velocity.x = 0;
				}else
				{
					rigidbody2D.velocity.x = Acceleration;
				}
			}
		}
		
		
		if (Input.GetKey(Rotate1)){transform.rotation.eulerAngles.z-=3;}
		
		if (Input.GetKey(Rotate2)){transform.rotation.eulerAngles.z+=3;}

		// Pause / Menu
		if (Input.GetKey(KeyCode.Escape)){GameObject.Find("_GM").GetComponent(InGameMenu).OpenMenu(true);}
		
	}
	
	if(Input.GetKey(moveUp)==false&&Input.GetKey(moveDown)==false){rigidbody2D.velocity.y = rigidbody2D.velocity.y/1.04;}
	if(Input.GetKey(moveRight)==false&&Input.GetKey(moveLeft)==false){rigidbody2D.velocity.x = rigidbody2D.velocity.x/1.04;}
		
		
	// Pause / Menu
	if (Input.GetKey(KeyCode.Escape)){GameObject.Find("_GM").GetComponent(InGameMenu).OpenMenu(true);}
		
		
}