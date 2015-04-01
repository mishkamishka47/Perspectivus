#pragma strict
import UnityEngine.UI;

static var windowSwitch : boolean = false;
static private var level : int = 1;
private var windowExit = Rect(Screen.width*0.2, Screen.height*0.1, Screen.width*0.6, Screen.height*0.8);
private var windowStory = Rect(0, 0, Screen.width, Screen.height);
private var windowPickup = Rect(Screen.width*0.3, 0, Screen.width*0.7, Screen.height*0.3);
private var info : Text;
private var distance : float = 100;
private var scores: int = 0;
private var stars : int = 0;
private var ori : int;
private var steps : int = 0;
private var story : boolean = false;
private var pre : boolean = false;
private var csScript : PlayerMovement;
private var st : String = "";
private var pr : String = "";
private var scrollPosition : Vector2;
private var time : float = 0.0;

public var starTexture : Texture;
public var labelSkin : GUISkin;
public var labelAnotherSkin : GUISkin;
public var settingSkin : GUISkin;
public var storySkin : GUISkin;
public var pickupSkin : GUISkin;


function OnGUI () {
//	if(time < 0){
//		GUI.skin = labelAnotherSkin;
//		GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.2, Screen.width*0.7, Screen.height*0.4));
//		GUILayout.BeginVertical();
//		GUILayout.Label("~Failed~");
//		GUILayout.EndVertical();
//		GUILayout.BeginHorizontal();
//		if(GUILayout.Button("Retry")){
//			DontDestroyOnLoad(GameObject.Find("musicBox"));
//			DontDestroyOnLoad(GameObject.Find("pass"));
//			Application.LoadLevel("Level"+level);
//		}
//		if(GUILayout.Button("Main Menu")){
//			DontDestroyOnLoad(GameObject.Find("musicBox"));
//			DontDestroyOnLoad(GameObject.Find("pass"));
//			Application.LoadLevel("menu");
//		}
//		GUILayout.EndHorizontal();
//		GUILayout.EndArea();
//	}
	if(distance <= 1){
		CancelInvoke();
		scores = 3000- time*5 + (1000 - steps);
		if(scores >= 3000)
			stars = 3;
		else if(time >= 1500)
			stars = 2;
		else 
			stars = 1;
		GUI.skin = labelAnotherSkin;
		GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.2, Screen.width*0.7, Screen.height*0.7));
		GUILayout.BeginVertical();
		GUILayout.Label("Succeed!!!");
		
		GUI.skin = labelSkin;
		var label1 : GUIStyle = GUI.skin.GetStyle("label1");
		var label2 : GUIStyle = GUI.skin.GetStyle("label2");
		GUILayout.Label("Scores: "+scores);
		GUILayout.Space(20);
		GUILayout.EndVertical();
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		var a = 0;
		while(a<3){
			if(a<stars)
				GUILayout.Label(starTexture, label1);
			else
				GUILayout.Label(starTexture, label2);
			a++;
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		GUILayout.Space(25);
		GUILayout.BeginHorizontal();
		GUI.skin = labelAnotherSkin;
		if(GUILayout.Button("Next Level")){
			var ori = GameObject.Find("pass").GetComponent(passValue).starlist[level-1];
			if(stars > ori)
				GameObject.Find("pass").GetComponent(passValue).starlist[level-1] = stars;
			level = GameObject.Find("pass").GetComponent(passValue).getLevel();
			Debug.Log(level);
			if((level-1)/7 != level/7){
				var mn = level/7+1;
				Debug.Log(mn);
				GameObject.Find("musicBox").GetComponent(music).changeClip(mn);
			}
			level++;
			GameObject.Find("pass").GetComponent(passValue).setValue(level);
			DontDestroyOnLoad(GameObject.Find("pass"));
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			GameObject.Find("pass").GetComponent(passValue).setLevel(level);
			Application.LoadLevel("Level"+level);
		}
		if(GUILayout.Button("Retry")){
			ori = GameObject.Find("pass").GetComponent(passValue).starlist[level-1];
			if(stars > ori)
				GameObject.Find("pass").GetComponent(passValue).starlist[level-1] = stars;
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.LoadLevel("Level"+level);
		}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
	else if(!pre){
		GUI.skin = labelSkin;
		GUI.Label(Rect(10, 10, 200, 90), "Steps: " + steps);
	}
	if(windowSwitch){
		GUI.skin = settingSkin;
		windowExit = GUI.Window(0, windowExit, windowContain, "Settings");
	}
	if(story){
		GUI.skin = pickupSkin;
		windowPickup = GUI.Window(0, windowPickup, storyBoard, "New Items Received");
	}
	if(pre){
		GUI.skin = storySkin;
		windowStory = GUI.Window(0, windowStory, preBoard, "New Data Linked");
	}
}

