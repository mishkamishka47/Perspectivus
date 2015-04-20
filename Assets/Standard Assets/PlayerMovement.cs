using UnityEngine;
using System.Collections;

public class PlayerMovement : MonoBehaviour {
	public Rotate90 target;
	public GameObject lastButtonPressed;
	public Material offColor;
	public Material onColor;

	private int steps = 0;
	private bool story = false;
	private Quaternion targetRotation;
	public Vector3 targetPosition;
	private float moveSpeed = 5;
	private int upDirection = 0;
	private Vector3 absoluteUp = new Vector3(1.0f,0.0f,0.0f);
	private Vector3 absoluteLeft = new Vector3(0.0f,0.0f,1.0f);
	private Vector3 absoluteDown = new Vector3(-1.0f,0.0f,0.0f);
	private Vector3 absoluteRight = new Vector3(0.0f,0.0f,-1.0f);
	private bool isMoving = false;
	public bool menuScreen = false;
	private bool sliding = false;

	// Use this for initialization
	void Start () {
		targetPosition = transform.position;
		lastButtonPressed=null;
		targetRotation = transform.rotation;
	}
	public bool getStory(){
		return story;
	}
	public void setMenu(bool m){
		menuScreen=m;
	}

	public int getSteps(){
		return steps;
	}

	public void setStory(){
		story = false;
	}

	public void setSteps(){
		steps = 0;
	}
	public void setTargetPosition(Vector3 tP){
		targetPosition=tP;
	}
	public Vector3 getTargetPosition(){
		return targetPosition;
	}
	// Update is called once per frame
	void Update () {
		//Debug.Log(transform.forward.x + " " + transform.forward.y + " " + transform.forward.z);
//		Collider[] seeSawCheck = Physics.OverlapSphere(transform.position + new Vector3(0.0f,-1.0f, 0.0f), 0.0f);
//		for(int i = 0; i<seeSawCheck.Length; i++){
//			Debug.Log (seeSawCheck[i]);
//			if(seeSawCheck[i].gameObject.transform.parent!=null&&seeSawCheck[i].gameObject.transform.parent.name.StartsWith("Seesaw")){
//				Debug.Log ("Standing on a seesaw!");
//				if(seeSawCheck[i].gameObject.transform.parent.GetComponent<SeesawController>().isRising){
//					Debug.Log ("Rising!");
//				}
//			}
//		}

		if(target==null){
			return;
		}
		int orientation = target.orientation;
		if (! sliding) {
			if (//Absolute up block
			(
			(Input.GetKey ("up") && target.orientation == 0) ||
				(Input.GetKey ("right") && target.orientation == 1) ||
				(Input.GetKey ("down") && target.orientation == 2) ||
				(Input.GetKey ("left") && target.orientation == 3)
		 	)
				&& moreOrLessEqual (transform.rotation.eulerAngles, targetRotation.eulerAngles) && !isMoving && !menuScreen) {
				//Debug.Log ("key pressed, trying to move up");
				var currentRotation = transform.rotation.eulerAngles; //i added this
				targetRotation = Quaternion.Euler (currentRotation.x, 90, currentRotation.z); //i added this
				upDirection = 0;
				if (pathPresent (absoluteUp, upDirection)) {
					//Debug.Log ("up path present");
					moveSpeed = 5;
					targetPosition += absoluteUp;
					steps++;
					isMoving = true;
				}
			}
			if (//Absolute left block
			(
			(Input.GetKey ("up") && target.orientation == 1) ||
				(Input.GetKey ("right") && target.orientation == 2) ||
				(Input.GetKey ("down") && target.orientation == 3) ||
				(Input.GetKey ("left") && target.orientation == 0)
			)
				&& moreOrLessEqual (transform.rotation.eulerAngles, targetRotation.eulerAngles) && !isMoving && !menuScreen) {
				var currentRotation = transform.rotation.eulerAngles; //i added this
				targetRotation = Quaternion.Euler (currentRotation.x, 0, currentRotation.z); //i added this
				upDirection = 1;
				if (pathPresent (absoluteLeft, upDirection)) {
					//Debug.Log ("path present??");
					moveSpeed = 5;
					targetPosition += absoluteLeft;
					steps++;
					isMoving = true;
				}
			} else if (//Absolute down block
		            (
			(Input.GetKey ("up") && target.orientation == 2) ||
				(Input.GetKey ("right") && target.orientation == 3) ||
				(Input.GetKey ("down") && target.orientation == 0) ||
				(Input.GetKey ("left") && target.orientation == 1)
			)
				&& moreOrLessEqual (transform.rotation.eulerAngles, targetRotation.eulerAngles) && !isMoving && !menuScreen) {
				var currentRotation = transform.rotation.eulerAngles; //i added this
				targetRotation = Quaternion.Euler (currentRotation.x, -90, currentRotation.z); //i added this
				upDirection = 2;
				if (pathPresent (absoluteDown, upDirection)) {
					//Debug.Log ("path present??");
					moveSpeed = 5;
					targetPosition += absoluteDown;
					steps++;
					isMoving = true;
				}
			} else if (//Absolute right block
		           (
			(Input.GetKey ("up") && target.orientation == 3) ||
				(Input.GetKey ("right") && target.orientation == 0) ||
				(Input.GetKey ("down") && target.orientation == 1) ||
				(Input.GetKey ("left") && target.orientation == 2)
			)
				&& moreOrLessEqual (transform.rotation.eulerAngles, targetRotation.eulerAngles) && !isMoving && !menuScreen) {
				var currentRotation = transform.rotation.eulerAngles; //i added this
				targetRotation = Quaternion.Euler (currentRotation.x, 180, currentRotation.z); //i added this
				upDirection = 3;
				if (pathPresent (absoluteRight, upDirection)) {
					//Debug.Log ("path present??");
					moveSpeed = 5;
					targetPosition += absoluteRight;
					steps++;
					isMoving = true;
				}
			}
		}
		
		if (upDirection >= 4)
			upDirection %= 4;
		
		if ((int)(targetRotation.eulerAngles.y) % 90 != 0) {
			var y = Mathf.Ceil (targetRotation.eulerAngles.y / 90) * 90;
			targetRotation = Quaternion.Euler(targetRotation.eulerAngles.x, y, targetRotation.eulerAngles.z);
		}
		
		transform.position = Vector3.MoveTowards (transform.position, targetPosition, Time.deltaTime * moveSpeed);
		var difference = targetPosition - transform.position;
		//Debug.Log (targetPosition.x + " " + targetPosition.y + " " + targetPosition.z);
		if(difference.magnitude<= .1){
			isMoving=false;
			if (sliding)
				sliding = false;
		}
		GetComponent<Animator> ().SetFloat ("distanceToTravel", difference.magnitude);
		transform.rotation = Quaternion.RotateTowards (transform.rotation, targetRotation, Time.deltaTime * 500);
	}
	
