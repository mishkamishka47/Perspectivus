#pragma strict
import UnityEngine.UI;

public static var starlist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
public var input : int;
private var v : int = 1;
private var currLevel : int = 1;
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
