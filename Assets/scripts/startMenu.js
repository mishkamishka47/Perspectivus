#pragma strict
import UnityEngine.UI;

public var labelSkin : GUISkin;
private var maxLevel : int = 14;
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
		GUILayout.BeginArea(Rect(Screen.width*0.4, Screen.height*0.5, Screen.width*0.3, Screen.height*0.5));
		GUILayout.BeginHorizontal();
		GUILayout.BeginVertical();

		if(GUILayout.Button("Play!!!")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.LoadLevel("Level1");
		}
		GUILayout.Space(20);
		if(GUILayout.Button("Continue")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).starlist = GameObject.Find("pass").GetComponent(PlayerPrefsX).GetIntArray("starlist");
		}
		GUILayout.Space(20);
		if(GUILayout.Button("load")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			firstMenu = false;
		}
		GUILayout.Space(20);
		if(GUILayout.Button("quit")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.Quit();
		}
		GUILayout.EndArea();
	}
	if(!firstMenu){
		GUILayout.BeginArea(Rect(Screen.width*0.2, Screen.height*0.2, Screen.width*0.6, Screen.height*0.5));
		
		var i = current;
		
		while(i<=(5+current) && i<=maxLevel){
			GUILayout.BeginHorizontal();
			if(GUILayout.Button("level "+i)){
				DontDestroyOnLoad(GameObject.Find("musicBox"));
				DontDestroyOnLoad(GameObject.Find("pass"));
				GameObject.Find("pass").GetComponent(passValue).setValue(i);
				Application.LoadLevel("Level"+i);
			}
			var label2 : GUIStyle = GUI.skin.GetStyle("label2");
			var number = GameObject.Find("pass").GetComponent(passValue).starlist[i-1];
			GUILayout.Label(number +" stars", label2);
			i++;
			GUILayout.EndHorizontal();
			GUILayout.Space(20);
		}
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