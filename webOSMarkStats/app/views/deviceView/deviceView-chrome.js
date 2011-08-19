opus.Gizmo({
	name: "deviceView",
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
			label: "Device View",
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
							content: "<div id=\"deviceChart\" style=\"width:400px;height:260px\"></div>",
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
							name: "listScores",
							dropTarget: true,
							items: [],
							useSampleData: false,
							title: undefined,
							onlisttap: "listScoresListtap",
							swipeToDelete: false,
							reorderable: false,
							type: "Palm.Mojo.List",
							l: 0,
							t: 0,
							h: 100
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
							l: 109,
							t: 213,
							hAlign: "center",
							vAlign: "center"
						}
					]
				}
			]
		}
	]
});