opus.Gizmo({
	name: "main",
	dropTarget: true,
	type: "Palm.Mojo.Panel",
	h: "100%",
	styles: {
		zIndex: 2
	},
	chrome: [
		{
			name: "pageHeader1",
			title: "WebOSMark Stats",
			subtitle: "CPU Benchmark Statistics for Cool People v1.0.3",
			multiline: true,
			icon: "images/icon.png",
			type: "Palm.Mojo.PageHeader",
			l: 0,
			t: 0,
			h: 86
		},
		{
			name: "button1",
			ontap: "button1Tap",
			disabled: undefined,
			label: "Totals",
			type: "Palm.Mojo.Button",
			l: 0,
			t: 68
		},
		{
			name: "buttonChartTop",
			ontap: "buttonChartTopTap",
			disabled: undefined,
			label: "Leaderboards",
			type: "Palm.Mojo.Button",
			l: 0,
			t: 69
		},
		{
			name: "button2",
			ontap: "button2Tap",
			disabled: undefined,
			label: "My Scores",
			type: "Palm.Mojo.Button",
			l: 0,
			t: 189
		},
		{
			name: "button3",
			disabled: true,
			label: "Other cool stuff",
			type: "Palm.Mojo.Button",
			l: 0,
			t: 249
		},
		{
			name: "button4",
			ontap: "button4Tap",
			disabled: undefined,
			label: "Roadmap",
			type: "Palm.Mojo.Button",
			l: 0,
			t: 309
		}
	]
});