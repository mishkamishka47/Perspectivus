#pragma strict
public var input;
private var audio1 : AudioSource;
private var audio2 : AudioSource;
private var audio3 : AudioSource;
private var audio4 : AudioSource;
private var audio5 : AudioSource;

function Start(){
	var aSources = GetComponents(AudioSource);
	audio1 = aSources[0];
	audio2 = aSources[1];
	audio3 = aSources[2];
	audio4 = aSources[3];
	audio5 = aSources[4];
	audio1.Play();
	audio2.Play();
	audio3.Stop();	
	audio4.Stop();
	audio5.Stop();
}

public function changeClip(input){
	if(input==1){
		audio1.Play();
		audio2.Play();
		audio3.Stop();
		audio4.Stop();
		audio5.Stop();
	}
	else if(input==2){
		audio1.Stop();
		audio2.Stop();
		audio3.Play();
		audio4.Play();
		audio5.Stop();
	}
	else{
		audio1.Stop();
		audio2.Play();
		audio3.Stop();
		audio4.Stop();
		audio5.Play();
	}
}