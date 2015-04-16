using UnityEngine;
using System.Collections;

public class RandomizeYRotation : MonoBehaviour {

	// Use this for initialization
	void Start () {
		var multiplier = Mathf.FloorToInt (Random.Range (0, 4));
		transform.rotation = Quaternion.Euler (0, 90 * multiplier, 0);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
