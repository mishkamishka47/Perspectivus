using UnityEngine;
using System.Collections;

public class Rotate90 : MonoBehaviour {
	public int orientation;
	public float desiredRotation;
	public float turnDir; //1 to turn left, -1 to turn right, 0 to not turn
	// Use this for initialization

	private float degree = 0f;
	private float lerpTime = 1f, currentLerpTime = 0f;
	public AnimationCurve bounceCurve;

	void Start () {
		orientation=0;
		desiredRotation=transform.rotation.eulerAngles.y;
		turnDir=0.0f;


	}
	
	// Update is called once per frame
	void Update () {
		/*
		float yRotation = 90.0f;
		if(Input.GetKeyDown("a")){
			//Debug.Log ("Left key pressed!");
			desiredRotation=(float)mod((int)(desiredRotation+yRotation),360);
			turnDir=1.0f;
			orientation=mod(orientation-1,4);
		}else if(Input.GetKeyDown ("d")){
			//Debug.Log ("Right key pressed!");
			desiredRotation=(float)mod((int)(desiredRotation-yRotation),360);
			turnDir=-1.0f;
			orientation=mod(orientation+1,4);
		}
		float curAngle=transform.rotation.eulerAngles.y;
		if(Mathf.Abs(curAngle-desiredRotation) > 3){
			transform.rotation = Quaternion.AngleAxis(curAngle + turnDir*(Time.deltaTime * 45f), Vector3.up);
			//Debug.Log ("Current Angle: "+curAngle+" Desired Angle: "+desiredRotation);
		}else if(Mathf.Abs(curAngle-desiredRotation) <= 3 && turnDir!=0.0f){
			transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x,desiredRotation,transform.rotation.eulerAngles.z);
			//Debug.Log ("Snapped to Angle: " + desiredRotation);
			turnDir=0.0f;
		}*/
		CheckViewpoint ();
	}

	private void CheckViewpoint() {
		int viewpointChange = 0;
		if (Input.GetKeyDown (KeyCode.Alpha1)) {
			currentLerpTime = 0f;
			viewpointChange = 0 - orientation;
			orientation = 0;
		} else if (Input.GetKeyDown (KeyCode.Alpha2)) {
			currentLerpTime = 0f;
			viewpointChange = 1 - orientation;
			orientation = 1;
		} else if (Input.GetKeyDown (KeyCode.Alpha3)) {
			currentLerpTime = 0f;
			viewpointChange = 2 - orientation;
			orientation = 2;
		} else if (Input.GetKeyDown (KeyCode.Alpha4)) {
			currentLerpTime = 0f;
			viewpointChange = 3 - orientation;
			orientation = 3;
		}

		currentLerpTime += Time.deltaTime;
		if (currentLerpTime >= lerpTime)
			currentLerpTime = lerpTime;
		float percentage = currentLerpTime / lerpTime;
		percentage *= bounceCurve.Evaluate (percentage);

		if (viewpointChange == 3 || viewpointChange == -1)
			degree += 90f;
		else if (viewpointChange == 2 || viewpointChange == -2)
			degree -= 180f;
		else if (viewpointChange == 1 || viewpointChange == -3)
			degree -= 90f;

		transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.Euler (0, degree, 0), percentage);
	}

	int mod(int x, int m) { //Custom modulo function. Do not just use %, negative numbers are a trap.
    	return (x%m + m)%m;
	}
}
