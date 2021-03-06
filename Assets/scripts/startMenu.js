﻿#pragma strict
import UnityEngine.UI;

public var labelSkin : GUISkin;
public var starTexture : Texture;
private var maxLevel : int = 28;
private var currentWorld : int = 1;
private var maxWorld : int = 5;
private var firstMenu : boolean = true;
private var current : int = 1;
private var name : String;
private var nowlevel : int = 1;
private var worldLevelSelect : int = -1;
function OnGUI(){
	GUI.skin = labelSkin;
	if(firstMenu){
		GUILayout.BeginArea(Rect(0, Screen.height*0.1, Screen.width, Screen.height*0.2));
		GUILayout.Label("Perspectivus");
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(Screen.width*0.45, Screen.height*0.45, Screen.width*0.55, Screen.height*0.5));
		GUILayout.BeginHorizontal();
		GUILayout.BeginVertical();
		if(GUILayout.Button("Play")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.LoadLevel("Level1");
		}
		GUILayout.Space(20);
		if(GUILayout.Button("Continue")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).starlist = GameObject.Find("pass").GetComponent(PlayerPrefsX).GetIntArray("starlist");
			GameObject.Find("pass").GetComponent(passValue).collect = GameObject.Find("pass").GetComponent(PlayerPrefsX).GetIntArray("collect");
		}
		GUILayout.Space(20);
		if(GUILayout.Button("Load")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			firstMenu = false;
		}
		GUILayout.Space(20);
		if(GUILayout.Button("Quit")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.Quit();
		}
		GUILayout.EndArea();
	}
	if(!firstMenu&&worldLevelSelect==-1){
		currentWorld = (current-1)/7 + 1;
		GUILayout.BeginArea(Rect(0, 0, Screen.width, Screen.height*0.2));
		GUILayout.BeginVertical();
		GUI.skin = labelSkin;
		var labelc : GUIStyle = GUI.skin.GetStyle("label1");
		var c = GameObject.Find("pass").GetComponent(passValue).collect[currentWorld*2-2];
		var d = GameObject.Find("pass").GetComponent(passValue).collect[currentWorld*2-1];
		//Debug.Log(c+" "+d);
		GUILayout.Label("World Select");
		//GUILayout.Label("col: "+c+"/"+d, labelc);
		GUILayout.EndVertical();
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(Screen.width*0.2, Screen.height*0.2, Screen.width*0.6, Screen.height*0.5));
		var i = current;
		GUILayout.BeginHorizontal();
		if(GUILayout.Button("1")){
			worldLevelSelect=1;
		}
		if(GUILayout.Button("2")){
			worldLevelSelect=2;
		}
		if(GUILayout.Button("3")){
			worldLevelSelect=3;
		}
		if(GUILayout.Button("4")){
			worldLevelSelect=4;
		}
		GUILayout.EndHorizontal();
