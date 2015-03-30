using UnityEngine;
using System.Collections;

public class EmitterRotation : MonoBehaviour {

	// Use this for initialization
	void Start () {
		this.transform.Rotate(Vector3.up,Time.deltaTime);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
