#pragma strict
import UnityEngine.UI;

static var windowSwitch : boolean = false;
private var windowExit = Rect(300, 280, 300, 400);
private var info : Text;
private var distance : float = 100;
private var scores: int = 0;
static private var level : int = 1;
var time : float = 50.0;
var steps : int = 0;
public var labelSkin : GUISkin;
public var labelAnotherSkin : GUISkin;
function OnGUI () {
	if(windowSwitch){
		windowExit = GUI.Window(0, windowExit, windowContain, "Settings");
	}
	GUI.skin = labelSkin;
	if(time < 0){
		GUI.skin = labelAnotherSkin;
		GUI.Label(Rect(250, 150, 500, 90), "Failed :(");
		if(GUI.Button(Rect(500,300,250,50),"Retry")){
			Application.LoadLevel("Tutorial"+level);
		}
	}
	else if(distance <= 1 && time >= 0){
		scores = time + (100 - steps);
		GUI.skin = labelAnotherSkin;
		GUI.Label(Rect(250, 150, 500, 90), "Succeed!!!");
		
		if(GUI.Button(Rect(250,400,250,50),"Next Level")){
			level++;
			Application.LoadLevel("Tutorial"+level);
		}
		if(GUI.Button(Rect(500,400,250,50),"Retry")){
			Application.LoadLevel("Tutorial"+level);
		}
		GUI.skin = labelSkin;
		GUI.Label(Rect(375, 250, 500, 90), "Scores: "+scores);
	}
	else{
		GUI.Label(Rect(10, 10, 200, 90), "Time: " + time +"\n" + "Steps: " + steps);
	}
}
function Start(){
	InvokeRepeating("subtime", 0, 1);
}

function subtime(){
	if(distance > 1)
	time -= 1;
}

function windowContain(windowID: int){
	GUI.skin = labelSkin;
	if(GUI.Button(Rect(70,70,150,40), "Turn off Music")){
		
	}
	if(GUI.Button(Rect(70,120,150,40), "Turn on Music")){
		windowSwitch = false;
	}
	if(GUI.Button(Rect(70,170,150,40), "Close")){
		windowSwitch = false;
	}
	if(GUI.Button(Rect(70,220,150,40), "Quit")){
		Application.Quit();
	}
}

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)){
		windowSwitch = !windowSwitch;
	}
	if(Input.GetKeyDown("up")||Input.GetKeyDown("down")||Input.GetKeyDown("left")||Input.GetKeyDown("right")){
		steps++;
	}
	distance = Vector3.Distance(GameObject.Find("Player").transform.position, GameObject.Find("endpoint").transform.position);
}

