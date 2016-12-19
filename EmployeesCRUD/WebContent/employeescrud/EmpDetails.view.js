sap.ui.jsview("employeescrud.EmpDetails", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf employeescrud.EmpDetails
	 */
	getControllerName : function() {
		return "employeescrud.EmpDetails";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf employeescrud.EmpDetails
	 */
	createContent : function(oController) {
		var oPage = new sap.m.Page({

			title : "Employee Details",

		});

		// Button to call Dialog box
		var oBtnSub = new sap.m.Button({
			id : "New",
			text : "Create New Employee",
			press : oController.NewEntry
		});

		// Buttons for Dialog box
		var oBtnUpd = new sap.m.Button({
			id : "Update",
			text : "Update",
			press : oController.Update
		});

		var oBtnDel = new sap.m.Button({
			id : "Delete",
			text : "Delete",
			press : oController.Delete
		});

		var oBtnCan = new sap.m.Button({
			id : "Cancel",
			text : "Cancel",
			press : oController.Cancel
		});

		var oBtnSav = new sap.m.Button({
			id : "Save",
			text : "Save",
			press : oController.Save
		});

		// Dialog box / pop-up window for Add/Modify Employee Data

		var oDialog = new sap.m.Dialog({
			id : "Dialog",
			title : "Add/Modify Employee",
			modal : true,
			contentWidth : "1em",
			content : [ new sap.m.Label({
				text : "Enter Emp Id(must be a number)"
			}), new sap.m.Input({
				maxLength : 20,
				id : "Id"
			}), new sap.m.Label({
				text : "Enter First Name"
			}), new sap.m.Input({
				maxLength : 20,
				id : "FirstName"
			}), new sap.m.Label({
				text : "Enter Last Name"
			}), new sap.m.Input({
				maxLength : 20,
				id : "LastName"
			}), new sap.m.Label({
				text : "Enter E-Mail"
			}), new sap.m.Input({
				maxLength : 30,
				id : "EmailAddress"
			}), new sap.m.Label({
				text : "Enter Salary"
			}), new sap.m.Input({
				maxLength : 20,
				id : "SalaryAmount"
			}), new sap.m.Label({
				text : "Enter Currency"
			}), new sap.m.Input({
				maxLength : 20,
				id : "Currency"
			}), oBtnUpd, oBtnDel, oBtnCan, oBtnSav ]
		});

		var oTable = new sap.m.Table({
			id : "Employees",
			itemPress : [ oController.ItemPress, oController ],
			columns : [ new sap.m.Column({
				width : "1em",
				header : new sap.m.Label({
					text : "EmployeeId"
				})
			}), new sap.m.Column({
				width : "1em",
				header : new sap.m.Label({
					text : "FirstName"
				})
			}), new sap.m.Column({
				width : "1em",
				header : new sap.m.Label({
					text : "LastName"
				})
			}), new sap.m.Column({
				width : "1em",
				header : new sap.m.Label({
					text : "EmailAddress"
				})
			}), new sap.m.Column({
				width : "1em",
				header : new sap.m.Label({
					text : "SalaryAmount"
				})
			}), new sap.m.Column({
				width : "1em",
				header : new sap.m.Label({
					text : "Currency"
				})
			}), ]
		})
		var template = new sap.m.ColumnListItem({
			id : "first_template",
			type : "Navigation",
			visible : true,
			cells : [ new sap.m.Label("ID", {
				text : "{EmployeeId}"
			}), new sap.m.Label({
				text : "{FirstName}"
			}), new sap.m.Label({
				text : "{LastName}"
			}), new sap.m.Label({
				text : "{EmailAddress}"
			}), new sap.m.Label({
				text : "{SalaryAmount}"
			}), new sap.m.Label({
				text : "{Currency}"
			}), ]
		});
		var oFilters = null;
		oTable.bindItems("/results", template, null, oFilters);
		oPage.addContent(oBtnSub);
		oPage.addContent(oTable);

		return oPage;

	}

});