using UnityEngine;
using System.Collections;



public class TimerManager : MonoBehaviour {
	
	public enum TimerState 
	{
		TS_WAITING,
		TS_RUNNING,
		TS_PAUSED,
		TS_STOPPED
	}
	
	private float startTime;
	private float restSeconds;
	private int roundedRestSeconds;
	private float displaySeconds;
	private float displayMinutes;
	private float displayHour;
	private float timeleft;
	private string timetext;
	
	private bool isTimerStated;
	private TimerState curTimerState;
	
	public TimerState CurTimerState {
		get {
			return this.curTimerState;
		}
		set {
			curTimerState = value;
		}
	}
	
	private Rect timerRect;
	public Rect TimerRect {
		get {
			return this.timerRect;
		}
		set {
			timerRect = value;
		}
	}
	
	private GUIStyle timerStyle;
	public GUIStyle TimerStyle {
		get {
			return this.timerStyle;
		}
		set {
			timerStyle = value;
		}
	}
	
	private int countDownSeconds;
	
	public int CountDownSeconds {
		get {
			return this.countDownSeconds;
		}
		set {
			countDownSeconds = value;
		}
	}
	
	private int timerID;
	private GameObject timerHandler;
	private bool isInited;

	void Start () 
	{}
	
	void Update () 
	{}
	
	void OnGUI ()
	{
		GUI.depth = 0;
		
		if(curTimerState == TimerState.TS_RUNNING)
		{
			timeleft = Time.time - startTime;
			restSeconds = countDownSeconds - (timeleft);
			roundedRestSeconds = Mathf.CeilToInt(restSeconds);
			
			displayHour = (int)roundedRestSeconds / 3600;
			displayMinutes = (int)(roundedRestSeconds - displayHour * 3600) / 60;
			displaySeconds = (int)(roundedRestSeconds - displayHour * 3600 - displayMinutes * 60);

			timetext = "";
			//Add hour
			if (displayHour > 9)
			{
  				timetext = timetext + displayHour.ToString();
			}
			else 
			{
 	   			timetext = timetext + "0" + displayHour.ToString();
			}
			
			timetext += ":";
			
			//Add min
			if (displayMinutes > 9)
			{
  				timetext = timetext + displayMinutes.ToString();
			}
			else 
			{
 	   			timetext = timetext + "0" + displayMinutes.ToString();
			}
			
			timetext += ":";
			
			//Add sec
			if (displaySeconds > 9)
			{
  				timetext = timetext + displaySeconds.ToString();
			}
			else 
			{
 	   			timetext = timetext + "0" + displaySeconds.ToString();
			}
			
			if(timerStyle == null)
			{
				GUI.Label(timerRect, timetext);
			}
			else
			{
				GUI.Label(timerRect, timetext, timerStyle);
			}
			
			if(roundedRestSeconds == 0)
			{
				stopTimer();
				timerHandler.SendMessage("TimeUpMessage", timerID);
			}
    	}
	}
	
	public void initTimer(int timerID, int countDownVal, Rect timerRect, GameObject timerHandler, GUIStyle timerStyle)
	{
		this.timerID = timerID;
		this.countDownSeconds = countDownVal;
		this.timerRect = timerRect;
		this.timerHandler = timerHandler;
		this.timerStyle = timerStyle;
		
		curTimerState = TimerState.TS_WAITING;
		
		isInited = true;
	}
	
	public void startTimer()
	{
		if(!isInited)
		{
			Debug.LogError("Call initTimer first!!!");
			return;
		}
		startTime = Time.deltaTime;
		curTimerState = TimerState.TS_RUNNING;
	}
	
	public void pauseTimer()
	{
		curTimerState = TimerState.TS_PAUSED;
	}
	
	public void resumeTimer()
	{
		curTimerState = TimerState.TS_RUNNING;
	}
	
	public void stopTimer()
	{
		curTimerState = TimerState.TS_WAITING;
	}
}
