#pragma strict


public function DualShotOn()
{
	Debug.Log("Dual Shot Enabled");
}

public function Repair()
{
	if(GetComponent(PlayerStats).PlayerHealth+25.0<=100)
	{
		GetComponent(PlayerStats).PlayerHealth+=25.0;
	}else
	{
		GetComponent(PlayerStats).PlayerHealth=100;
	}
}

public function AttackSpeed()
{
	if(GetComponent(PlayerControllerXbox).enabled == true)
	{
		GetComponent(PlayerControllerXbox).Cooldown=.125;
	}else
	{
		GetComponent(PlayerController).Cooldown=.125;
	}
}

