using UnityEngine;
using System.Collections;

public class BallSpawner : MonoBehaviour {
	public Rigidbody ball;
	public float speed;
	public Rotate90 target;
	private Rigidbody curBall;
	public int direction;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetButtonDown("Fire1")) {
			spawnBall();
		}
	}

	
	public void spawnBall () {
		if(curBall!=null){
			Destroy (curBall.gameObject);
		}
		Rigidbody ballClone = (Rigidbody) Instantiate(ball, transform.position, transform.rotation);
		ballClone.velocity = transform.forward * speed;
		ballClone.GetComponent<ballController>().target=target;
		ballClone.GetComponent<ballController>().direction=direction;
		curBall=ballClone;
		// You can also acccess other components / scripts of the clone
		//rocketClone.GetComponent<MyRocketScript>().DoSomething();
	}
}
