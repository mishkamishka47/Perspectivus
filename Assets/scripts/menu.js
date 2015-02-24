#pragma strict
import UnityEngine.UI;

static var windowSwitch : boolean = false;
private var windowExit = Rect(Screen.width*0.25, Screen.height*0.25, Screen.width*0.6, Screen.height*0.5);
private var info : Text;
private var distance : float = 100;
private var scores: int = 0;
static private var level : int = 1;
var time : float = 50.0;
var steps : int = 0;
public var labelSkin : GUISkin;
public var labelAnotherSkin : GUISkin;
public var settingSkin : GUISkin;
function OnGUI () {
	if(time < 0){
		GUI.skin = labelAnotherSkin;
		GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.2, Screen.width*0.7, Screen.height*0.4));
		GUILayout.BeginVertical();
		GUILayout.Label("~Failed~");
		GUILayout.EndVertical();
		GUILayout.BeginHorizontal();
		if(GUILayout.Button("Retry")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			Application.LoadLevel("Level"+level);
		}
		if(GUILayout.Button("Main Menu")){
			Destroy(GameObject.Find("musicBox"));
			Application.LoadLevel("menu");
		}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
	else if(distance <= 1 && time >= 0){
		scores = time + (100 - steps);
		GUI.skin = labelAnotherSkin;
		GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.2, Screen.width*0.7, Screen.height*0.4));
		GUILayout.BeginVertical();
		GUILayout.Label("Succeed!!!");
		
		GUI.skin = labelSkin;
		GUILayout.Label("Scores: "+scores);
		GUILayout.EndVertical();
		GUILayout.EndArea();
		
		GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.5, Screen.width*0.7, Screen.height*0.2));
		GUILayout.BeginHorizontal();
		GUI.skin = labelAnotherSkin;
		if(GUILayout.Button("Next Level")){
			level++;
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			Application.LoadLevel("Level"+level);
		}
		if(GUILayout.Button("Retry")){
			DontDestroyOnLoad(GameObject.Find("musicBox"));
			Application.LoadLevel("Level"+level);
		}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
	else{
		GUI.skin = labelSkin;
		GUI.Label(Rect(10, 10, 200, 90), "Time: " + time +"\n" + "Steps: " + steps);
	}
	if(windowSwitch){
		GUI.skin = settingSkin;
		windowExit = GUI.Window(0, windowExit, windowContain, "Settings");
	}
}
function Start(){
	windowSwitch = false;
	InvokeRepeating("subtime", 0, 1);
}

function subtime(){
	if(distance > 1)
	time -= 1;
}

function windowContain(windowID: int){
	GUILayout.BeginHorizontal();
	GUILayout.BeginVertical();
	GUILayout.Space(60);
	if(GUILayout.Button("Turn off Music")){
		GameObject.Find("musicBox").audio.Pause();
	}
	GUILayout.Space(20);
	if(GUILayout.Button("Turn on Music")){
		GameObject.Find("musicBox").audio.Play();
	}
	GUILayout.Space(20);
	if(GUILayout.Button("Resume")){
		time+=1;
		InvokeRepeating("subtime", 0, 1);
		windowSwitch = false;
	}
	GUILayout.Space(20);
	if(GUILayout.Button("Main Menu")){
		Destroy(GameObject.Find("musicBox"));
		Application.LoadLevel("menu");
	}
	GUILayout.Space(20);
	if(GUILayout.Button("Quit")){
		Application.Quit();
	}
	GUILayout.EndVertical();
	GUILayout.EndHorizontal();
}

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)){
		if(!windowSwitch)
			CancelInvoke();
		else{
			time+=1;
			InvokeRepeating("subtime", 0, 1);
		}
		windowSwitch = !windowSwitch;
	}
	if(Input.GetKeyDown("up")||Input.GetKeyDown("down")||Input.GetKeyDown("left")||Input.GetKeyDown("right")){
		steps++;
	}
	distance = Vector3.Distance(GameObject.Find("Player").transform.position, GameObject.Find("endpoint").transform.position);
}

