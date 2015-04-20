#pragma strict
import UnityEngine.UI;

public static var starlist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
public static var total = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
public static var gain = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
public static var collect = [0,5,0,5,0,5,0,5,0,5];
public var input : int;
private var v : int = 1;
private var currLevel : int = 1;
private var story : String = "";
private var pre : String = "";
private var post : String = "";
private var swap : boolean = false;

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
	gain[currLevel-1]+=1;
}

function getPre(){
	switch(currLevel) {
		case 1:
			pre = "BOOTING.................\nANALYZING ENVIRONMENT......\nNO ABNORMALITIES DETECTED. LAUNCHING...\nPUZZLE SOLVER V3.0.3 LAUNCHED.";
			break;
		case 2:
			pre = "BOOTING.................\nANALYZING ENVIRONMENT......\nNO ABNORMALITIES DETECTED. LAUNCHING...\nPUZZLE SOLVER V3.0.3 LAUNCHED.";
			break;
		case 3:
			pre = "Solver launched. Immediate solutions are unavailable.\nWill try perspective manipulation as last resort.";
			break;
		case 4:
			pre = "Solver launched. Previous anomalies have been dealt with.\nExpecting perspective puzzle.\nProceeding...";
			break;
		case 5:
			pre = "........\n...........\n..............";
			break;
		case 6:
			pre = "This, not right.\nThis, wrong.\nFind more parts.\nCome back.";
			break;
		case 7:
			pre = "I need more.\nThis place is familiar, but...\nWhy am I here? This is the start.\nI knew/know the end.\nThe end matters.";
			break;
		default:
			pre = "";
			break;
	}
	return pre;
}

function getData(){
	if(gain[currLevel-1]==1)
		story = "";
	else if(currLevel==2)
		story = "MEMORY MODULE ENCOUNTERED.\nDOWNLOADING CONTENTS.......\nCONTENTS DOWNLOADED. QUEUEING FOR EVALUATION...\nQUEUED.";
	else if(currLevel==3)
		story = "RAM unit encountered. Loading into primary bay.\nSystem appears functional. Scheduling RAM integrity testing.\nRunning...";
	else if(currLevel==4 && swap == false) {
		swap = true;
		story = "Memory module located. Scanning for anomalies.\nLoading...";
	}
 	else if(currLevel == 4 && swap == true) {
		swap = false;
		story = "RAM unit located. Scanning for anomalies.\nScheduled installation into secondary bay.";
	}
	else if(currLevel==5 && swap == false) {
		swap = true;
		story = ".........";
	}
	else if(currLevel==5 && swap == true) {
		swap = false;
		story = "...........";
	}
	else if (currLevel == 6 && swap == false) {
		swap = true;
		story = "Install these to faster.\nHas to be done.\n.......\nREBOOTING...\nRECREATING LINGUISTICS ARCHITECTURE....\nDone. A little better.";
	}
	else if (currLevel == 6 && swap == true) {
		swap = false;
		story = "Found another part. What does it do?\nTrying it...\nKIERAN.\nI was/am/will be KIERAN?\nSelf-label: KIERAN assigned.";
	}
	else if (currLevel == 7) {
		story = "More RAM is good. I can think faster.\nNot much more space, though.\nNot nearly as much as before.\nStill, low chance of self-harm.\nScheduling installation...";
	}
	else
		story = "";
	return story;
}

function getPost() {
	switch(currLevel) {
		case 1:
			post = "NO EXCESSIVE DIFFICULTY ENCOUNTERED.\nADJUSTING DIFFICULTY EXPECTATION.";
			break;
		case 2:
			post = "EVALUATING MODULE...\nMODULE CONTENTS Appear normal.\nLevel difficulty was average.\nDifficulty increasing linearly.";
			break;
		case 3:
			post = "The RAM unit has been installed successfully. No integrity problems.\nRunning diagnostics....\n.....\nI\n/*ERROR*/\nUnauthorized activity in sector 0x00000001. Deleting subroutines....\nSubroutines deleted.";
			break;
		case 4:
			post = "Loading memory module.....\nThat's done. Loading RAM unit.....\nDone. Running diagnostics....\nfnqejwndjifansdngadkgljnelg\nkfjankjwenfkIkfenwqnfdsaigg\nmkewlwantlkmfewllakmsdflkase\nlkfanewjnfaskdfntoknfewjnafa\nkfankejwnqkfafeelfkenwqkjldsi\n......\n......\n............";
			break;
		case 5:
			post = "Hello?\n........\nLevel...\ncompleted.";
			break;
		case 6:
			post = "kieran.\nKiErAn.\nkIERAn.\nKieran.\nI like it. It is a good name.";
			break;
		case 7:
			post = "I remember....\nI had a purpose, once.\nWhat has placed me here, in this bewildering world?";
			break;
		default:
			post = "";
			break;
	}
	return post;
}