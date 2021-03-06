
function ApplicationsTab(id)
{
    Tab.call(this, id, Constants.URL__APPLICATIONS_VIEW_MODEL);
}

ApplicationsTab.prototype = new Tab();

ApplicationsTab.prototype.constructor = ApplicationsTab;

ApplicationsTab.prototype.initialize = function()
{
    Tab.prototype.initialize.call(this);

    this.applicationServicesTable = Table.createTable("ApplicationsServices", this.getApplicationServicesColumns(), [[0, "asc"]], null, null, null, null);
};

ApplicationsTab.prototype.getInitialSort = function()
{
    return [[1, "asc"]];
};

ApplicationsTab.prototype.getColumns = function()
{
    return [
               {
                   "sTitle":    "&nbsp;",
                   "sWidth":    "2px",
                   "sClass":    "cellCenterAlign",
                   "bSortable": false,
                   "mRender":   function(value, type, item)
                   {
                       return Tab.prototype.formatCheckbox(item[1], value);
                   }
               },
               {
                   "sTitle": "Name",
                   "sWidth": "150px",
                   "mRender": Format.formatApplicationName
               },
               {
                   "sTitle": "GUID",
                   "sWidth": "200px",
                   "mRender": Format.formatString
               },
               {
                   "sTitle":  "State",
                   "sWidth":  "80px",
                   "mRender": Format.formatStatus
               },
               {
                   "sTitle":  "Package State",
                   "sWidth":  "80px",
                   "mRender": Format.formatStatus
               },
               {
                   "sTitle":  "Instance State",
                   "sWidth":  "80px",
                   "mRender": Format.formatStatus
               },
               {
                   "sTitle":  "Created",
                   "sWidth":  "180px",
                   "mRender": Format.formatString
               },
               {
                   "sTitle":  "Updated",
                   "sWidth":  "180px",
                   "mRender": Format.formatString
               },
               {
                   "sTitle":  "Started",
                   "sWidth":  "180px",
                   "mRender": Format.formatString
               },
               {
                   "sTitle": "URI",
                   "sWidth": "200px",
                   "mRender": Format.formatURIs
               },
               {
                   "sTitle": "Buildpack",
                   "sWidth": "100px",
                   "mRender": Format.formatBuildpacks
               },
               {
                   "sTitle":  "Instance",
                   "sWidth":  "70px",
                   "sClass":  "cellRightAlign",
                   "mRender": Format.formatNumber
               },
               {
                   "sTitle":  "Events",
                   "sWidth":  "70px",
                   "sClass":  "cellRightAlign",
                   "mRender": Format.formatNumber
               },
               {
                   "sTitle":  "Services",
                   "sWidth":  "80px",
                   "sClass":  "cellRightAlign",
                   "mRender": Format.formatNumber
               },
               {
                   "sTitle":  "Memory",
                   "sWidth":  "70px",
                   "sClass":  "cellRightAlign",
                   "mRender": Format.formatNumber
               },
               {
                   "sTitle":  "Disk",
                   "sWidth":  "70px",
                   "sClass":  "cellRightAlign",
                   "mRender": Format.formatNumber
               },
               {
                   "sTitle":  "% CPU",
                   "sWidth":  "70px",
                   "sClass":  "cellRightAlign",
                   "mRender": Format.formatNumber
               },
               {
                   "sTitle":  "Memory",
                   "sWidth":  "70px",
                   "sClass":  "cellRightAlign",
                   "mRender": Format.formatNumber
               },
               {
                   "sTitle":  "Disk",
                   "sWidth":  "70px",
                   "sClass":  "cellRightAlign",
                   "mRender": Format.formatNumber
               },
               {
                   "sTitle":  "Target",
                   "sWidth":  "200px",
                   "mRender": Format.formatTarget
               },
               {
                   "sTitle": "DEA",
                   "sWidth": "150px",
                   "mRender": function(value, type)
                   {
                       if (value == null)
                       {
                           return "";
                       }
                      
                       if (Format.doFormatting(type))
                       {
                           var result = "<div>" + value;

                           if (value != null)
                           {
                               result += "<img onclick='ApplicationsTab.prototype.filterApplicationTable(event, \"" + value + "\");' src='images/filter.png' style='height: 16px; width: 16px; margin-left: 5px; vertical-align: middle;'>";
                           }

                           result += "</div>";

                           return result;
                       }
                       else
                       {
                           return value;
                       }
                   }
               }
           ];
};

ApplicationsTab.prototype.getActions = function()
{
    return [
               {
                   text: "Start",
                   click: $.proxy(function()
                   {
                       this.manageApplications("start");
                   }, 
                   this)
               },
               {
                   text: "Stop",
                   click: $.proxy(function()
                   {
                       this.manageApplications("stop");
                   }, 
                   this)
               },
               {
                   text: "Restart",
                   click: $.proxy(function()
                   {
                       this.manageApplications("restart");
                   }, 
                   this)
               },
               {
                   text: "Delete",
                   click: $.proxy(function()
                   {
                       this.deleteChecked("Are you sure you want to delete the selected applications?",
                                          "Delete",
                                          "Deleting Applications",
                                          Constants.URL__APPLICATIONS,
                                          "");
                   }, 
                   this)
               }
           ];
};

