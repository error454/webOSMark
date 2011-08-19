package com.wordpress.mobilecoder.webosmark.stats;

public class FullDetails {
	private String deviceID;
	
	private String kernel;
	
	private String model;
	
	private String version;
	
	private Float score;
	
	private long key;

	public void setDeviceID(String deviceID) {
		this.deviceID = deviceID;
	}

	public String getDeviceID() {
		return deviceID;
	}

	public void setKernel(String kernel) {
		this.kernel = kernel;
	}

	public String getKernel() {
		return kernel;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getModel() {
		return model;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getVersion() {
		return version;
	}

	public void setScore(Float score) {
		this.score = score;
	}

	public Float getScore() {
		return score;
	}

	public void setKey(long key) {
		this.key = key;
	}

	public long getKey() {
		return key;
	}
}
