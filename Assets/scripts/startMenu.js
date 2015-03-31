#pragma strict
import UnityEngine.UI;

public var labelSkin : GUISkin;
public var starTexture : Texture;
private var maxLevel : int = 35;
private var currentWorld : int = 1;
private var maxWorld : int = 5;
private var firstMenu : boolean = true;
private var current : int = 1;
private var name : String;
function OnGUI(){
	GUI.skin = labelSkin;
	if(firstMenu){
		GUILayout.BeginArea(Rect(0, Screen.height*0.3, Screen.width, Screen.height*0.2));
		GUILayout.BeginHorizontal();
		GUILayout.Label("Perspectivus");
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(Screen.width*0.4, Screen.height*0.5, Screen.width*0.3, Screen.height*0.5));
		GUILayout.BeginHorizontal();
		GUILayout.BeginVertical();
		if(GUILayout.Button("Play!!!")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("musicBox 1"));
			DontDestroyOnLoad(GameObject.Find("musicBox 2"));
			DontDestroyOnLoad(GameObject.Find("musicBox 3"));
			DontDestroyOnLoad(GameObject.Find("musicBox 4"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.LoadLevel("Level1");
		}
		GUILayout.Space(20);
		if(GUILayout.Button("Continue")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("musicBox 1"));
			DontDestroyOnLoad(GameObject.Find("musicBox 2"));
			DontDestroyOnLoad(GameObject.Find("musicBox 3"));
			DontDestroyOnLoad(GameObject.Find("musicBox 4"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).starlist = GameObject.Find("pass").GetComponent(PlayerPrefsX).GetIntArray("starlist");
		}
		GUILayout.Space(20);
		if(GUILayout.Button("load")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("musicBox 1"));
			DontDestroyOnLoad(GameObject.Find("musicBox 2"));
			DontDestroyOnLoad(GameObject.Find("musicBox 3"));
			DontDestroyOnLoad(GameObject.Find("musicBox 4"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			firstMenu = false;
		}
		GUILayout.Space(20);
		if(GUILayout.Button("quit")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("musicBox 1"));
			DontDestroyOnLoad(GameObject.Find("musicBox 2"));
			DontDestroyOnLoad(GameObject.Find("musicBox 3"));
			DontDestroyOnLoad(GameObject.Find("musicBox 4"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.Quit();
		}
		GUILayout.EndArea();
	}
	if(!firstMenu){
		currentWorld = (current-1)/7 + 1;
		GUILayout.BeginArea(Rect(0, Screen.height*0.05, Screen.width, Screen.height*0.15));
		GUILayout.BeginHorizontal();
		GUILayout.Label("world "+currentWorld);
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(Screen.width*0.2, Screen.height*0.2, Screen.width*0.6, Screen.height*0.5));
		
		var i = current;
		
		while(i<=(4+current) && (i==current ||(i-1)%7!=0)){
			GUILayout.BeginHorizontal();
			if(GUILayout.Button("level "+i)){
				DontDestroyOnLoad(GameObject.Find("musicBox"));
				DontDestroyOnLoad(GameObject.Find("musicBox 1"));
				DontDestroyOnLoad(GameObject.Find("musicBox 2"));
				DontDestroyOnLoad(GameObject.Find("musicBox 3"));
				DontDestroyOnLoad(GameObject.Find("musicBox 4"));
				DontDestroyOnLoad(GameObject.Find("pass"));
				GameObject.Find("pass").GetComponent(passValue).setValue(i);
				GameObject.Find("pass").GetComponent(passValue).setLevel(i);
				Application.LoadLevel("Level"+i);
			}
			var label2 : GUIStyle = GUI.skin.GetStyle("label2");
			var label3 : GUIStyle = GUI.skin.GetStyle("label3");
			var number = GameObject.Find("pass").GetComponent(passValue).starlist[i-1];
			var a = 0;
			while(a<3){
				if(a<number)
					GUILayout.Label(starTexture, label2);
				else
					GUILayout.Label(starTexture, label3);
				a++;
			}
			//GUILayout.Label(number +" stars", label2);
			i++;
			GUILayout.EndHorizontal();
			GUILayout.Space(20);
		}
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(0, Screen.height*0.8, Screen.width, Screen.height*0.2));
		GUILayout.BeginHorizontal();
		if(GUILayout.Button("Last")){
			if(i-7>0)
				current = i-7;
		}
		if(GUILayout.Button("Back")){
			current = 1;
			firstMenu = true;
		}
		if(GUILayout.Button("Next")){
			current = i;
		}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
}
function Start () {

}

function Update () {

}