function Start(){
	windowSwitch = false;
	st = GameObject.Find("pass").GetComponent(passValue).getData();
	pr = GameObject.Find("pass").GetComponent(passValue).getPre();
	if(pr!="")
		pre = true;
	ori = time;
	level = GameObject.Find("pass").GetComponent(passValue).getLevel();
	InvokeRepeating("subtime", 0, 1);
	level = GameObject.Find("pass").GetComponent(passValue).getValue();
}

function Awake(){
	csScript = GameObject.Find("Player").GetComponent(PlayerMovement);
}

function subtime(){
	if(distance > 1)
	time += 1;
}

function save(){
	GameObject.Find("pass").GetComponent(PlayerPrefsX).SetIntArray("starlist", GameObject.Find("pass").GetComponent(passValue).starlist);
	GameObject.Find("pass").GetComponent(PlayerPrefsX).SetIntArray("collect", GameObject.Find("pass").GetComponent(passValue).collect);
}

function preBoard(windowID: int){
	GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.15, Screen.width*0.7, Screen.height*0.55));
	GUILayout.Space(20);
	GUILayout.Label(pr);
	GUILayout.EndArea();
	GUILayout.BeginArea(Rect(Screen.width*0.1, Screen.height*0.85, Screen.width*0.8, Screen.height*0.15));
	if(GUILayout.Button("Resume")){
		time-=1;
		InvokeRepeating("subtime", 0, 1);
		pre = false;
		GameObject.Find("pass").GetComponent(passValue).setPre();
	}
	GUILayout.EndArea();
}

function storyBoard(windowID: int){
	scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.Width(Screen.width*0.65), GUILayout.Height(Screen.height*0.2));
	GUILayout.BeginHorizontal();
	GUILayout.Space(30);
	GUILayout.Label(st);
	GUILayout.EndHorizontal();
	GUILayout.EndScrollView();
	if(GUI.Button(Rect(Screen.width*0.45, Screen.height*0.2, Screen.width*0.15,Screen.height*0.1),"Resume")){
		time-=1;
		GameObject.Find("pass").GetComponent(passValue).addCol();
		InvokeRepeating("subtime", 0, 1);
		csScript.setStory();
		story = false;
	}
}

function windowContain(windowID: int){
	GUILayout.BeginHorizontal();
	GUILayout.BeginVertical();
	GUILayout.Space(30);
	if(GUILayout.Button("Turn off Music")){
		GameObject.Find("musicBox").GetComponent(music).turnOff();
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Turn on Music")){
		GameObject.Find("musicBox").GetComponent(music).turnOn();
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Save")){
		save();
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Resume")){
		time-=1;
		InvokeRepeating("subtime", 0, 1);
		windowSwitch = false;
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Main Menu")){
		save();
		Destroy(GameObject.Find("pass"));
		Destroy(GameObject.Find("musicBox"));
		Application.LoadLevel("menu");
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Quit")){
		Application.Quit();
	}
	GUILayout.EndVertical();
	GUILayout.EndHorizontal();
}

function Update () {
	steps = csScript.getSteps();
	story = csScript.getStory();
	if(Input.GetKeyDown(KeyCode.Escape)){
		if(!windowSwitch)
			CancelInvoke();
		else{
			time-=1;
			InvokeRepeating("subtime", 0, 1);
		}
		windowSwitch = !windowSwitch;
	}
	if(story)
		CancelInvoke();
	if(pre)
		CancelInvoke();
	distance = Vector3.Distance(GameObject.Find("Player").transform.position, GameObject.Find("Endpoint Emitter").transform.position);
}

