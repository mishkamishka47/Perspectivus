#pragma strict
import UnityEngine.UI;

private var current : int = 1;
public var startSkin : GUISkin;

function OnGUI(){
	GUI.skin = startSkin;
	var label1 : GUIStyle = GUI.skin.GetStyle("start1");
	var label2 : GUIStyle = GUI.skin.GetStyle("start2");
	var label3 : GUIStyle = GUI.skin.GetStyle("start3");
	var label4 : GUIStyle = GUI.skin.GetStyle("start4");
	if(current==1){
		GUI.Label(Rect(0,0,Screen.width, Screen.height),"AD 2115\n A space ship is roamming around M16\n They found a beautiful planet there",label1);
	}
	else if(current==2){
		GUI.Label(Rect(0,0,Screen.width, Screen.height),"In the space ship\n Four weird guys are around you\nWith an scary fanatical eyes on you\n",label2);
	}
	else if(current==3){
		GUI.Label(Rect(0,0,Screen.width, Screen.height),"Finally, we can sleep in hibernacula\n one of them said",label2);
	}
	else if(current==4){
		GUI.Label(Rect(0,0,Screen.width, Screen.height),"It's you, a robot, named\n Robert",label3);
	}
	else if(current==5){
		GUI.Label(Rect(0,0,Screen.width, Screen.height),"You are commited to explore this planet and\n find the secret in it",label3);
	}
	else if(current==6){
		GUI.Label(Rect(0,0,Screen.width, Screen.height),"Now, move forward!\n Robert!",label4);
	}
}
function Update () {
	if(Input.GetMouseButtonDown(0)){
		if(current<6)
			current++;
		else{
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.LoadLevel("Level1");
		}
	}
	if(Input.GetMouseButtonDown(1)){
		if(current>1)
			current--;
	}
}