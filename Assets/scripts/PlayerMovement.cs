using UnityEngine;
using System.Collections;

public class PlayerMovement : MonoBehaviour {
	public Rotate90 target;
	public GameObject lastButtonPressed;
	public Material offColor;
	public Material onColor;
	
	private Quaternion targetRotation;
	private Vector3 targetPosition;
	private float moveSpeed = 5;
	private int upDirection = 0;
	// Use this for initialization
	void Start () {
		targetPosition = transform.position;
		lastButtonPressed=null;
		targetRotation = transform.rotation;
	}
	
	// Update is called once per frame
	void Update () {
		int orientation = target.orientation;
		//Comments indicate which absolute direction the player is moving. 
		//0 means that it's as if up was pressed in orientation 0, 1 means it's as if up was pressed in orientation 1, and so on.
		/*if(Input.GetKeyDown("up")){
			targetRotation = Quaternion.Euler(0, 270, 90);
			if(orientation==0&&pathPresent(1.0f,0.0f,0.0f,0)){
				transform.Translate(1,0,0, Space.World); //0
			}else if(orientation==1&&pathPresent(0.0f,0.0f,1.0f,1)){
				transform.Translate(0,0,1, Space.World); //1
			}else if(orientation==2&&pathPresent(-1.0f,0.0f,0.0f,2)){
				transform.Translate(-1,0,0, Space.World); //2
			}else if(orientation==3&&pathPresent(0.0f,0.0f,-1.0f,3)){
				transform.Translate(0,0,-1, Space.World); //3
			}
		}else if(Input.GetKeyDown("down")){
			targetRotation = Quaternion.Euler(0, 90, 90);
			if(orientation==0&&pathPresent(-1.0f,0.0f,0.0f,2)){
				transform.Translate(-1,0,0, Space.World); //2
			}else if(orientation==1&&pathPresent(0.0f,0.0f,-1.0f,3)){
				transform.Translate(0,0,-1, Space.World); //3
			}else if(orientation==2&&pathPresent(1.0f,0.0f,0.0f,0)){
				transform.Translate(1,0,0, Space.World); //0
			}else if(orientation==3&&pathPresent(0.0f,0.0f,1.0f,1)){
				transform.Translate(0,0,1, Space.World); //1
			}
		}else if(Input.GetKeyDown("left")){
			targetRotation = Quaternion.Euler(0, 180, 90);
			if(orientation == 0 && pathPresent(0.0f, 0.0f, 1.0f, 1)) {
				transform.Translate(0,0,1, Space.World); //1
			}else if(orientation==1&&pathPresent(-1.0f,0.0f,0.0f,2)){
				transform.Translate(-1,0,0, Space.World); //2
			}else if(orientation==2&&pathPresent(0.0f,0.0f,-1.0f,3)){
				transform.Translate(0,0,-1, Space.World); //3
			}else if(orientation==3&&pathPresent(1.0f,0.0f,0.0f,0)){
				transform.Translate(1,0,0, Space.World); //0
			}
		}else if(Input.GetKeyDown("right")){
			targetRotation = Quaternion.Euler(0, 0, 90);
			if(orientation==0&&pathPresent(0.0f,0.0f,-1.0f,3)){
				transform.Translate(0,0,-1, Space.World); //3
			}else if(orientation==1&&pathPresent(1.0f,0.0f,0.0f,0)){
				transform.Translate(1,0,0, Space.World); //0
			}else if(orientation==2&&pathPresent(0.0f,0.0f,1.0f,1)){
				transform.Translate(0,0,1, Space.World); //1
			}else if(orientation==3&&pathPresent(-1.0f,0.0f,0.0f,2)){
				transform.Translate(-1,0,0, Space.World); //2
			}
		}*/
		
		if (Input.GetKeyDown ("up") && moreOrLessEqual(transform.rotation.eulerAngles, targetRotation.eulerAngles)) {;
			if (pathPresent (transform.forward, upDirection)) {
				moveSpeed = 5;
				targetPosition += transform.forward;
			}
		} else if (Input.GetKeyDown ("down")) {
			var currentRotation = transform.rotation.eulerAngles;
			targetRotation = Quaternion.Euler (currentRotation.x, (currentRotation.y + 180) % 360, currentRotation.z);
			upDirection += 2;
		} else if (Input.GetKeyDown ("left")) {
			var currentRotation = transform.rotation.eulerAngles;
			targetRotation = Quaternion.Euler (currentRotation.x, (currentRotation.y - 90) % 360, currentRotation.z);
			upDirection += 3;
		} else if (Input.GetKeyDown ("right")) {
			var currentRotation = transform.rotation.eulerAngles;
			targetRotation = Quaternion.Euler (currentRotation.x, (currentRotation.y + 90) % 360, currentRotation.z);
			upDirection += 1;
		}
		
		if (upDirection >= 4)
			upDirection %= 4;
		print (upDirection);
		
		if ((int)(targetRotation.eulerAngles.y) % 90 != 0) {
			var y = Mathf.Ceil (targetRotation.eulerAngles.y / 90) * 90;
			targetRotation = Quaternion.Euler(targetRotation.eulerAngles.x, y, targetRotation.eulerAngles.z);
		}
		
		transform.position = Vector3.MoveTowards (transform.position, targetPosition, Time.deltaTime * moveSpeed);
		var difference = targetPosition - transform.position;
		GetComponent<Animator> ().SetFloat ("distanceToTravel", difference.magnitude);
		transform.rotation = Quaternion.RotateTowards (transform.rotation, targetRotation, Time.deltaTime * 500);
	}
	
