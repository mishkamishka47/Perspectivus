#pragma strict

var scale: float;
var gui: GUITexture;

function Start () 
{
   if (!gui) gui = GetComponent.<GUITexture>();//gameObject.GetComponent(GUITexture);
}

function Update () 
{
  if (gui.HitTest(Input.mousePosition))
    gui.gameObject.transform.localScale = Vector3(scale,scale,0);
   else
    gui.gameObject.transform.localScale = Vector3(0,0,0);
}