using UnityEngine;
using System.Collections;

public class Rotate90 : MonoBehaviour {
	public int orientation;
	public AnimationCurve bounceCurve;

	private float degree = 0f;
	private float lerpTime = 1f, currentLerpTime = 0f;

	void Start () {
		orientation = 0;
	}
	
	// Update is called once per frame
	void Update () {
		CheckViewpoint ();
	}

	private void CheckViewpoint() {
		if (Input.GetKeyDown (KeyCode.Alpha1)) {
			currentLerpTime = 0f;
			degree = mod ((int)degree + 90, 360);
			orientation = mod (orientation - 1, 4);
		} else if (Input.GetKeyDown (KeyCode.Alpha2)) {
			currentLerpTime = 0f;
			degree = mod ((int)degree - 180, 360);
			orientation = mod (orientation + 2, 4);
		} else if (Input.GetKeyDown (KeyCode.Alpha3)) {
			currentLerpTime = 0f;
			degree = mod ((int)degree - 90, 360);
			orientation = mod (orientation + 1, 4);
		}

		currentLerpTime += Time.deltaTime;
		if (currentLerpTime >= lerpTime)
			currentLerpTime = lerpTime;
		float percentage = currentLerpTime / lerpTime;
		percentage *= bounceCurve.Evaluate (percentage);

		transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.Euler (0, degree, 0), percentage);
	}

	int mod(int x, int m) { //Custom modulo function. Do not just use %, negative numbers are a trap.
    	return (x%m + m)%m;
	}
}
