using UnityEngine;
using System.Collections;

public class Rotate90 : MonoBehaviour {
	public int orientation;
	public float desiredRotation;
	public float turnDir; //1 to turn left, -1 to turn right, 0 to not turn
	// Use this for initialization
	void Start () {
		orientation=0;
		desiredRotation=transform.rotation.eulerAngles.y;
		turnDir=0.0f;
	}
	
	// Update is called once per frame
	void Update () {
		float yRotation = 90.0f;
		if(Input.GetKeyDown("a")){
			Debug.Log ("Left key pressed!");
			desiredRotation=(float)mod((int)(desiredRotation+yRotation),360);
			turnDir=1.0f;
			orientation=mod(orientation-1,4);
		}else if(Input.GetKeyDown ("d")){
			Debug.Log ("Right key pressed!");
			desiredRotation=(float)mod((int)(desiredRotation-yRotation),360);
			turnDir=-1.0f;
			orientation=mod(orientation+1,4);
		}
		float curAngle=transform.rotation.eulerAngles.y;
		if(Mathf.Abs(curAngle-desiredRotation) > 3){
			transform.rotation = Quaternion.AngleAxis(curAngle + turnDir*(Time.deltaTime * 45f), Vector3.up);
			Debug.Log ("Current Angle: "+curAngle+" Desired Angle: "+desiredRotation);
		}else if(Mathf.Abs(curAngle-desiredRotation) <= 3 && turnDir!=0.0f){
			transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x,desiredRotation,transform.rotation.eulerAngles.z);
			Debug.Log ("Snapped to Angle: " + desiredRotation);
			turnDir=0.0f;
		}
	}
	int mod(int x, int m) { //Custom modulo function. Do not just use %, negative numbers are a trap.
    	return (x%m + m)%m;
	}
}