ApplicationsTab.prototype.getApplicationServicesColumns = function()
{
    return [
               {
                   "sTitle":  "Instance Name",
                   "sWidth":  "200px",
                   "mRender": function(name, type, row)
                   {
                       var serviceName = Format.formatServiceString(name, type);
                       
                       if (Format.doFormatting(type))
                       {
                           return serviceName + 
                                  "<img onclick='ApplicationsTab.prototype.displayApplicationServiceDetail(event, \"" + 
                                  row[5] + 
                                  "\");' src='images/details.gif' style='margin-left: 5px; vertical-align: middle;' height=14>";
                       }

                       return serviceName;
                   }
               },
               {
                   "sTitle":  "Provider",
                   "sWidth":  "200px",
                   "mRender": Format.formatServiceString
               },
               {
                   "sTitle":  "Service Name",
                   "sWidth":  "200px",
                   "mRender": Format.formatServiceString
               },
               {
                   "sTitle":  "Version",
                   "sWidth":  "200px",
                   "mRender": Format.formatServiceString
               },
               {
                   "sTitle":  "Plan Name",
                   "sWidth":  "200px",
                   "mRender": Format.formatServiceString
               }
           ];
};

ApplicationsTab.prototype.hideDetails = function()
{
    Tab.prototype.hideDetails.call(this);
    
    $("#ApplicationsServicesTableContainer").hide();
};

ApplicationsTab.prototype.clickHandler = function()
{
    this.itemClicked(-1, 2, 11);
};

ApplicationsTab.prototype.showDetails = function(table, objects, row)
{
    var application  = objects.application;
    var instance     = objects.instance;
    var space        = objects.space;
    var organization = objects.organization;

    // Cannot assume both application and instance provided.  Could be both or only application or only instance.

    this.addJSONDetailsLinkRow(table, "Name", Format.formatString(row[1]), objects, true);
    this.addRowIfValue(this.addPropertyRow, table, "GUID", Format.formatString, row[2]);
    this.addRowIfValue(this.addPropertyRow, table, "State", Format.formatString, row[3]);
    this.addRowIfValue(this.addPropertyRow, table, "Package State", Format.formatString, row[4]);
    
    if (instance != null)
    {
        this.addPropertyRow(table, "Instance State", Format.formatString(instance.state));
    }

    this.addRowIfValue(this.addPropertyRow, table, "Created", Format.formatDateString, row[6]);
    this.addRowIfValue(this.addPropertyRow, table, "Updated", Format.formatDateString, row[7]);
    this.addRowIfValue(this.addPropertyRow, table, "Started", Format.formatDateNumber, row[8]);

    var appURIs = row[9];
    if (appURIs != null)
    {
        for (var appURIIndex = 0; appURIIndex < appURIs.length; appURIIndex++)
        {
            this.addURIRow(table, "URI", "http://" + appURIs[appURIIndex]);
        }
    }

    if (row[10] != null)
    {
        var buildpackArray = Utilities.splitByCommas(row[10]);
        for (var buildpackIndex = 0; buildpackIndex < buildpackArray.length; buildpackIndex++)
        {
            var buildpack = buildpackArray[buildpackIndex];
            this.addPropertyRow(table, "Buildpack", Format.formatString(buildpack)); 
        }
    }

    if (application != null && application.command != null)
    {
        this.addPropertyRow(table, "Command", Format.formatString(application.command));
    }

    if (application != null && application.file_descriptors != null)
    {
        this.addPropertyRow(table, "File Descriptors", Format.formatNumber(application.file_descriptors));
    }

    this.addRowIfValue(this.addPropertyRow, table, "Instance Index", Format.formatNumber, row[11]);

    if (application != null && application.droplet_hash != null)
    {
        this.addPropertyRow(table, "Droplet Hash", Format.formatString(application.droplet_hash));
    }
    else if (instance != null && instance.droplet_sha1 != null)
    {
        this.addPropertyRow(table, "Droplet Hash", Format.formatString(instance.droplet_sha1));
    }

    if (row[12] != null)
    {
        this.addFilterRow(table, "Events", Format.formatNumber(row[12]), row[2], AdminUI.showEvents);
    }
    
    this.addRowIfValue(this.addPropertyRow, table, "Services Used", Format.formatNumber, row[13]);
    this.addRowIfValue(this.addPropertyRow, table, "Memory Used", Format.formatNumber, row[14]);
    this.addRowIfValue(this.addPropertyRow, table, "Disk Used",   Format.formatNumber, row[15]);
    this.addRowIfValue(this.addPropertyRow, table, "CPU Used",    Format.formatNumber, row[16]);
    this.addPropertyRow(table, "Memory Reserved",  Format.formatNumber(row[17]));
    this.addPropertyRow(table, "Disk Reserved",    Format.formatNumber(row[18]));

    if (space != null)
    {
        this.addFilterRow(table, "Space", Format.formatStringCleansed(space.name), space.guid, AdminUI.showSpaces);
    }

    if (organization != null)
    {
        this.addFilterRow(table, "Organization", Format.formatStringCleansed(organization.name), organization.guid, AdminUI.showOrganizations);
    }

    if (row[20] != null)
    {
        this.addFilterRow(table, "DEA", Format.formatStringCleansed(row[20]), row[20], AdminUI.showDEAs);
    }

    if (instance != null && instance.services != null && instance.services.length > 0)
    {
        // Have to show the table prior to populating for its sizing to work correctly.
        $("#ApplicationsServicesTableContainer").show();

        var serviceTableData = [];

        for (var serviceIndex = 0; serviceIndex < instance.services.length; serviceIndex++)
        {
            var service = instance.services[serviceIndex];

            var serviceRow = [];

            serviceRow.push(service.name);

            if ((service.provider != null) || (service.vendor != null) || (service.version != null) || (service.plan != null))
            {
                serviceRow.push(service.provider || "");
                serviceRow.push(service.vendor   || "");
                serviceRow.push(service.version  || "");
                serviceRow.push(service.plan     || "");
            }
            else if (service.label != null)
            {
                // This is likely a user-provided service

                // provider
                Utilities.addEmptyElementsToArray(serviceRow, 1);

                serviceRow.push(service.label);

                // version and plan
                Utilities.addEmptyElementsToArray(serviceRow, 2);
            }
            else
            {
                // provider, vendor, version and plan
                Utilities.addEmptyElementsToArray(serviceRow, 4);
            }

            // Need both the row index and the actual object in the table
            serviceRow.push(serviceIndex);
            serviceRow.push(service);

            serviceTableData.push(serviceRow);
        }

        this.applicationServicesTable.fnClearTable();
        this.applicationServicesTable.fnAddData(serviceTableData);
    }
};

