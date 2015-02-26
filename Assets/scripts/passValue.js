#pragma strict
import UnityEngine.UI;

public static var starlist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
public var input : int;
private var v : int = 1;
function setValue(input){
	v = input;
}
function getValue(){
	return v;
}
