using UnityEngine;
using System.Collections;

public class PlayerMovement : MonoBehaviour {
	public Rotate90 target;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		int orientation = target.orientation;
		if(Input.GetKeyDown("up")){
			if(orientation==0&&pathPresent(1.0f,0.0f,0.0f)){
				transform.Translate(1,0,0, Space.World);
			}else if(orientation==1&&pathPresent(0.0f,0.0f,1.0f)){
				transform.Translate(0,0,1, Space.World);
			}else if(orientation==2&&pathPresent(-1.0f,0.0f,0.0f)){
				transform.Translate(-1,0,0, Space.World);
			}else if(orientation==3&&pathPresent(0.0f,0.0f,-1.0f)){
				transform.Translate(0,0,-1, Space.World);
			}
		}else if(Input.GetKeyDown("down")){
			if(orientation==0&&pathPresent(-1.0f,0.0f,0.0f)){
				transform.Translate(-1,0,0, Space.World);
			}else if(orientation==1&&pathPresent(0.0f,0.0f,-1.0f)){
				transform.Translate(0,0,-1, Space.World);
			}else if(orientation==2&&pathPresent(1.0f,0.0f,0.0f)){
				transform.Translate(1,0,0, Space.World);
			}else if(orientation==3&&pathPresent(0.0f,0.0f,1.0f)){
				transform.Translate(0,0,1, Space.World);
			}
		}else if(Input.GetKeyDown("left")){
			if(orientation==0&&pathPresent(0.0f,0.0f,1.0f)){
				transform.Translate(0,0,1, Space.World);
			}else if(orientation==1&&pathPresent(-1.0f,0.0f,0.0f)){
				transform.Translate(-1,0,0, Space.World);
			}else if(orientation==2&&pathPresent(0.0f,0.0f,-1.0f)){
				transform.Translate(0,0,-1, Space.World);
			}else if(orientation==3&&pathPresent(1.0f,0.0f,0.0f)){
				transform.Translate(1,0,0, Space.World);
			}
		}else if(Input.GetKeyDown("right")){
			if(orientation==0&&pathPresent(0.0f,0.0f,-1.0f)){
				transform.Translate(0,0,-1, Space.World);
			}else if(orientation==1&&pathPresent(1.0f,0.0f,0.0f)){
				transform.Translate(1,0,0, Space.World);
			}else if(orientation==2&&pathPresent(0.0f,0.0f,1.0f)){
				transform.Translate(0,0,1, Space.World);
			}else if(orientation==3&&pathPresent(-1.0f,0.0f,0.0f)){
				transform.Translate(-1,0,0, Space.World);
			}
		}
		
	}
	bool pathPresent(float x, float y, float z) { //Returns true if translation should still take place (no successful perspective jump, path clear), false otherwise
		Vector3 center = new Vector3(x,y,z);
		
		Collider[] collidersThere = Physics.OverlapSphere(center+transform.position, 0.0f);
		if(collidersThere.Length!=0){
			//Debug.Log(collidersThere[0].name);
			bool pathBlocked = false;
			for(int i = 0; i<collidersThere.Length; i++){
				if(collidersThere[i].name.Equals("PerspectiveWarper")){
					if(perspectiveJump(collidersThere[i])){
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
		
		Vector3 belowCenter = new Vector3(x,y-1,z);
        Collider[] collidersBelow = Physics.OverlapSphere(belowCenter+transform.position, 0.0f);
		if(collidersBelow.Length!=0){
			//Debug.Log(collidersBelow[0].name);
		}
		
        return collidersBelow.Length!=0;
	}
	bool perspectiveJump(Collider warpCollider){ //Returns true if perspective jump was made
		GameObject warper = warpCollider.gameObject;
		PerspectiveWarpVars warpVars = warper.GetComponent<PerspectiveWarpVars>();
		int orientationRequired = warpVars.OrientationRequired;
		Vector3 warpCoords = warpVars.warpCoords;
		warpCoords.y=warpCoords.y-0.25f;
		if(orientationRequired==target.orientation){
			transform.position=warpCoords;
			return true;
		}
		return false;
	}
}
