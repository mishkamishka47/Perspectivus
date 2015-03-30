using UnityEngine;
using System.Collections;

public class PerspectiveWarpVars : MonoBehaviour {
	public int OrientationRequired; //Camera angle required (0-3). 4 is a wildcard.
	public Vector3 warpCoords; //Coordinates to jump to
	public int moveRequired; //Player movement direction required (0-3). 4 is a wildcard.

	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