ApplicationsTab.prototype.filterApplicationTable = function(event, value)
{
    var tableTools = TableTools.fnGetInstance("ApplicationsTable");

    tableTools.fnSelectNone();

    $("#ApplicationsTable").dataTable().fnFilter(value);

    event.stopPropagation();

    return false;
};

ApplicationsTab.prototype.displayApplicationServiceDetail = function(event, rowIndex)
{
    var row = $("#ApplicationsServicesTable").dataTable().fnGetData(rowIndex);

    var service = row[6];

    Utilities.windowOpen(service);

    event.stopPropagation();

    return false;
};

ApplicationsTab.prototype.manageApplications = function(operation)
{
    var apps = this.getChecked();

    if (!apps || apps.length == 0)
    {
        return;
    }

    var processed = 0;
    
    var errorApps = [];
    
    var alwaysCallback = function(xhr, status, error)
    {
        processed++;
        
        if (processed == apps.length)
        {
            if (errorApps.length > 0)
            {
                AdminUI.showModalDialogErrorTable(errorApps);
            }
            else
            {
                AdminUI.showModalDialogSuccess();
            }
    
            AdminUI.refresh();
        }
    };

    AdminUI.showModalDialogProgress("Managing Applications");

    for (var appIndex = 0; appIndex < apps.length; appIndex++)
    {
        var app = apps[appIndex];

        var url = Constants.URL__APPLICATIONS + "/" + app.key;

        var failCallback = function(xhr, status, error)
        {
            errorApps.push({
                               label: this.applicationName,
                               xhr:   xhr
                           });
        };

        if (operation == "start")
        {
            this.sendAjaxRequest(app.name, "PUT", url, '{"state":"STARTED"}', failCallback, alwaysCallback);
        }
        else if (operation == "stop")
        {
            this.sendAjaxRequest(app.name, "PUT", url, '{"state":"STOPPED"}', failCallback, alwaysCallback);
        }
        else if (operation == "restart")
        {
            this.sendAjaxRequest(app.name, "PUT", url, '{"state":"STOPPED"}', failCallback, alwaysCallback);
            this.sendAjaxRequest(app.name, "PUT", url, '{"state":"STARTED"}', failCallback, alwaysCallback);
        }
        else
        {
            return;
        }
    }
};

ApplicationsTab.prototype.sendAjaxRequest = function(applicationName, type, url, body, failCallback, alwaysCallback)
{
    var deferred = $.ajax({
                              type:            type,
                              url:             url,
                              contentType:     "application/json; charset=utf-8",
                              dataType:        "json",
                              data:            body,
                              // Need application name inside the fail method
                              applicationName: applicationName
                          });
    
    deferred.fail(failCallback);
    deferred.always(alwaysCallback);
};
