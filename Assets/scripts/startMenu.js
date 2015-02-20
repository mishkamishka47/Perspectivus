#pragma strict
import UnityEngine.UI;

public var labelSkin : GUISkin;
private var maxLevel : int = 10;
private var firstMenu : boolean = true;
private var current : int = 1;
private var name : String;
function OnGUI(){
	GUI.skin = labelSkin;
	if(firstMenu){
		GUILayout.BeginArea(Rect(0, Screen.height*0.3, Screen.width, Screen.height*0.2));
		GUILayout.BeginHorizontal();
		GUILayout.Label("Perspective");
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(Screen.width*0.4, Screen.height*0.5, Screen.width*0.3, Screen.height*0.3));
		GUILayout.BeginHorizontal();
		GUILayout.BeginVertical();

		if(GUILayout.Button("Play!!!")){
			Application.LoadLevel("Level1");
		}
		GUILayout.Space(20);
		if(GUILayout.Button("load")){
			firstMenu = false;
		}
		GUILayout.Space(20);
		if(GUILayout.Button("quit")){
			Application.Quit();
		}
		GUILayout.EndArea();
	}
	if(!firstMenu){
		GUILayout.BeginArea(Rect(Screen.width*0.35, Screen.height*0.2, Screen.width*0.3, Screen.height*0.5));
		GUILayout.BeginVertical();
		if(current >= maxLevel){
		
		}
		
		var i = current;
		
		while(i<=(5+current) && i<=maxLevel){
			if(GUILayout.Button("level "+i)){
				Application.LoadLevel("Level"+i);
			}
			GUILayout.Space(20);
			i++;
		}
		GUILayout.EndVertical();
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(0, Screen.height*0.8, Screen.width, Screen.height*0.2));
		GUILayout.BeginHorizontal();
		if(GUILayout.Button("Last")){
			if(current > 6)
				current -= 6;
		}
		if(GUILayout.Button("Back")){
			current = 1;
			firstMenu = true;
		}
		if(GUILayout.Button("Next")){
			if(current + 6 < maxLevel)
				current += 6;
		}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
}
function Start () {

}

function Update () {

}