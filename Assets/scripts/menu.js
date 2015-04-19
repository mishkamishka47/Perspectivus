#pragma strict
import UnityEngine.UI;

static var windowSwitch : boolean = false;
static private var level : int = 1;
private var windowExit = Rect(Screen.width*0.2, Screen.height*0.1, Screen.width*0.6, Screen.height*0.8);
private var windowStory = Rect(0, 0, Screen.width, Screen.height);
private var windowPickup = Rect(Screen.width*.1, Screen.height*.8, Screen.width*.9, Screen.height*0.2);
private var windowIcon = Rect(0, Screen.height*.8, Screen.width*.1, Screen.height*0.2);
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
private var curSt : String = ""; 
private var pr : String = "";
private var scrollPosition : Vector2;
private var time : float = 0.0;
private var t : int;
private var g : int;
private var windowOpen : boolean = false;
private var windowTextCounter : int = 0;
private var firstNewLine : int = 0;
private var encounteredNewLine : boolean = false;
private var intermediateNewLine : int = 0;
private var preOpen : boolean = false;
private var gamePaused : boolean = false;

public var starTexture : Texture;
public var robotIcon : Texture;
public var labelSkin : GUISkin;
public var labelAnotherSkin : GUISkin;
public var settingSkin : GUISkin;
public var storySkin : GUISkin;
public var storyPopupSkin : GUISkin;
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
	Debug.Log("On top of the endpoint");
		CancelInvoke();
		scores = 3000- time*5 + (1000 - steps);
		if(scores >= 3000)
			stars = 3;
		else if(time >= 1500)
			stars = 2;
		else 
			stars = 1;
		GUI.skin = settingSkin;
		GUILayout.BeginArea(Rect(Screen.width*0.15, Screen.height*0.2, Screen.width*0.7, Screen.height*0.7));
		GUILayout.BeginVertical();
		GUILayout.Label("Mission Complete");
		csScript.setMenu(true);
		
		//GUI.skin = labelSkin;
		var label1 : GUIStyle = GUI.skin.GetStyle("label1");
		var label2 : GUIStyle = GUI.skin.GetStyle("label2");
		//GUILayout.Label("Scores: "+scores);
		//GUILayout.Space(20);
		GUILayout.EndVertical();
		//GUILayout.BeginHorizontal();
		//GUILayout.FlexibleSpace();
		//var a = 0;
		//while(a<3){
		//	if(a<stars)
		//		GUILayout.Label(starTexture, label1);
		//	else
		//		GUILayout.Label(starTexture, label2);
		//	a++;
		//}
		//GUILayout.FlexibleSpace();
		//GUILayout.EndHorizontal();
		GUILayout.Space(25);
		GUILayout.BeginHorizontal();
		//GUI.skin = labelAnotherSkin;
		if(GUILayout.Button("Next Level")){
			var ori = GameObject.Find("pass").GetComponent(passValue).starlist[level-1];
			if(stars > ori)
				GameObject.Find("pass").GetComponent(passValue).starlist[level-1] = stars;
			level = GameObject.Find("pass").GetComponent(passValue).getLevel();
			//Debug.Log(level);
			if((level-1)/7 != level/7){
				var mn = level/7+1;
				//Debug.Log(mn);
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
		GUI.skin = labelSkin;
	}
	else{
		if(windowSwitch){
			GUI.skin = settingSkin;
			windowExit = GUI.Window(2, windowExit, windowContain, "Settings");
			gamePaused=true;
		}else{
			csScript.setMenu(false);
			gamePaused=false;
		}
		if(story){
			GUI.skin = labelSkin;
			windowIcon = GUI.Window(0,windowIcon,storyIcon,"");
			windowPickup = GUI.Window(1, windowPickup, storyBoard, "");
			windowOpen=true;
		}
		if(pre){
			GUI.skin = labelSkin;
			windowIcon = GUI.Window(0,windowIcon,storyIcon,"");
			windowPickup = GUI.Window(1, windowPickup, storyBoard, "");
			preOpen=true;
	}
			GUI.skin = labelAnotherSkin;
			g = GameObject.Find("pass").GetComponent(passValue).gain[level-1];
			GUI.Label(Rect(10, 10, 350, 100), "Collectibles: " + g + "/" + t + "\nSteps: " + steps);
	}
	
}

function Start(){
	windowSwitch = false;
	level = GameObject.Find("pass").GetComponent(passValue).getLevel();
	st = GameObject.Find("pass").GetComponent(passValue).getData();
	pr = GameObject.Find("pass").GetComponent(passValue).getPre();
	t = GameObject.Find("pass").GetComponent(passValue).total[level-1];
	g = GameObject.Find("pass").GetComponent(passValue).gain[level-1];
	if(g==1)
		Destroy(GameObject.Find("USB"));
	if(pr!="")
		pre = true;
	ori = time;
	InvokeRepeating("subtime", 0, 1);
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
	//scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.Width(Screen.width*0.65), GUILayout.Height(Screen.height*0.2));
	//GUILayout.BeginHorizontal();
	
	//GUILayout.EndHorizontal();
	
	GUILayout.BeginHorizontal();
	
	//GUILayout.Space(Screen.width*.1);
	//GUI.skin.label.alignment=TextAnchor.MiddleLeft;
	GUILayout.Label(curSt);
	
	GUILayout.EndHorizontal();
	//GUILayout.EndScrollView();
	if(GUI.Button(Rect(Screen.width*0.45, Screen.height*0.2, Screen.width*0.15,Screen.height*0.1),"Resume")){
		time-=1;
		GameObject.Find("pass").GetComponent(passValue).addCol();
		InvokeRepeating("subtime", 0, 1);
		csScript.setStory();
		story = false;
	}
}

