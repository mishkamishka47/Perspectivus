using UnityEngine;
using System.Collections;

public class AnimateTexture : MonoBehaviour {

	public float speed = 0.1f;
	public string type;

	private Material shader;
	private int tidalPosition;
	private int tidalSign;
	private int tideCycle;
	// Use this for initialization
	void Start () {
		shader = GetComponent<Renderer> ().material;
		tidalPosition = 0;
		tidalSign = 1;
		tideCycle = 1;
	}
	
	// Update is called once per frame
	void Update () {
		if(type.Equals("scroll")){
			var currentOffset = shader.GetTextureOffset ("_MainTex");
			currentOffset += new Vector2 (Time.deltaTime * speed, Time.deltaTime * speed);
			shader.SetTextureOffset ("_MainTex", currentOffset);
		}else if(type.Equals("tidal")){
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
		}
	}
}
