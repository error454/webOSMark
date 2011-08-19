opus.Gizmo({
	name: "chartTops",
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
			url: "http://webosmark.appspot.com/rest/top",
			method: "POST",
			parameters: {},
			handleAs: "json",
			type: "Palm.Mojo.WebService"
		}
	],
	chrome: [
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
					name: "header1",
					label: "Chart Toppers",
					type: "Palm.Mojo.Header",
					l: 0,
					w: 248,
					t: 0,
					h: "100%"
				}
			]
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
							l: 213,
							t: 180,
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
					h: "100%"
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
							name: "panel3",
							layoutKind: "hbox",
							dropTarget: true,
							type: "Palm.Mojo.Panel",
							l: 0,
							t: 0,
							h: 289,
							controls: [
								{
									name: "panel6",
									dropTarget: true,
									type: "Palm.Mojo.Panel",
									l: 0,
									t: 0,
									h: 289,
									controls: [
										{
											name: "group2",
											dropTarget: true,
											label: "Top 5 Pre",
											type: "Palm.Mojo.Group",
											l: 0,
											t: 0,
											h: 292,
											controls: [
												{
													name: "listPre",
													dropTarget: true,
													items: [],
													useSampleData: false,
													title: undefined,
													itemHtml: "<div class=\"palm-row\" style=\"padding-top:10px;\">\n  #{label}\n</div>",
													onlisttap: "listPreListtap",
													swipeToDelete: false,
													reorderable: false,
													type: "Palm.Mojo.List",
													l: 0,
													t: 0,
													h: 100,
													styles: {
														textAlign: "center",
														oneLine: false
													}
												}
											]
										}
									]
								},
								{
									name: "panel4",
									dropTarget: true,
									type: "Palm.Mojo.Panel",
									l: 0,
									t: 0,
									h: 287,
									controls: [
										{
											name: "group3",
											dropTarget: true,
											label: "Top 5 Pixi",
											type: "Palm.Mojo.Group",
											l: 0,
											t: 0,
											h: 292,
											controls: [
												{
													name: "listPixi",
													dropTarget: true,
													items: [],
													useSampleData: false,
													title: undefined,
													itemHtml: "<div class=\"palm-row\" style=\"padding-top:10px;\">   #{label} </div>",
													onlisttap: "listPixiListtap",
													swipeToDelete: false,
													reorderable: false,
													type: "Palm.Mojo.List",
													l: 0,
													t: 0,
													h: 100,
													styles: {
														textAlign: "center"
													}
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		}
	]
});