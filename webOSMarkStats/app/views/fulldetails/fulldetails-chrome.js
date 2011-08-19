opus.Gizmo({
	name: "fulldetails",
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
			parameters: {},
			handleAs: "json",
			type: "Palm.Mojo.WebService"
		}
	],
	chrome: [
		{
			name: "header1",
			label: "Score Details",
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
					name: "panelDetails",
					showing: false,
					dropTarget: true,
					type: "Palm.Mojo.Panel",
					l: 0,
					t: 0,
					h: "100%",
					controls: [
						{
							name: "panel1",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 0,
							h: 60,
							controls: [
								{
									name: "label1",
									label: "Score",
									type: "Palm.Mojo.Label",
									l: 159,
									t: 0,
									styles: {
										padding: "15",
										bold: true,
										textAlign: "left",
										fontSize: "18px",
										textColor: "#0066ff"
									}
								},
								{
									name: "labelScore",
									label: "",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										padding: "15",
										textAlign: "center",
										oneLine: true,
										fontSize: "18px"
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
							t: 120,
							h: 60,
							controls: [
								{
									name: "label5",
									label: "Model",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										padding: "15",
										bold: true,
										textColor: "#0066ff",
										oneLine: true,
										textAlign: "left",
										fontSize: "18px"
									}
								},
								{
									name: "labelModel",
									label: "",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										padding: "15",
										textAlign: "center",
										fontSize: "18px",
										oneLine: true
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
							t: 240,
							h: 60,
							controls: [
								{
									name: "label9",
									label: "Version",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										margin: "15",
										bold: true,
										fontSize: "18px",
										oneLine: true,
										textAlign: "left",
										textColor: "#0066ff"
									}
								},
								{
									name: "labelVersion",
									label: "",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										padding: "15",
										fontSize: "18px",
										oneLine: true,
										textAlign: "center"
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
							t: 239,
							h: 60,
							controls: [
								{
									name: "label3",
									ontap: "label3Tap",
									label: "Device ID",
									type: "Palm.Mojo.Label",
									l: 0,
									w: 103,
									t: 0,
									styles: {
										padding: "15",
										bold: true,
										underline: true,
										textColor: "#d066ff",
										oneLine: true,
										textAlign: "left",
										fontSize: "18px"
									}
								},
								{
									name: "labelDeviceID",
									label: "",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										padding: "15",
										oneLine: true,
										textAlign: "center",
										fontSize: "12px"
									}
								}
							]
						},
						{
							name: "panel4",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 300,
							h: 60,
							controls: [
								{
									name: "label7",
									label: "Kernel",
									type: "Palm.Mojo.Label",
									l: 0,
									w: 73,
									t: 0,
									styles: {
										padding: "15",
										bold: true,
										textColor: "#0066ff",
										oneLine: true,
										textAlign: "left",
										fontSize: "18px"
									}
								},
								{
									name: "labelKernel",
									label: "",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										padding: "17",
										textAlign: "left",
										fontSize: "12px",
										oneLine: false
									}
								}
							]
						}
					]
				},
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
							name: "largeSpinner1",
							type: "Palm.Mojo.LargeSpinner",
							l: 174,
							t: 236,
							hAlign: "center",
							vAlign: "center"
						}
					]
				}
			]
		}
	]
});