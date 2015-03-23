#pragma strict
import UnityEngine.UI;

static var windowSwitch : boolean = false;
private var windowExit = Rect(Screen.width*0.25, Screen.height*0.2, Screen.width*0.6, Screen.height*0.6);
private var info : Text;
private var distance : float = 100;
private var scores: int = 0;
private var stars : int = 0;
private var ori : int;
static private var level : int = 1;
public var starTexture : Texture;
public var time : float = 50.0;
private var steps : int = 0;
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
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.LoadLevel("Level"+level);
		}
		if(GUILayout.Button("Main Menu")){
			Destroy(GameObject.Find("musicBox"));
			DontDestroyOnLoad(GameObject.Find("pass"));
			Application.LoadLevel("menu");
		}
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
	else if(distance <= 1 && time >= 0){
		CancelInvoke();
		scores = time + (100 - steps);
		if(time > 10)
			stars = 3;
		else if(time >= 5)
			stars = 2;
		else 
			stars = 1;
		GUI.skin = labelAnotherSkin;
		GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.2, Screen.width*0.7, Screen.height*0.4));
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
		GUILayout.EndArea();
		
		GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.6, Screen.width*0.7, Screen.height*0.2));
		GUILayout.BeginHorizontal();
		GUI.skin = labelAnotherSkin;
		if(GUILayout.Button("Next Level")){
			var ori = GameObject.Find("pass").GetComponent(passValue).starlist[level-1];
			if(stars > ori)
				GameObject.Find("pass").GetComponent(passValue).starlist[level-1] = stars;
			level++;
			GameObject.Find("pass").GetComponent(passValue).setValue(level);
			DontDestroyOnLoad(GameObject.Find("pass"));
			DontDestroyOnLoad(GameObject.Find("musicBox"));
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
	ori = time;
	InvokeRepeating("subtime", 0, 1);
	level = GameObject.Find("pass").GetComponent(passValue).getValue();
	
}

function subtime(){
	if(distance > 1)
	time -= 1;
}

function save(){
	GameObject.Find("pass").GetComponent(PlayerPrefsX).SetIntArray("starlist", GameObject.Find("pass").GetComponent(passValue).starlist);
}

function windowContain(windowID: int){
	GUILayout.BeginHorizontal();
	GUILayout.BeginVertical();
	GUILayout.Space(30);
	if(GUILayout.Button("Turn off Music")){
		GameObject.Find("musicBox").GetComponent.<AudioSource>().Pause();
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Turn on Music")){
		GameObject.Find("musicBox").GetComponent.<AudioSource>().Play();
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Save")){
		save();
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Resume")){
		time+=1;
		InvokeRepeating("subtime", 0, 1);
		windowSwitch = false;
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Main Menu")){
		DontDestroyOnLoad(GameObject.Find("pass"));
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

