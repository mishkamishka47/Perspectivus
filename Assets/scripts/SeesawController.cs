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
					//Debug.Log("A ball is on top of this see-saw!");
					sink();
					sisterSaw.rise();
				}
			}
		}else{
			//rise();
		}
	}
	void sink(){
		if(transform.position.y>originalHeight-2){
			this.transform.Translate(0,-.01f,0, Space.World);
		}
	}
	void rise(){
		if(transform.position.y<originalHeight+2){
			this.transform.Translate(0,.01f,0, Space.World);
		}
	}
}