	bool moreOrLessEqual(Vector3 a, Vector3 b) {
		return (int)a.x == (int)b.x &&
			(int)a.y == (int)b.y &&
				(int)a.z == (int)b.z;
	}
	
	bool pathPresent(Vector3 vec, int upDirection) {
		return pathPresent (vec.x, vec.y, vec.z, upDirection);
	}
	
	bool pathPresent(float x, float y, float z, int upDirection) { //Returns true if translation should still take place (no successful perspective jump, path clear), false otherwise
		var destination = new Vector3(x, y, z);
		Collider[] collidersThere = Physics.OverlapSphere(targetPosition + destination, 0.0f);
		if(collidersThere.Length!=0){
			//Debug.Log(collidersThere[0].name);
			bool pathBlocked = false;
			for(int i = 0; i<collidersThere.Length; i++){
				if(collidersThere[i].name.Equals("PerspectiveWarper")){
					if(perspectiveJump(collidersThere[i],upDirection)){
						return false;
					}
				}else{
					Debug.Log(collidersThere[i].name);
					pathBlocked=true;	
				}
			}
			if(pathBlocked){
				return false;
			}
		}
		
		Vector3 belowCenter = new Vector3(x,y-1,z); //Check that there's something to stand on
		bool cubeBelow = false;
		Collider[] collidersBelow = Physics.OverlapSphere(targetPosition + belowCenter, 0.0f);
		if(collidersBelow.Length!=0){
			for(int i = 0; i<collidersBelow.Length; i++){
				var parent = collidersBelow[i].transform.parent;
				var name = "";
				while (parent != null) {
					name = parent.gameObject.name;
					parent = parent.transform.parent;
				}
				if(name.StartsWith("Walkway") || name.Equals("endpoint")){
					cubeBelow=true;
				}
				if(collidersBelow[i].name.Equals("RotateButton")){
					cubeBelow=true;
					rotateObject(collidersBelow[i]);
				}
				if(collidersBelow[i].name.Equals("BallButton")){
					cubeBelow=true;
					spawnBall(collidersBelow[i]);
				}
			}
		}
		
		return cubeBelow;
	}
	
	bool perspectiveJump(Collider warpCollider, int upDirection){ //Returns true if perspective jump was made
		GameObject warper = warpCollider.gameObject;
		PerspectiveWarpVars warpVars = warper.GetComponent<PerspectiveWarpVars>();
		int orientationRequired = warpVars.OrientationRequired;
		Vector3 warpCoords = warpVars.warpCoords;
		Vector3 belowWarp = new Vector3(0,-1,0);
		Collider[] collidersBelowWarp = Physics.OverlapSphere(warpCoords+belowWarp,0.0f); //Check that they're actually landing on something
		bool cubeBelow=false;
		if(collidersBelowWarp.Length!=0){
			for(int i = 0; i<collidersBelowWarp.Length; i++){
				var parent = collidersBelowWarp[i].transform.parent;
				var name = "";
				while (parent != null) {
					name = parent.gameObject.name;
					parent = parent.transform.parent;
				}
				if(name.StartsWith("Walkway") || name.Equals("endpoint")){
					cubeBelow=true;
				}
				if(collidersBelowWarp[i].name.Equals("RotateButton")){
					cubeBelow=true;
					if((orientationRequired==target.orientation||orientationRequired==4)&&(upDirection==warpVars.moveRequired||warpVars.moveRequired==4)){
						rotateObject(collidersBelowWarp[i]);
					}else{
						Debug.Log(upDirection);
					}
				}
				if(collidersBelowWarp[i].name.Equals("BallButton")){
					cubeBelow=true;
					spawnBall(collidersBelowWarp[i]);
				}
			}
		}
		if(!cubeBelow){
			return false;
		}
		warpCoords.y=warpCoords.y-0.25f;
		if((orientationRequired==target.orientation||orientationRequired==4)&&(upDirection==warpVars.moveRequired||warpVars.moveRequired==4)){
			targetPosition = warpCoords;
			moveSpeed = (targetPosition - this.transform.position).magnitude * 5;
			return true;
		}
		return false;
	}
	void rotateObject(Collider rotateCollider){
		GameObject button = rotateCollider.gameObject;
		if(lastButtonPressed==null){
			lastButtonPressed=button;
		}else if(lastButtonPressed==button){
			return;
		}
		lastButtonPressed.GetComponent<Renderer>().material=onColor;
		lastButtonPressed=button;
		button.GetComponent<Renderer>().material=offColor;
		lastButtonPressed=button;
		RotateButtonVars rotateVars = button.GetComponent<RotateButtonVars>();
		for(int i = 0; i <rotateVars.rotateTargets.Length; i++){
			GameObject rotationTarget = rotateVars.rotateTargets[i];
			var rotatePlatform = rotationTarget.GetComponent<RotatePlatform>();
			rotatePlatform.Rotate();
		}
	}
	void spawnBall(Collider spawnCollider){
		GameObject button = spawnCollider.gameObject;
		ballButtonVars ballVars = button.GetComponent<ballButtonVars>();
		GameObject spawnTarget = ballVars.spawnerTarget;
		BallSpawner spawner = spawnTarget.GetComponent<BallSpawner>();
		spawner.spawnBall();
	}
}