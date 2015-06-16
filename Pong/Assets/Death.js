#pragma strict

var lifeTime = 5;

function Awake()
{
	Destroy(gameObject, lifeTime);
}