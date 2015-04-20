using UnityEngine;
using System.Collections;

public class ballController : MonoBehaviour {
	public Rotate90 target;
	public int direction;
	private bool hasCollided;
	// Use this for initialization
	void Start () {
		GetComponent<Rigidbody>().velocity=new Vector3(5f,0f,0f);
		hasCollided=false;
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 inFront = new Vector3(0f,0f,0f);
		Vector3 toTheLeft = new Vector3(0f,0f,0f); //take it back now y'all
		Vector3 toTheRight = new Vector3(0f,0f,0f); //right foot again
		if(direction==0){
			inFront = new Vector3(.6f,0f,0f);
			toTheLeft = new Vector3(0f,0f,.2f);
			toTheRight = new Vector3(0f,0f,-.2f);
		}else if(direction==1){
			inFront = new Vector3(0f,0f,.6f);
			toTheLeft = new Vector3(-.2f,0f,0f);
			toTheRight = new Vector3(.2f,0f,0f);
		}else if(direction==2){
			inFront = new Vector3(-.6f,0f,0f);
			toTheLeft = new Vector3(0f,0f,-.2f);
			toTheRight = new Vector3(0f,0f,.2f);
		}else if(direction==3){
			inFront = new Vector3(0f,0f,-.6f);
			toTheLeft = new Vector3(.2f,0f,0f);
			toTheRight = new Vector3(-.2f,0f,0f);
		}


		Collider[] collidersInFront = Physics.OverlapSphere(this.transform.position+inFront,0.05f);
		if(collidersInFront.Length!=0){
			for(int i = 0; i<collidersInFront.Length; i++){
				//Debug.Log(collidersInFront[i].name);
				if(!(collidersInFront[i].name.Equals("PerspectiveWarper")||collidersInFront[i].name.Equals("Bumper"))){
					hasCollided=true;
				}
				if(collidersInFront[i].name.Equals("Player")){
					Destroy(gameObject);
				}
			}
		}

		//Handles left bumper bouncing
		Collider[] collidersAtLeft = Physics.OverlapSphere(this.transform.position+inFront+toTheLeft,0.05f);
		if(collidersAtLeft.Length!=0){
			for(int i = 0; i<collidersAtLeft.Length; i++){
				//Debug.Log(collidersAtLeft[i].name);
				if(collidersAtLeft[i].name.Equals("Bumper")){
					if(direction==0){
						direction=3;
					}else{
						direction=direction-1;
					}
				}
			}
		}
		Collider[] collidersAtRight = Physics.OverlapSphere(this.transform.position+inFront+toTheRight,0.05f);
		if(collidersAtRight.Length!=0){
			for(int i = 0; i<collidersAtRight.Length; i++){
				//Debug.Log(collidersAtRight[i].name);
				if(collidersAtRight[i].name.Equals("Bumper")){
					if(direction==3){
						direction=0;
					}else{
						direction=direction+1;
					}
				}
			}
		}
		
		if(!hasCollided){
			if(direction==0){
				transform.position = new Vector3(transform.position.x,transform.position.y,Mathf.Round(transform.position.z));
				GetComponent<Rigidbody>().velocity=new Vector3(2f,GetComponent<Rigidbody>().velocity.y,0f);
			}else if(direction==1){
				transform.position = new Vector3(Mathf.Round(transform.position.x),transform.position.y,transform.position.z);
				GetComponent<Rigidbody>().velocity=new Vector3(0f,GetComponent<Rigidbody>().velocity.y,2f);
			}else if(direction==2){
				transform.position = new Vector3(transform.position.x,transform.position.y,Mathf.Round(transform.position.z));
				GetComponent<Rigidbody>().velocity=new Vector3(-2f,GetComponent<Rigidbody>().velocity.y,0f);
			}else if(direction==3){
				transform.position = new Vector3(Mathf.Round(transform.position.x),transform.position.y,transform.position.z);
				GetComponent<Rigidbody>().velocity=new Vector3(0f,GetComponent<Rigidbody>().velocity.y,-2f);
			}
		}else{
			GetComponent<Rigidbody>().velocity=new Vector3(0f,GetComponent<Rigidbody>().velocity.y,0f);
		}
		Collider[] collidersThere = Physics.OverlapSphere(transform.position, 0.0f);
		if(collidersThere.Length!=0){
			for(int i = 0; i<collidersThere.Length; i++){
				if(collidersThere[i].name.Equals("PerspectiveWarper")){
					//Debug.Log("Perspective Warper exists!");
					perspectiveJump(collidersThere[i]);
				}
			}
		}
		Collider[] collidersBelow = Physics.OverlapSphere(transform.position+new Vector3(0.0f,-.6f,0.0f), 0.0f);
		if(collidersBelow.Length==1){
			for(int i = 0; i<collidersBelow.Length; i++){
				if(collidersBelow[i].name.Equals("Floor")){
					GetComponent<Rigidbody>().detectCollisions=false;
					GetComponent<Rigidbody>().velocity=new Vector3(0f,-.1f,0f);
					GetComponent<Rigidbody>().rotation=Quaternion.identity;
				}
			}
		}
		if(transform.position.y<=-1){
			Destroy (gameObject);
		}
	}

	bool perspectiveJump(Collider warpCollider){ //Returns true if perspective jump was made
		GameObject warper = warpCollider.gameObject;
		PerspectiveWarpVars warpVars = warper.GetComponent<PerspectiveWarpVars>();
		int orientationRequired = warpVars.OrientationRequired;
		Vector3 warpCoords = warpVars.warpCoords;
		Vector3 belowWarp = new Vector3(0,-1,0);
		Collider[] collidersBelowWarp = Physics.OverlapSphere(warpCoords+belowWarp,0.0f); //Check that they're actually landing on something
		bool cubeBelow=false;
		if(collidersBelowWarp.Length!=0){
			for(int i = 0; i<collidersBelowWarp.Length; i++){
				if(collidersBelowWarp[i].name.Equals("Cube")||collidersBelowWarp[i].name.Equals("endpoint")){
					cubeBelow=true;
				}
				if(collidersBelowWarp[i].name.Equals("RotateButton")){
					cubeBelow=true;
					if((orientationRequired==target.orientation||orientationRequired==4)){
						//rotateObject(collidersBelowWarp[i]);
					}
				}
			}
		}
		//if(!cubeBelow){
		//	Debug.Log("No cube below!");
		//	return false;
		//}
		//warpCoords.y=warpCoords.y-0.25f;
		if((orientationRequired==target.orientation||orientationRequired==4)&&(warpVars.moveRequired==direction||warpVars.moveRequired==4)){
			transform.position=warpCoords;
			return true;
		}
		return false;
	}
}
