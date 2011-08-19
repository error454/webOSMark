package com.wordpress.mobilecoder.webosmark.stats;

import java.util.List;

import com.google.appengine.api.datastore.Key;

public class Toppers {

	private String device;
	private float score;
	private long key;
	
	public void setDevice(String device) {
		this.device = device;
	}
	public String getDevice() {
		return device;
	}
	public void setScore(float score) {
		this.score = score;
	}
	public float getScore() {
		return score;
	}
	public void setKey(long key) {
		this.key = key;
	}
	public long getKey() {
		return key;
	}	
	
}
