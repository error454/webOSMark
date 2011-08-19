package com.wordpress.mobilecoder.webosmark.stats;

public class ScoreTotals {
	private int pre;
	private int pixi;
	private int other;
	private int unique;

	public void setOther(int other) {
		this.other = other;
	}
	public int getOther() {
		return other;
	}
	public void setPixi(int pixi) {
		this.pixi = pixi;
	}
	public int getPixi() {
		return pixi;
	}
	public void setPre(int pre) {
		this.pre = pre;
	}
	public int getPre() {
		return pre;
	}
	public void setUnique(int unique) {
		this.unique = unique;
	}
	public int getUnique() {
		return unique;
	}
}
