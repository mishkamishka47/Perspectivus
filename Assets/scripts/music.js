#pragma strict
public var input;
private var audio1 : AudioSource;
private var audio2 : AudioSource;
private var audio3 : AudioSource;
private var audio4 : AudioSource;
private var audio5 : AudioSource;
private var audio6 : AudioSource;
private var audio7 : AudioSource;
private var level : int = 1;
private var musicPlaying : boolean = true;

function Start(){
	var aSources = GetComponents(AudioSource);
	audio1 = aSources[0];
	audio2 = aSources[1];
	audio3 = aSources[2];
	audio4 = aSources[3];
	audio5 = aSources[4];
	audio6 = aSources[5];
	audio7 = aSources[6];
	audio1.Play();
	audio2.Play();
	audio3.Stop();	
	audio4.Stop();
	audio5.Stop();
	audio6.Stop();
	audio7.Stop();
}

public function turnOff(){
	audio1.Stop();
	audio2.Stop();
	audio3.Stop();
	audio4.Stop();
	audio5.Stop();
	audio6.Stop();
	audio7.Stop();
	musicPlaying=false;
}

public function turnOn(){
	level = GameObject.Find("pass").GetComponent(passValue).getLevel();
	if(level<8){
		changeClip(1);
	}else if(level<15){
		changeClip(2);
	}else if (level<22){
		changeClip(3);
	}else{
		changeClip(3);
	}
	musicPlaying=true;
}

public function getMusicOn(){
	return musicPlaying;
}

public function changeClip(input){
	audio1.Stop();
	audio2.Stop();
	audio3.Stop();
	audio4.Stop();
	audio5.Stop();
	audio6.Stop();
	audio7.Stop();
	if(input==1){
		audio1.Play();
		audio2.Play();
		audio3.Stop();
		audio4.Stop();
		audio5.Stop();
		audio6.Stop();
		audio7.Stop();
	}
	else if(input==2){
		audio1.Stop();
		audio2.Stop();
		audio3.Play();
		audio4.Play();
		audio5.Stop();
		audio6.Stop();
		audio7.Stop();
	}
	else if (input==3){ //World 3?
		audio1.Stop();
		audio2.Stop();
		audio3.Stop();
		audio4.Stop();
		audio5.Play();
		audio6.Stop();
		audio7.Stop();
	}else{
		audio1.Stop();
		audio2.Stop();
		audio3.Stop();
		audio4.Stop();
		audio5.Stop();
		audio6.Play();
		audio7.Play();
	}
}