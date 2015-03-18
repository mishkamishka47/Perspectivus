using UnityEngine;
using System.Collections;

public class ballController : MonoBehaviour {
	public Rotate90 target;
	// Use this for initialization
	void Start () {
		GetComponent<Rigidbody>().velocity=new Vector3(5,0,0);
	}
	
	// Update is called once per frame
	void Update () {
		GetComponent<Rigidbody>().velocity=new Vector3(5,GetComponent<Rigidbody>().velocity.y,GetComponent<Rigidbody>().velocity.z);
		Collider[] collidersThere = Physics.OverlapSphere(transform.position, 0.0f);
		if(collidersThere.Length!=0){

			for(int i = 0; i<collidersThere.Length; i++){
				if(collidersThere[i].name.Equals("PerspectiveWarper")){
					Debug.Log("Perspective Warper exists!");
					perspectiveJump(collidersThere[i]);
				}
			}
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
		warpCoords.y=warpCoords.y-0.25f;
		if((orientationRequired==target.orientation||orientationRequired==4)){
			transform.position=warpCoords;
			return true;
		}
		return false;
	}
}
