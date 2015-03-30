using UnityEngine;
using System.Collections;

public class SeesawController : MonoBehaviour {
	public float originalHeight;
	public SeesawController sisterSaw;
	// Use this for initialization
	void Start () {
		originalHeight = transform.position.y;
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
			Collider[] collidersThere = Physics.OverlapSphere(new Vector3(0,1,0)+transform.position, .1f);
			if(collidersThere.Length!=0){
				
				for(int i = 0; i<collidersThere.Length; i++){
					//Debug.Log(collidersThere[i].name);
					if(collidersThere[i].name.Equals("Player")){
						//Debug.Log("A player is on top of this see-saw!");
						collidersThere[i].gameObject.transform.Translate(0,.01f,0, Space.World);
					}
				}
			}
			this.transform.Translate(0,.01f,0, Space.World);

		}
	}
	void returnToOriginal(){
		this.transform.Translate(0,.01f,0, Space.World);
		sisterSaw.transform.Translate(0,-.01f,0, Space.World);
	}
}
