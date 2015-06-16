#pragma strict

var PSystem : Transform;

function Start () {
	var randomNumber = Random.Range(0,2);
	if (randomNumber<=.5){
		rigidbody2D.AddForce(new Vector2(180,100));
	} else {
		rigidbody2D.AddForce(new Vector2(-180,-100));
	}
}

function OnCollisionEnter2D(colInfo : Collision2D) {
	if (colInfo.collider.tag == "Player") {
	
	// Bullet 
	//if(Input.GetButtonDown("Jump"))
	//{
		var efct = Instantiate(PSystem, transform.position, Quaternion.identity);
	//	bullet.rigidbody.AddForce(transform.forward*2000);
	//}
		//Debug.Log("It's Working!");
		//PSystem.transform.position.x = transform.position.x;
		//PSystem.transform.position.y = transform.position.y;
		//var Sic = PSystem;
		//Sic.Play();
	}
}
