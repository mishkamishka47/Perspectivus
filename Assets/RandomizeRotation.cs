using UnityEngine;
using System.Collections;

public class RandomizeRotation : MonoBehaviour {

	// Use this for initialization
	void Start () {
		int x = Mathf.FloorToInt (Random.Range (0, 4)), y = Mathf.FloorToInt (Random.Range (0, 4)), z = Mathf.FloorToInt (Random.Range (0, 4));
		transform.rotation = Quaternion.Euler (90 * x, 90 * y, 90 * z);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
