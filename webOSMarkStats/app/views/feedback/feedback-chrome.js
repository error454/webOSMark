opus.Gizmo({
	name: "feedback",
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
			method: "POST",
			parameters: {},
			handleAs: "json",
			type: "Palm.Mojo.WebService"
		}
	],
	chrome: [
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
					name: "header1",
					label: "Roadmap",
					type: "Palm.Mojo.Header",
					l: 0,
					t: 0
				},
				{
					name: "collapsible1",
					dropTarget: true,
					open: false,
					titleLabel: "Change Log",
					openHeight: 356,
					type: "Palm.Mojo.Collapsible",
					l: 0,
					t: 50,
					h: 40,
					styles: {
						overflow: "hidden"
					},
					controls: [
						{
							name: "panel4",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 0,
							h: "46",
							controls: [
								{
									name: "label6",
									label: "1.0.3",
									type: "Palm.Mojo.Label",
									l: 0,
									w: 53,
									t: 0,
									styles: {
										textColor: "#0066ff"
									}
								},
								{
									name: "label9",
									label: "Fixed issue that prevented viewing top scores.",
									type: "Palm.Mojo.Label",
									l: 320,
									t: 0,
									styles: {
										margin: "3",
										fontSize: "15px"
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
							t: 0,
							h: 46,
							controls: [
								{
									name: "label4",
									label: "1.0.2",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									styles: {
										bold: true,
										textColor: "#0066ff"
									}
								},
								{
									name: "label7",
									label: "Fixed a spinner bug that obscured the Score view.",
									type: "Palm.Mojo.Label",
									l: 52,
									w: 268,
									t: 0,
									styles: {
										margin: "3",
										fontSize: "15px"
									}
								}
							]
						},
						{
							name: "panel1",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 0,
							h: 236,
							controls: [
								{
									name: "label3",
									label: "1.0.1",
									type: "Palm.Mojo.Label",
									l: 0,
									w: 50,
									t: 0,
									styles: {
										bold: true,
										textColor: "#0066ff"
									}
								},
								{
									name: "listv101",
									dropTarget: true,
									items: [
										{
											item: 0,
											label: "Score Details - Accessed by tapping any score, displays known variables for the score.",
											value: "0"
										},
										{
											item: 1,
											label: "Device View - Accessed by tapping a device ID in Score Details, displays all of the runs for a given device. Horizontal orientation displays a graph.",
											value: "1"
										},
										{
											item: 2,
											label: "My Scores - Takes user directly to Device View for their device.",
											value: "2"
										},
										{
											item: 3,
											label: "Roadmap - Informs the user of the current plans for WebOSMark.",
											value: "3"
										}
									],
									useSampleData: false,
									title: undefined,
									swipeToDelete: false,
									reorderable: false,
									type: "Palm.Mojo.List",
									l: 50,
									w: 271,
									t: 0,
									h: 239,
									styles: {
										margin: "3",
										fontSize: "15px",
										oneLine: false
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
							t: 256,
							h: 60,
							controls: [
								{
									name: "label1",
									label: "1.0.0",
									type: "Palm.Mojo.Label",
									l: 0,
									w: 50,
									t: 0,
									h: 34,
									styles: {
										bold: true,
										textColor: "#0066ff",
										oneLine: false
									}
								},
								{
									name: "label2",
									label: "Initial Public Release",
									type: "Palm.Mojo.Label",
									l: 50,
									w: 199,
									t: 0,
									h: 34,
									styles: {
										margin: "3",
										fontSize: "15px",
										oneLine: false
									}
								}
							]
						}
					]
				},
				{
					name: "collapsible3",
					dropTarget: true,
					open: false,
					titleLabel: "Coming Soon",
					openHeight: 233,
					type: "Palm.Mojo.Collapsible",
					l: 0,
					t: 90,
					h: 40,
					styles: {
						overflow: "hidden"
					},
					controls: [
						{
							name: "list2",
							dropTarget: true,
							items: [
								{
									item: 0,
									label: "Capture Govnah settings",
									value: "0"
								},
								{
									item: 1,
									label: "Refine/enhance Leaderboard statistics",
									value: "1"
								},
								{
									item: 2,
									label: "Refine/enhance Totals statistics",
									value: "2"
								},
								{
									item: 3,
									label: "CPU Specific Categories, 1GHz, 800MHz etc.",
									value: "3"
								}
							],
							useSampleData: false,
							title: undefined,
							swipeToDelete: false,
							reorderable: false,
							type: "Palm.Mojo.List",
							l: 0,
							w: 288,
							t: 0,
							h: 201,
							styles: {
								fontSize: "15px"
							}
						}
					]
				},
				{
					name: "collapsible4",
					dropTarget: true,
					titleLabel: "Feedback",
					openHeight: 314,
					type: "Palm.Mojo.Collapsible",
					l: 0,
					t: 130,
					h: 314,
					styles: {
						overflow: "hidden"
					},
					controls: [
						{
							name: "scroller4",
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
									name: "label5",
									label: "This app was made for the WebOS community.  Your feedback is extremely important to me.  Please let me know what you would like to see in future versions of this app.",
									type: "Palm.Mojo.Label",
									l: 0,
									t: 0,
									h: 120,
									styles: {
										padding: "5",
										fontSize: "15px"
									}
								},
								{
									name: "textField2",
									multiline: true,
									hintText: "Feedback from an awesome person",
									type: "Palm.Mojo.TextField",
									l: 0,
									t: 120,
									styles: {
										fontFamily: "",
										fontSize: "15px"
									}
								},
								{
									name: "activityButton1",
									ontap: "activityButton1Tap",
									disabled: undefined,
									label: "Submit Feedback",
									type: "Palm.Mojo.ActivityButton",
									l: 0,
									t: 172
								}
							]
						}
					]
				}
			]
		}
	]
});