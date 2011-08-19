package com.wordpress.mobilecoder.webosmark.stats;
import com.google.appengine.api.datastore.Key;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class Score {

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key key;
	
	@Persistent
	private Float score;
	
	//@Persistent
	//private String cpu;
		
	@Persistent
	private Key kernel;
	
	@Persistent
	private Key deviceID;
	
	@Persistent
	private Key model;
	
	@Persistent
	private Key version;
			
	public void setKey(Key key) {
		this.key = key;
	}

	public Key getKey() {
		return key;
	}
	
	public void setScore(Float score){
		this.score = score;
	}
	
	public Float getScore(){
		return this.score;
	}

	/*
	public void setCpu(String cpu) {
		this.cpu = cpu;
	}

	public String getCpu() {
		return cpu;
	}
*/
	public void setKernel(Key kernel) {
		this.kernel = kernel;
	}

	public Key getKernel() {
		return kernel;
	}

	public void setDeviceID(Key deviceID) {
		this.deviceID = deviceID;
	}

	public Key getDeviceID() {
		return deviceID;
	}

	public void setModel(Key model) {
		this.model = model;
	}

	public Key getModel() {
		return model;
	}

	public void setVersion(Key version) {
		this.version = version;
	}

	public Key getVersion() {
		return version;
	}
}







	
