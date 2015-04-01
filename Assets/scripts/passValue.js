#pragma strict
import UnityEngine.UI;

public static var starlist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
public static var collect = [0,5,0,5,0,5,0,5,0,5];
public var input : int;
private var v : int = 1;
private var currLevel : int = 1;
private var story : String = "";
private var pre : String = "";

function setValue(input){
	v = input;
}
function getValue(){
	return v;
}
function setLevel(input){
	currLevel = input;
}
function getLevel(){
	return currLevel;
}

function setPre(){
	pre = "";
}

function addCol(){
	var n = ((currLevel-1)/7+1)*2-2;
	collect[n]+=1;
}

function getPre(){
	if(currLevel==1)
		pre = "Booting........\nAnalyzing Environment.......\nNo Abnormalities Detected\nLaunching...\nPuzzle Solver V3.0.3 Launched.";
	return pre;
}

function getData(){
	if(currLevel==1)
		story = "~New data received...Analyzing\n~Who am I?...\n~New data received...Analyzing\n~Who am I?...\n~New data received...Analyzing\n~Who am I?...\n~New data received...Analyzing\n~Who am I?...\n~New data received...Analyzing\n~Who am I?...\n";
	else if(currLevel==3)
		story = "hello, this is second data!";
	else
		story = "";
	return story;
}