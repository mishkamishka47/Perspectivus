using UnityEngine;
using System.Collections;

public class SpinEmitter : MonoBehaviour {

	public float spinSpeed = 1;
	public Direction spinDirection = Direction.Clockwise;

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate (Vector3.forward * Time.deltaTime, spinSpeed * (float)spinDirection);
	}

	public enum Direction : int {
		Clockwise = 1, Counterclockwise = -1
	};
}