	bool moreOrLessEqual(Vector3 a, Vector3 b) {
		return (int)a.x == (int)b.x &&
			(int)a.y == (int)b.y &&
				(int)a.z == (int)b.z;
	}
	
	bool pathPresent(Vector3 vec, int upDirection) {
		//Debug.Log (upDirection);
		return pathPresent (vec.x, vec.y, vec.z, upDirection);
	}
	
	bool pathPresent(float x, float y, float z, int upDirection) { //Returns true if translation should still take place (no successful perspective jump, path clear), false otherwise
		var destination = new Vector3(x, y, z);

		//Check that the destination is open
		Collider[] collidersThere = Physics.OverlapSphere(targetPosition + destination, 0.0f);
		if(collidersThere.Length!=0){
			//Debug.Log(collidersThere[0].name);
			bool pathBlocked = false;
			for(int i = 0; i<collidersThere.Length; i++){
				//Debug.Log (collidersThere[i]);
				if(collidersThere[i].name.Equals("PerspectiveWarper"))
				{
					//Debug.Log ("Recognized as a perspectivewarper");
					if(perspectiveJump(collidersThere[i],upDirection)){
						//Debug.Log ("Returning false");
						return false;
					}
				}else if(collidersThere[i].name == "USB")
				{
					story = true;
					//Debug.Log(collidersThere[i].name);
					Destroy(GameObject.Find("USB"),1);
				}
				else
				{
					//Debug.Log(collidersThere[i].name);
					pathBlocked=true;	
				}
			}
			if(pathBlocked){
				return false;
			}
		}
		//Debug.Log ("No blockages!");
		Vector3 belowCenter = new Vector3(x,y-1,z); //Check that there's something to stand on
		bool cubeBelow = false;
		Collider[] collidersBelow = Physics.OverlapSphere(targetPosition + belowCenter, 0.0f);
		Vector3 logger = targetPosition + belowCenter;
		//Debug.Log ("Checked for colliders at (" + logger.x + "," + logger.y + "," + logger.z + ") and found " + collidersBelow.Length); 
		if(collidersBelow.Length!=0){
			for(int i = 0; i<collidersBelow.Length; i++){
				//Debug.Log (collidersBelow[i].name);
				var parent = collidersBelow[i].transform.parent;
				var name = "";
				while (parent != null) {
					name = parent.gameObject.name;
					parent = parent.transform.parent;
				}
				//Debug.Log(parent + " " +name);
				if(name.StartsWith("Walkway") || name.Equals("endpoint") || name.ToLower().StartsWith("rotator")){
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
				else if (collidersBelow[i].transform.parent!=null&&collidersBelow[i].transform.parent.name.Equals("Ice"))
				{
					//SLIDE
					var endOfSlide = findEndOfIcePath(targetPosition, destination, upDirection);
					moveSpeed = 15;
					targetPosition = endOfSlide;
					sliding = true;
					isMoving = true;
					steps++;
					return false;
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
				if(name.StartsWith("Walkway") || name.Equals("endpoint") || name.ToLower().StartsWith("rotator")){
					cubeBelow=true;
				}
				if(collidersBelowWarp[i].name.Equals("RotateButton")){
					cubeBelow=true;
					if((orientationRequired==target.orientation||orientationRequired==4)&&(upDirection==warpVars.moveRequired||warpVars.moveRequired==4)){
						rotateObject(collidersBelowWarp[i]);
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
			isMoving=true;
			moveSpeed = (targetPosition - this.transform.position).magnitude * 5;
			steps++;
			return true;
		}
		return false;
	}

	Vector3? warperDestination(Collider warpCollider, int upDirection) {
		var warpVars = warpCollider.GetComponent<PerspectiveWarpVars> ();
		var orientationRequired = warpVars.OrientationRequired;
		var moveRequired = warpVars.moveRequired;
		var warpCoords = warpVars.warpCoords;
		if ((moveRequired == 4 | upDirection == moveRequired) &&
			(orientationRequired == 4 || target.orientation == orientationRequired)) {
			return warpCoords;
		}
		return null;
	}

	Vector3 findEndOfIcePath(Vector3 startLocation, Vector3 direction, int upDirection)
	{
		Vector3 currentLocation = startLocation;
		Collider colliderBelowCurrent = null;
		//I AM SO ASHAMED BUT I'M ABOUT TO USE A DO WHILE LOOP
		do {
			var nextLocation = currentLocation + direction;
			var collidersBelow = Physics.OverlapSphere(new Vector3(nextLocation.x, nextLocation.y - 1, nextLocation.z), 0.0f);
			if (collidersBelow.Length == 0) {
				//Check for a perspective warper
				var collidersThere = Physics.OverlapSphere(nextLocation, 0.0f);
				if (collidersThere.Length == 0)
					colliderBelowCurrent = null;
				else {
					foreach (var collider in collidersThere) {
						if (collider.name.Equals ("PerspectiveWarper")) {
							var warpDest = warperDestination (collider, upDirection);
							if (warpDest.HasValue) {
								currentLocation = warpDest.Value;
								var collidersAgain = Physics.OverlapSphere(currentLocation - new Vector3(0, -1, 0), 0.0f);
								colliderBelowCurrent = collidersAgain[0];
							} else { //invalid warp
								colliderBelowCurrent = null; //this will exit the main loop
							}
							break;
						}
					}
				}
			} else {
				//There's something here so we can either stop or keep sliding
				colliderBelowCurrent = collidersBelow[0]; //There's probably only going to be one collider...???
				currentLocation += direction;
			}
		} while (colliderBelowCurrent != null && colliderBelowCurrent.transform.parent.name.Equals ("Ice"));
		//Passing over rotators and ball spawners will stop the player DECLAN CHECK THIS
		if (colliderBelowCurrent.name.Equals ("RotateButton"))
			rotateObject (colliderBelowCurrent);
		else if (colliderBelowCurrent.name.Equals ("BallButton"))
			spawnBall (colliderBelowCurrent);
		return currentLocation;
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