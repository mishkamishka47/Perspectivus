using UnityEngine;
using System.Collections;

public class SeesawController : MonoBehaviour {
	public float originalHeight;
	public SeesawController sisterSaw;
	public bool isRising;
	// Use this for initialization
	void Start () {
		originalHeight = transform.position.y;
		isRising=false;
	}
	
	// Update is called once per frame
	void Update () {
		Collider[] collidersThere = Physics.OverlapSphere(new Vector3(0,1,0)+transform.position, 0.0f);
		if(collidersThere.Length!=0){
			
			for(int i = 0; i<collidersThere.Length; i++){
				//Debug.Log(collidersThere[i].name);
				if(collidersThere[i].name.Equals("ball(Clone)")){
					//Debug.Log("Attempting to sink");
					sink();
					sisterSaw.rise();
				}
			}
		}else if(transform.position.y<originalHeight){
			returnToOriginal();
		}
	}
	void sink(){
		if(transform.position.y>originalHeight-2){
			//Debug.Log ("literally translating");
			this.transform.Translate(0,-.01f,0, Space.World);
		}else{
			//Debug.Log ("Max Height Reached");
		}
	}
	void rise(){
		if(transform.position.y<originalHeight+2){
			isRising=true;
			Collider[] collidersThere = Physics.OverlapSphere(new Vector3(0,1,0)+transform.position, .5f);
			if(collidersThere.Length!=0){
				
				for(int i = 0; i<collidersThere.Length; i++){
					Debug.Log(collidersThere[i].name);
					if(collidersThere[i].name.Equals("Player")){
						Debug.Log("A player is on top of this see-saw!");
						Debug.Log ("Moving player from " + collidersThere[i].gameObject.transform.position.y);
						//collidersThere[i].gameObject.transform.Translate(0,.01f,0, Space.World);
						PlayerMovement pM = collidersThere[i].gameObject.GetComponent<PlayerMovement>();
						pM.setTargetPosition(new Vector3(pM.getTargetPosition().x,pM.getTargetPosition().y+.01f,pM.getTargetPosition().z));
						Debug.Log ("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + pM.targetPosition);
						Debug.Log("To " + collidersThere[i].gameObject.transform.position.y);
					}
				}
			}
			this.transform.Translate(0,.01f,0, Space.World);

		}else{
			isRising=false;
		}
	}
	void returnToOriginal(){
		this.transform.Translate(0,.01f,0, Space.World);
		sisterSaw.transform.Translate(0,-.01f,0, Space.World);
	}
}
