#pragma strict

var Ability : String = "Dual Shot";
var PickUpEffect : Transform;



function OnCollisionEnter2D(colInfo : Collision2D) 
{
	if(colInfo.collider.tag == "P1")
	{
		if(Ability=="Dual Shot"){GameObject.FindGameObjectWithTag("P1").GetComponent(Upgrades).DualShotOn();}
		
		else if(Ability=="Repair"){GameObject.FindGameObjectWithTag("P1").GetComponent(Upgrades).Repair();}
		
		else if(Ability=="AttackSpeed"){GameObject.FindGameObjectWithTag("P1").GetComponent(Upgrades).AttackSpeed();}
		
		GameObject.Find("P1 PVP Board").GetComponent(PVPScript).AddItem();
		var efct = Instantiate(PickUpEffect, transform.position, Quaternion.identity);
		Destroy(gameObject,0);
	}else if(colInfo.collider.tag == "P2")
	{
		if(Ability=="Dual Shot"){GameObject.FindGameObjectWithTag("P2").GetComponent(Upgrades).DualShotOn();}
		
		else if(Ability=="Repair"){GameObject.FindGameObjectWithTag("P2").GetComponent(Upgrades).Repair();}
		
		else if(Ability=="AttackSpeed"){GameObject.FindGameObjectWithTag("P2").GetComponent(Upgrades).AttackSpeed();}
		
		GameObject.Find("P2 PVP Board").GetComponent(PVPScript).AddItem();
		var efct2 = Instantiate(PickUpEffect, transform.position, Quaternion.identity);
		Destroy(gameObject,0);
	}
}