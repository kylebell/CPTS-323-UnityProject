#pragma strict

var ShotBurst : ParticleSystem;
var ShotEffect : ParticleSystem;
var ShotTrail : ParticleSystem;
var ShotHit : ParticleSystem;


var Damage : int = 20;

public var Speed : int = 5;

private var enemyHit : Collision2D = null;
public var owner : String = null;


function Awake ()
{
	ShotTrail.Play();
}



public function SetOwner(Tag : String)
{
	var x : float;
	var y : float;
	owner = Tag;
	
	if(owner!="Enemy")
	{
		x= GameObject.FindGameObjectWithTag(owner).GetComponent(PlayerController).ShotPoint.transform.position.x - GameObject.FindGameObjectWithTag(owner).transform.position.x;
		y= GameObject.FindGameObjectWithTag(owner).GetComponent(PlayerController).ShotPoint.transform.position.y - GameObject.FindGameObjectWithTag(owner).transform.position.y;
	
		ShotBurst.transform.rotation.eulerAngles.x = 270;
		ShotBurst.transform.rotation.eulerAngles.y = 90;
		rigidbody2D.AddForce(new Vector2(x*(Speed*100),y*(Speed*100)));
	}
}


function OnCollisionEnter2D(colInfo : Collision2D) {

	// Set Shots Owner / Force Direction
	if(owner != null && owner != "")
	{

		var efct = Instantiate(ShotHit, transform.position, Quaternion.identity);
		//Destroy(efct,.5);
		
		if(owner=="P1"){GameObject.Find("P1 PVP Board").GetComponent(PVPScript).AddDamage(Damage);}
		else{GameObject.Find("P2 PVP Board").GetComponent(PVPScript).AddDamage(Damage);}

		// Hit Player
		if (colInfo.collider.tag == "P1" && colInfo.collider.tag != owner || colInfo.collider.tag == "P2" && colInfo.collider.tag != owner) 
		{
			efct.Play();
			colInfo.gameObject.GetComponent(PlayerStats).Hit(Damage);
			Destroy(gameObject, 0);

		}else if(colInfo.collider.tag == "Enemy")
		{
			colInfo.gameObject.GetComponent(AlienAIScript).Hit(Damage);
			efct.Play();	
			Destroy(gameObject, 0);
		}else if(colInfo.collider.tag == "Projectile") // Hit Projectile
		{
			efct.Play();	
			Destroy(gameObject, 0);
		}else if(colInfo.collider.tag == "Astroid") // Hit Astroid
		{
			efct.Play();
			colInfo.gameObject.GetComponent(AstroidScript).Hit(Damage,owner);
			Destroy(gameObject, 0);
		}
	
	}
}