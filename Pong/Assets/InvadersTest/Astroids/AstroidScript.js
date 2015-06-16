#pragma strict

var MaxHealth : int = 50;
var ScaleHealth : boolean = true;
var SizeMin : float = 0.5;
var SizeMax : float = 1.5; 
public var SpeedMultiplier : float =  1.5;
var DeathEffect : ParticleSystem;
var Dead : boolean = false;


function Start () {
	var size = Random.Range(SizeMin,SizeMax);
	transform.localScale.x = size;
	transform.localScale.y = size;
	
	// Scale the ammount of health based on the size of the Astroid
	if (ScaleHealth == true){MaxHealth = MaxHealth * size;}
	
	// Scale Mass based on size
	rigidbody2D.mass = rigidbody2D.mass*size;
}

public function Hit(Damage : int, owner : String)
{

	MaxHealth -= Damage;
	if(MaxHealth<=0 && Dead == false)
	{
		Dead = true;
		//	Update Stats
		if(owner=="P1"){GameObject.Find("P1 PVP Board").GetComponent(PVPScript).AddAstroid();}
		else{GameObject.Find("P2 PVP Board").GetComponent(PVPScript).AddAstroid();}
		
		DeathEffect.Play();
		Destroy(gameObject,1);
		
	}
}