//		while(i<=(4+current) && (i==current ||(i-1)%7!=0)){
//			GUILayout.BeginHorizontal();
//			if(GUILayout.Button("level "+i)){
//				DontDestroyOnLoad(GameObject.Find("musicBox"));
//				DontDestroyOnLoad(GameObject.Find("pass"));
//				GameObject.Find("pass").GetComponent(passValue).setValue(i);
//				GameObject.Find("pass").GetComponent(passValue).setLevel(i);
//				if((i-1)/7 != nowlevel/7){
//					var mn = (i-1)/7+1;
//					GameObject.Find("musicBox").GetComponent(music).changeClip(mn);
//				}
//				Application.LoadLevel("Level"+i);
//			}
//			var label2 : GUIStyle = GUI.skin.GetStyle("label2");
//			var label3 : GUIStyle = GUI.skin.GetStyle("label3");
//			var number = GameObject.Find("pass").GetComponent(passValue).starlist[i-1];
//			var a = 0;
//			while(a<3){
//				if(a<number)
//					GUILayout.Label(starTexture, label2);
//				else
//					GUILayout.Label(starTexture, label3);
//				a++;
//			}
//			i++;
//			GUILayout.EndHorizontal();
//			GUILayout.Space(20);
//		}
		
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(0, Screen.height*0.8, Screen.width, Screen.height*0.2));
		GUILayout.BeginHorizontal();
		//if(GUILayout.Button("Last")){
		//	if(i-7>0)
		//		current = i-7;
		//}
		if(GUILayout.Button("Back")){
			current = 1;
			firstMenu = true;
			worldLevelSelect=-1;
		}
		//if(GUILayout.Button("Next")){
		//	current = i;
		//}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
	if(!firstMenu&&worldLevelSelect!=-1){
		currentWorld = (current-1)/7 + 1;
		GUILayout.BeginArea(Rect(0, 0, Screen.width, Screen.height*0.2));
		GUILayout.BeginVertical();
		GUI.skin = labelSkin;
		//labelc : GUIStyle = GUI.skin.GetStyle("label1");
		c = GameObject.Find("pass").GetComponent(passValue).collect[currentWorld*2-2];
		d = GameObject.Find("pass").GetComponent(passValue).collect[currentWorld*2-1];
		//Debug.Log(c+" "+d);
		GUILayout.Label("World Select");
		//GUILayout.Label("col: "+c+"/"+d, labelc);
		GUILayout.EndVertical();
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(Screen.width*0.2, Screen.height*0.2, Screen.width*0.6, Screen.height*0.5));
		
		//var i = current;
		GUILayout.BeginHorizontal();
		if(GUILayout.Button("1")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).setValue((((worldLevelSelect-1)*7)+1));
			GameObject.Find("pass").GetComponent(passValue).setLevel((((worldLevelSelect-1)*7)+1));
			if(worldLevelSelect != nowlevel/7){
				GameObject.Find("musicBox").GetComponent(music).changeClip(worldLevelSelect);
			}
			Application.LoadLevel("Level"+(((worldLevelSelect-1)*7)+1));
		}
		if(GUILayout.Button("2")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).setValue((((worldLevelSelect-1)*7)+2));
			GameObject.Find("pass").GetComponent(passValue).setLevel((((worldLevelSelect-1)*7)+2));
			if(worldLevelSelect != nowlevel/7){
				GameObject.Find("musicBox").GetComponent(music).changeClip(worldLevelSelect);
			}
			Application.LoadLevel("Level"+(((worldLevelSelect-1)*7)+2));
		}
		if(GUILayout.Button("3")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).setValue((((worldLevelSelect-1)*7)+3));
			GameObject.Find("pass").GetComponent(passValue).setLevel((((worldLevelSelect-1)*7)+3));
			if(worldLevelSelect != nowlevel/7){
				var mn = worldLevelSelect+1;
				GameObject.Find("musicBox").GetComponent(music).changeClip(worldLevelSelect);
			}
			Application.LoadLevel("Level"+(((worldLevelSelect-1)*7)+3));
		}
		if(GUILayout.Button("4")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).setValue((((worldLevelSelect-1)*7)+4));
			GameObject.Find("pass").GetComponent(passValue).setLevel((((worldLevelSelect-1)*7)+4));
			if(worldLevelSelect != nowlevel/7){
				GameObject.Find("musicBox").GetComponent(music).changeClip(worldLevelSelect);
			}
			Application.LoadLevel("Level"+(((worldLevelSelect-1)*7)+4));
		}
		if(GUILayout.Button("5")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).setValue((((worldLevelSelect-1)*7)+5));
			GameObject.Find("pass").GetComponent(passValue).setLevel((((worldLevelSelect-1)*7)+5));
			if(worldLevelSelect != nowlevel/7){
				GameObject.Find("musicBox").GetComponent(music).changeClip(worldLevelSelect);
			}
			Application.LoadLevel("Level"+(((worldLevelSelect-1)*7)+5));
		}
		if(GUILayout.Button("6")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).setValue((((worldLevelSelect-1)*7)+6));
			GameObject.Find("pass").GetComponent(passValue).setLevel((((worldLevelSelect-1)*7)+6));
			if(worldLevelSelect != nowlevel/7){
				GameObject.Find("musicBox").GetComponent(music).changeClip(worldLevelSelect);
			}
			Application.LoadLevel("Level"+(((worldLevelSelect-1)*7)+6));
		}
		if(GUILayout.Button("7")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			GameObject.Find("pass").GetComponent(passValue).setValue((((worldLevelSelect-1)*7)+7));
			GameObject.Find("pass").GetComponent(passValue).setLevel((((worldLevelSelect-1)*7)+7));
			if(worldLevelSelect != nowlevel/7){
				GameObject.Find("musicBox").GetComponent(music).changeClip(worldLevelSelect);
			}
			Application.LoadLevel("Level"+(((worldLevelSelect-1)*7)+7));
		}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
		GUILayout.BeginArea(Rect(0, Screen.height*0.8, Screen.width, Screen.height*0.2));
		GUILayout.BeginHorizontal();
		//if(GUILayout.Button("Last")){
		//	if(i-7>0)
		//		current = i-7;
		//}
		if(GUILayout.Button("Back")){
			current = 1;
			worldLevelSelect=-1;
		}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
}
function Start () {
	nowlevel = GameObject.Find("pass").GetComponent(passValue).getLevel();
}

function Update () {

}