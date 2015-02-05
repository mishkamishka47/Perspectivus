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
			if(orientation==0){
				transform.Translate(1,0,0, Space.World);
			}else if(orientation==1){
				transform.Translate(0,0,1, Space.World);
			}else if(orientation==2){
				transform.Translate(-1,0,0, Space.World);
			}else{
				transform.Translate(0,0,-1, Space.World);
			}
		}else if(Input.GetKeyDown("down")){
			if(orientation==0){
				transform.Translate(-1,0,0, Space.World);
			}else if(orientation==1){
				transform.Translate(0,0,-1, Space.World);
			}else if(orientation==2){
				transform.Translate(1,0,0, Space.World);
			}else{
				transform.Translate(0,0,1, Space.World);
			}
		}else if(Input.GetKeyDown("left")){
			if(orientation==0){
				transform.Translate(0,0,1, Space.World);
			}else if(orientation==1){
				transform.Translate(-1,0,0, Space.World);
			}else if(orientation==2){
				transform.Translate(0,0,-1, Space.World);
			}else{
				transform.Translate(1,0,0, Space.World);
			}
		}else if(Input.GetKeyDown("right")){
			if(orientation==0){
				transform.Translate(0,0,-1, Space.World);
			}else if(orientation==1){
				transform.Translate(1,0,0, Space.World);
			}else if(orientation==2){
				transform.Translate(0,0,1, Space.World);
			}else{
				transform.Translate(-1,0,0, Space.World);
			}
		}
	}
}
