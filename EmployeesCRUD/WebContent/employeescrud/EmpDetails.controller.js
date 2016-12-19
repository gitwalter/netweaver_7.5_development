sap.ui
		.controller(
				"employeescrud.EmpDetails",
				{

					GetPopupValues : function() {
						var oEntry = {};
						oEntry.EmployeeId = sap.ui.getCore().byId("Id")
								.getValue();
						oEntry.FirstName = sap.ui.getCore().byId("FirstName")
								.getValue();
						oEntry.LastName = sap.ui.getCore().byId("LastName")
								.getValue();
						oEntry.EmailAddress = sap.ui.getCore().byId(
								"EmailAddress").getValue();
						oEntry.SalaryAmount = sap.ui.getCore().byId(
								"SalaryAmount").getValue();
						oEntry.Currency = sap.ui.getCore().byId("Currency")
								.getValue();
						return oEntry;
					},

					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 * 
					 * @memberOf employeescrud.EmpDetails
					 */

					onInit : function() {
						var sServiceUrl = "http://vhcalnplci.dummy.nodomain:8000/sap/opu/odata/SAP/ZEMPLOYEES_SRV/";
						var oModel = new sap.ui.model.odata.ODataModel(
								sServiceUrl, true, "DEVELOPER", "Appl1ance");
						var oJsonModel = new sap.ui.model.json.JSONModel();
						oModel.read("/EmployeeSet?", null, null, true,
								function(oData, response) {
									oJsonModel.setData(oData);
								});
						sap.ui.getCore().setModel(oJsonModel);
					},

					Cancel : function() {
						sap.ui.getCore().byId("Dialog").close();
					},

					ItemPress : function(evt) {
						sap.ui.getCore().byId("Dialog").open();
						sap.ui.getCore().byId("Update").setVisible();
						sap.ui.getCore().byId("Delete").setVisible();

						var oSelectedItem = evt.getParameter("listItem");
						var sID = oSelectedItem.getBindingContext()
								.getProperty("EmployeeId");
						var sFirstName = oSelectedItem.getBindingContext()
								.getProperty("FirstName");
						var sLastName = oSelectedItem.getBindingContext()
								.getProperty("LastName");
						var sEmailAddress = oSelectedItem.getBindingContext()
								.getProperty("EmailAddress");
						var sSalaryAmount = oSelectedItem.getBindingContext()
								.getProperty("SalaryAmount");
						var sCurrency = oSelectedItem.getBindingContext()
								.getProperty("Currency");

						sap.ui.getCore().byId("Id").setValue(sID);
						sap.ui.getCore().byId("FirstName").setValue(sFirstName);
						sap.ui.getCore().byId("LastName").setValue(sLastName);
						sap.ui.getCore().byId("EmailAddress").setValue(
								sEmailAddress);
						sap.ui.getCore().byId("SalaryAmount").setValue(
								sSalaryAmount);
						sap.ui.getCore().byId("Currency").setValue(sCurrency);

						// disable editing EmployeeId
						sap.ui.getCore().byId("Id").setEnabled(false);

						// disable save Button
						sap.ui.getCore().byId("Save").setVisible(false);
					},

					NewEntry : function() {
						sap.ui.getCore().byId("Dialog").open();
						sap.ui.getCore().byId("Save").setVisible(true);
						sap.ui.getCore().byId("Update").setVisible(false);
						sap.ui.getCore().byId("Delete").setVisible(false);
						sap.ui.getCore().byId("Id").setValue("");
						sap.ui.getCore().byId("FirstName").setValue("");
						sap.ui.getCore().byId("LastName").setValue("");
						sap.ui.getCore().byId("EmailAddress").setValue("");
						sap.ui.getCore().byId("SalaryAmount").setValue("");
						sap.ui.getCore().byId("Currency").setValue("EUR");
						sap.ui.getCore().byId("Currency").setEnabled(false);
						sap.ui.getCore().byId("Id").setEnabled(true);
					},

					Update : function() {
						var oController = sap.ui.getCore()
								.byId("idEmpDetails1").getController();

						OData
								.request(
										{
											requestUri : "http://vhcalnplci.dummy.nodomain:8000/sap/opu/odata/SAP/ZEMPLOYEES_SRV/EmployeeSet",
											method : "GET",
											headers : {
												"X-Requested-With" : "XMLHttpRequest",
												"Content-Type" : "application/atom+xml",
												"DataServiceVersion" : "2.0",
												"X-CSRF-Token" : "Fetch"
											}
										},
										function(data, response) {
											header_xcsrf_token = response.headers['x-csrf-token'];
											var oHeaders = {
												"x-csrf-token" : header_xcsrf_token,
												'Accept' : 'application/json',
											};
											OData
													.request(
															{
																requestUri : "http://vhcalnplci.dummy.nodomain:8000/sap/opu/odata/SAP/ZEMPLOYEES_SRV/EmployeeSet('"
																		+ oController
																				.GetPopupValues().EmployeeId
																		+ "')",
																method : "PUT",
																headers : oHeaders,
																data : oController
																		.GetPopupValues()
															},
															function(data,
																	request) {
																alert("Update Success");
																location
																		.reload(true);
															},
															function(err) {
																alert("Update Failed");
															});
										}, function(err) {
											var request = err.request;
											var response = err.response;
											alert("Error in Get — Request "
													+ request + " Response "
													+ response);
										});
					},

					Save : function() {

						var oController = sap.ui.getCore()
								.byId("idEmpDetails1").getController();

						OData
								.request(
										{
											requestUri : "http://vhcalnplci.dummy.nodomain:8000/sap/opu/odata/SAP/ZEMPLOYEES_SRV/EmployeeSet",
											method : "GET",
											headers : {
												"X-Requested-With" : "XMLHttpRequest",
												"Content-Type" : "application/atom+xml",
												"DataServiceVersion" : "2.0",
												"X-CSRF-Token" : "Fetch"
											}
										},
										function(data, response) {
											header_xcsrf_token = response.headers['x-csrf-token'];
											var oHeaders = {
												"x-csrf-token" : header_xcsrf_token,
												'Accept' : 'application/json',
											};
											OData
													.request(
															{
																requestUri : "http://vhcalnplci.dummy.nodomain:8000/sap/opu/odata/SAP/ZEMPLOYEES_SRV/EmployeeSet",
																method : "POST",
																headers : oHeaders,
																data : oController
																		.GetPopupValues()
															},
															function(data,
																	request) {
																alert("Employee Created Successfully");
																location
																		.reload(true);
															},
															function(err) {
																alert("Employee Creation Failed");
															});
										}, function(err) {
											var request = err.request;
											var response = err.response;
											alert("Error in Get — Request "
													+ request + " Response "
													+ response);
										});
					},

					// Delete Action
					Delete : function() {
						var oController = sap.ui.getCore()
								.byId("idEmpDetails1").getController();

						OData
								.request(
										{
											requestUri : "http://vhcalnplci.dummy.nodomain:8000/sap/opu/odata/SAP/ZEMPLOYEES_SRV/EmployeeSet('"
													+ oController
															.GetPopupValues().EmployeeId
													+ "')",
											method : "GET",
											headers : {
												"X-Requested-With" : "XMLHttpRequest",
												"Content-Type" : "application/atom+xml",
												"DataServiceVersion" : "2.0",
												"X-CSRF-Token" : "Fetch"
											}
										},
										function(data, response) {
											header_xcsrf_token = response.headers['x-csrf-token'];
											var oHeaders = {
												"x-csrf-token" : header_xcsrf_token,
												'Accept' : 'application/json',
											};
											OData
													.request(
															{
																requestUri : "http://vhcalnplci.dummy.nodomain:8000/sap/opu/odata/SAP/ZEMPLOYEES_SRV/EmployeeSet('"
																		+ oController
																				.GetPopupValues().EmployeeId
																		+ "')",
																method : "DELETE",
																headers : oHeaders,
																data : oController
																		.GetPopupValues()
															},
															function(data,
																	request) {
																alert("Delete Success");
																location
																		.reload(true);
															},
															function(err) {
																alert("Delete Failed");
															});
										}, function(err) {
											var request = err.request;
											var response = err.response;
											alert("Error in Get — Request "
													+ request + " Response "
													+ response);
										});

					},

				/**
				 * Similar to onAfterRendering, but this hook is invoked before
				 * the controller's View is re-rendered (NOT before the first
				 * rendering! onInit() is used for that one!).
				 * 
				 * @memberOf employeescrud.EmpDetails
				 */
				// onBeforeRendering: function() {
				//
				// },
				/**
				 * Called when the View has been rendered (so its HTML is part
				 * of the document). Post-rendering manipulations of the HTML
				 * could be done here. This hook is the same one that SAPUI5
				 * controls get after being rendered.
				 * 
				 * @memberOf employeescrud.EmpDetails
				 */
				// onAfterRendering: function() {
				//
				// },
				/**
				 * Called when the Controller is destroyed. Use this one to free
				 * resources and finalize activities.
				 * 
				 * @memberOf employeescrud.EmpDetails
				 */
				// onExit: function() {
				//
				// }
				});