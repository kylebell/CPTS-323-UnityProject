var Health : int = 30;
var BulletPreFab : Transform;
var LookAtTarget : Transform;
var DeathEffect : ParticleSystem;
var Damp = 6;
var savedTime=0;
var Movement : Animator;
var player : Transform;
public var ShotPoint : Transform; 
private var Dead : boolean = false;

function Awake(){
player = GameObject.FindWithTag("P1").transform;
LookAtTarget = player;
}


function Update () 
{
	if(LookAtTarget!=null && Dead==false)
	{
		//var rotate = Quaternion.LookRotation(LookAtTarget.position - transform.position);
		/*var dir : Vector3;
		var angle : float;
	dir = LookAtTarget.position - transform.position;
	angle = Mathf.Atan2(dir.y,dir.x) * Mathf.Rad2Deg;
	transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);*/

		var rotation : Quaternion;
		rotation = Quaternion.LookRotation(LookAtTarget.transform.position - transform.position, transform.TransformDirection(Vector3.up));
        //transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damp);
        //transform.rotation = new Quaternion(0, 0, rotation.y, rotation.w);
       	transform.rotation = Quaternion.Slerp (transform.rotation, new Quaternion(0, 0, rotation.z, rotation.y), Damp * Time.deltaTime);

		if(savedTime==0)
		{
			savedTime = Time.time + Random.Range(.25,4);
		}else if(savedTime <= Time.time)
		{
			savedTime=0;
			Shoot();
		}	
	}
}


public function Hit(damage : int)
{

	// Apply Damage
	Health -= damage;
	
	// Check for Death
	if(Health<=0)
	{
		Dead = true;
		DeathEffect.Play();
		Destroy(gameObject, 2);
		//var ef = Instantiate(DeathEffect, ShotPoint.transform.position, Quaternion.identity);
		//ef.Play();
	}
}



function Shoot()
{
	
	var bullet = Instantiate(BulletPreFab, ShotPoint.transform.position, Quaternion.identity);

	//transform.Find("ShotPoint").transform.position
	var x : float;
	var y : float;
	x= ShotPoint.transform.position.x - transform.position.x;
	y= ShotPoint.transform.position.y - transform.position.y;
	bullet.GetComponent(BulletScript).SetOwner(tag);
	bullet.rigidbody2D.AddForce(new Vector2(x*(bullet.GetComponent(BulletScript).Speed*100),y*(bullet.GetComponent(BulletScript).Speed*100)));
		
}






