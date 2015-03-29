using UnityEngine;
using System.Collections;

public class AnimateTexture : MonoBehaviour {

	public float speed = 0.1f;

	private Material shader;

	// Use this for initialization
	void Start () {
		shader = GetComponent<Renderer> ().material;
	}
	
	// Update is called once per frame
	void Update () {
		var currentOffset = shader.GetTextureOffset ("_MainTex");
		currentOffset += new Vector2 (Time.deltaTime * speed, Time.deltaTime * speed);
		shader.SetTextureOffset ("_MainTex", currentOffset);
	}
}
