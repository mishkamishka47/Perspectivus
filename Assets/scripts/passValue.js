#pragma strict
import UnityEngine.UI;

public var input : int;
private var v : int = 1;
function setValue(input){
	v = input;
}
function getValue(){
	return v;
}