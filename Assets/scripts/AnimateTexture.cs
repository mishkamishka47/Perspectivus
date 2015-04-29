using UnityEngine;
using System.Collections;

public class AnimateTexture : MonoBehaviour {

	public float speed = 0.1f;
	public AnimationType type;

	private Material shader;
	private int tidalPosition;
	private int tidalSign;
	private int tideCycle;
	private float expansion;
	// Use this for initialization
	void Start () {
		shader = GetComponent<Renderer> ().material;
		tidalPosition = 0;
		tidalSign = 1;
		tideCycle = 1;
		expansion=1.0f;
	}
	
	// Update is called once per frame
	void Update () {
		if(type == AnimationType.Scroll){
			var currentOffset = shader.GetTextureOffset ("_MainTex");
			currentOffset += new Vector2 (Time.deltaTime * speed, Time.deltaTime * speed);
			shader.SetTextureOffset ("_MainTex", currentOffset);
		}else if(type == AnimationType.Tidal){
			var currentOffset = shader.GetTextureOffset ("_MainTex");
			currentOffset += new Vector2 (Time.deltaTime * speed * tidalPosition * tidalSign/90, Time.deltaTime * speed * tidalPosition * tidalSign/90);
			shader.SetTextureOffset ("_MainTex", currentOffset);
			if(tidalPosition<=0){
				tidalSign=-1*tidalSign;
				tideCycle=1;
			}
			if(tidalPosition>=90){
				tideCycle=-1;
			}
			tidalPosition+=tideCycle;
		}else if(type == AnimationType.Expand){
			if(expansion<.98){
				tidalSign=1;
			}
			if(expansion>1){
				tidalSign=-1;
			}
			if(expansion>.985 && expansion <.995){
				expansion = expansion+ (tidalSign*.0003f);
			}else{
				expansion = expansion+ ((tidalSign/2)*.0003f);
			}

			shader.SetTextureScale("_MainTex",new Vector2(expansion,expansion));
			shader.SetTextureOffset ("_MainTex", new Vector2(-expansion,-expansion));
		}
	}

	public enum AnimationType {
		Tidal, Scroll, Expand
	};
}