function storyIcon(windowID: int){
	GUILayout.BeginHorizontal();
	GUILayout.Label(robotIcon);
	GUILayout.EndHorizontal();
}

function windowContain(windowID: int){
	csScript.setMenu(true);
	GUILayout.BeginHorizontal();
	GUILayout.BeginVertical();
	GUILayout.Space(30);
	if(GUILayout.Button("Resume")){
		time-=1;
		InvokeRepeating("subtime", 0, 1);
		windowSwitch = false;
		csScript.setMenu(false);
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Main Menu")){
		save();
		Destroy(GameObject.Find("pass"));
		Destroy(GameObject.Find("musicBox"));
		Application.LoadLevel("menu");
	}
	GUILayout.Space(15);
	if(GUILayout.Button("Toggle Music")){
		if(GameObject.Find("musicBox").GetComponent(music).getMusicOn()){
			GameObject.Find("musicBox").GetComponent(music).turnOff();
		}else{
			GameObject.Find("musicBox").GetComponent(music).turnOn();
		}
	}
	//GUILayout.Space(15);
	//if(GUILayout.Button("Turn on Music")){
	//	GameObject.Find("musicBox").GetComponent(music).turnOn();
	//}
	GUILayout.Space(15);
	if(GUILayout.Button("Save")){
		save();
	}
	GUILayout.Space(15);
	
	
	if(GUILayout.Button("Quit")){
		Application.Quit();
	}
	GUILayout.EndVertical();
	GUILayout.EndHorizontal();
}

function Update () {
	//Debug.Log(gamePaused);
	steps = csScript.getSteps();
	story = csScript.getStory();
	if(windowOpen&&!gamePaused){
		if((windowTextCounter/5)+1 < st.Length){
			if((windowTextCounter+1)/5!=(windowTextCounter/5)){
				if(st[windowTextCounter/5]=='\n'){
					//Debug.Log("slashN Found!");
					if(!encounteredNewLine){
						encounteredNewLine=true;
						intermediateNewLine=(windowTextCounter/5);
						//firstNewLine=windowTextCounter/5;
					}else{
						firstNewLine=intermediateNewLine;
						intermediateNewLine=(windowTextCounter/5);
						//encounteredNewLine=false;
					}
					
				}
			}
			windowTextCounter++;
			if(firstNewLine==0){
				curSt=st.Substring(firstNewLine,(windowTextCounter/5)-firstNewLine);
			}else{
				curSt=st.Substring(firstNewLine+1,(windowTextCounter/5)-firstNewLine);
			}
			//Debug.Log(firstNewLine + " " + intermediateNewLine + " " + (windowTextCounter/5));
		}else{
			time-=1;
			GameObject.Find("pass").GetComponent(passValue).addCol();
			InvokeRepeating("subtime", 0, 1);
			csScript.setStory();
			story = false;
			windowTextCounter=0;
			firstNewLine=0;
			windowOpen=false;
			encounteredNewLine=false;
		}
	}
	
	if(preOpen&&!gamePaused){
		if((windowTextCounter/5)+1 < pr.Length){
			if((windowTextCounter+1)/5!=(windowTextCounter/5)){
				if(pr[windowTextCounter/5]=='\n'){
					//Debug.Log("slashN Found!");
					if(!encounteredNewLine){
						encounteredNewLine=true;
						intermediateNewLine=(windowTextCounter/5);
						//firstNewLine=windowTextCounter/5;
					}else{
						firstNewLine=intermediateNewLine;
						intermediateNewLine=(windowTextCounter/5);
						//encounteredNewLine=false;
					}
					
				}
			}
			windowTextCounter++;
			
			//Debug.Log(firstNewLine + " " + windowTextCounter + " " + ((windowTextCounter/5)-firstNewLine));
			if(firstNewLine==0){
				curSt=pr.Substring(firstNewLine,(windowTextCounter/5)-firstNewLine);
			}else{
				curSt=pr.Substring(firstNewLine+1,(windowTextCounter/5)-firstNewLine);
			}
		}else{
			time-=1;
			GameObject.Find("pass").GetComponent(passValue).addCol();
			InvokeRepeating("subtime", 0, 1);
			csScript.setStory();
			pre = false;
			//Debug.Log("Resetting wTC");
			windowTextCounter=0;
			firstNewLine=0;
			preOpen=false;
			encounteredNewLine=false;
		}
	}
	
	
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

