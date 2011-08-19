opus.Gizmo({
	name: "totals",
	dropTarget: true,
	type: "Palm.Mojo.Panel",
	h: "100%",
	styles: {
		zIndex: 2
	},
	components: [
		{
			name: "webService1",
			onSuccess: "webService1Success",
			url: "http://webosmark.appspot.com/rest/totals",
			method: "POST",
			parameters: {},
			handleAs: "json",
			type: "Palm.Mojo.WebService"
		}
	],
	chrome: [
		{
			name: "header1",
			label: "Totals",
			type: "Palm.Mojo.Header",
			l: 0,
			t: 0
		},
		{
			name: "scroller1",
			scrollPosition: {
				left: 0,
				top: 0
			},
			type: "Palm.Mojo.Scroller",
			l: 0,
			t: 0,
			h: "100%",
			styles: {
				cursor: "move",
				overflow: "hidden"
			},
			controls: [
				{
					name: "panelLoading",
					layoutKind: "absolute",
					dropTarget: true,
					type: "Palm.Mojo.Panel",
					l: 0,
					t: 0,
					h: "100%",
					controls: [
						{
							name: "largeSpinnerLoading",
							type: "Palm.Mojo.LargeSpinner",
							l: 81,
							t: 248,
							hAlign: "center",
							vAlign: "center"
						}
					]
				},
				{
					name: "panelGraph",
					showing: false,
					dropTarget: true,
					type: "Palm.Mojo.Panel",
					l: 0,
					t: 0,
					h: "100%",
					controls: [
						{
							name: "html1",
							content: "<div id=\"totalsChart\" style=\"width:400px;height:260px\"></div>",
							type: "Palm.Mojo.Html",
							l: 0,
							t: 0,
							h: "100%"
						}
					]
				},
				{
					name: "panelText",
					showing: false,
					dropTarget: true,
					type: "Palm.Mojo.Panel",
					l: 0,
					t: 0,
					h: "100%",
					controls: [
						{
							name: "divider1",
							label: "Device Count",
							type: "Palm.Mojo.Divider",
							l: 0,
							t: 0
						},
						{
							name: "panel4",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 59,
							h: 60,
							styles: {
								borderColor: ""
							},
							controls: [
								{
									name: "label3",
									label: "Pre",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										padding: "15",
										bold: true,
										textAlign: "left",
										oneLine: true,
										fontSize: "18px",
										textColor: "#0066FF"
									}
								},
								{
									name: "labelPre",
									label: "",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										oneLine: true,
										fontSize: "18px",
										textAlign: "center"
									}
								}
							]
						},
						{
							name: "panel3",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 60,
							h: 60,
							controls: [
								{
									name: "label1",
									label: "Pixi",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										padding: "15",
										margin: "0",
										bold: true,
										oneLine: true,
										fontSize: "18px",
										textColor: "#0066FF",
										textAlign: "left"
									}
								},
								{
									name: "labelPixi",
									label: "",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										oneLine: true,
										fontSize: "18px",
										textAlign: "center"
									}
								}
							]
						},
						{
							name: "panel5",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 180,
							h: 60,
							controls: [
								{
									name: "label5",
									label: "Other",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										padding: "15",
										bold: true,
										textColor: "#0066FF",
										fontSize: "18px",
										textAlign: "left",
										oneLine: true
									}
								},
								{
									name: "labelOther",
									label: "",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										fontSize: "18px",
										textAlign: "center",
										oneLine: true
									}
								}
							]
						},
						{
							name: "panel2",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 214,
							h: 60,
							controls: [
								{
									name: "label2",
									kind: "title",
									label: "Total Scores",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										padding: "15",
										bold: true,
										oneLine: true,
										fontSize: "18px",
										borderColor: "",
										textColor: "#0066FF",
										textAlign: "left"
									}
								},
								{
									name: "labelTotalScore",
									label: "",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										oneLine: true,
										textAlign: "center",
										fontSize: "18px"
									}
								}
							]
						},
						{
							name: "panel6",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 274,
							h: 60,
							controls: [
								{
									name: "label7",
									label: "Total Unique Devices",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										margin: "15",
										bold: true,
										fontSize: "18px",
										oneLine: true,
										textColor: "#0066FF",
										textAlign: "left"
									}
								},
								{
									name: "labelUniqueScores",
									label: "",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										oneLine: true,
										textAlign: "center",
										fontSize: "18px"
									}
								}
							]
						}
					]
				}
			]
		}
	]
});