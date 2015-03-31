#pragma strict
import UnityEngine.UI;

public static var starlist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
public var input : int;
private var v : int = 1;
private var currLevel : int = 1;
private var story : String = "";
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

function getData(){
	if(currLevel==1)
		story = "hello, this is first data!hello, this is first data!hello, this is first data!hello, this is first data!hello, this is first data!hello, this is first data!hello, this is first data!hello, this is first data!";
	else if(currLevel==3)
		story = "hello, this is second data!";
	else
		story = "";
	return story;
}