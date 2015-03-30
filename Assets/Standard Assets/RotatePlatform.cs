using UnityEngine;
using System.Collections;

public class RotatePlatform : MonoBehaviour {

	private float degree = 0f;
	private float lerpTime = 1f, currentLerpTime = 0f;
	private bool  isRotating = false;
	private float shakeRange = .1f;
	private Vector3 properPosition;

	// Use this for initialization
	void Start () {
		properPosition = transform.position;
	}
	
	// Update is called once per frame
	void Update () {
		currentLerpTime += Time.deltaTime;
		if (currentLerpTime >= lerpTime) {
			isRotating = false;
			currentLerpTime = lerpTime;
		}
		float percentage = currentLerpTime / lerpTime;
		transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.Euler (0, degree, 0), percentage);
		//Shake ();
	}

	public void Rotate() {
		isRotating = true;
		currentLerpTime = 0f;
		degree = (degree + 90) % 360;
	}

	private void Shake() {
		if (isRotating) {
			Vector3 newPosition = transform.position;
			newPosition.x = newPosition.x+Random.Range (-shakeRange, shakeRange);
			newPosition.z = newPosition.z+Random.Range (-shakeRange, shakeRange);
			transform.position = newPosition;
		} else {
			transform.position = properPosition;
		}
	}
}
