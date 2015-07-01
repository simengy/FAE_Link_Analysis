define(['app'], function(app) {

  angular
      .module('vividSENSE.EventService', [])
      .service('EventService', [
          '$rootScope',
          'NotificationService',
          'CommonService',
          'AppService',
          function($rootScope, notification, CommonService, AppService) {

            function eventFunctionCalls(action, loadWidgetFilterParams) {
              $rootScope.$broadcast(action, loadWidgetFilterParams);
            }

            function processRepalcement(eventParent, eventObj, thisObj, filterObj) {
              var filterKey = filterObj.key;
              var filterVal = filterObj.value;
              var returnVal = new Array();
              if (Array.isArray(filterVal)) {
                // do nothing
              } else if (Events.prototype.eventGetValues[filterVal] !== undefined && typeof (Events.prototype.eventGetValues[filterVal]) === "function") {
                filterVal = Events.prototype.eventGetValues[filterVal](eventParent, thisObj);
              } else {
                if (thisObj[filterVal] !== undefined && (typeof (thisObj[filterVal]) === "string" || typeof (thisObj[filterVal]) === "number")) {
                  filterVal = thisObj[filterVal];
                }
              }

              if (filterVal !== null) {
                returnVal = [filterKey, filterVal];
              }
              return returnVal;
            }

            function processEventResponse(eventParams, eventObj, thisObj, widgetParams) {
              var eventParent = eventParams.eventParent || false, pageLocation = eventParams.location || false, action = eventParams.action || false, sourceContainer = eventParams.sourceContainer || false;
              var resp = [];
              for (var i = 0; i < widgetParams.length; i++) {
                var widgetName = widgetParams[i].name || false, filterParams = widgetParams[i].params || false, eventChkCondition = true;

                var loadWidgetFilterParams = {
                  "eventParams": {},
                  "filterParams": {}
                };

                for ( var w in $rootScope.backupEventParams) {
                  loadWidgetFilterParams.filterParams[w] = $rootScope.backupEventParams[w];
                }

                var obj = angular.copy(AppService.getCurrentDashboard());

                var widgetFilterParams = {};
                for ( var i in obj.widgets) {
                  if (eventParams.source === i) {
                    widgetFilterParams = obj.widgets[i];
                    break;
                  }
                }
                var a = CommonService.deepExtend(obj.filters, widgetFilterParams.filters);
                for ( var f in a) {
                  loadWidgetFilterParams.filterParams[f] = a[f];
                }
                var functionCheck = "";

                for (var j = 0; j < filterParams.length; j++) {
                  var filterParam = processRepalcement(eventParent.toLowerCase(), eventObj, thisObj, filterParams[j]);
                  if (filterParam.length === 2) {

                    if (filterParam[0] === "functionCheck") {
                      functionCheck = filterParam[1];
                    }
                    loadWidgetFilterParams.filterParams[filterParam[0]] = filterParam[1];
                  }
                }

                if (functionCheck.trim() !== "") {
                  eventChkCondition = eventConditions[functionCheck].call(thisObj, eventObj);
                }

                if (eventChkCondition === false) {
                  continue;
                }
                loadWidgetFilterParams.eventParams.widgetName = widgetName;
                loadWidgetFilterParams.eventParams.sourceWidget = eventParams.source;
                loadWidgetFilterParams.eventParams.location = pageLocation;
                loadWidgetFilterParams.eventParams.sourceContainer = sourceContainer;
                resp.push(loadWidgetFilterParams);
              }

              if (resp.length > 0) {
                eventFunctionCalls(action, resp);
              }
            }

            function Events(filterOptions) {

            }

            Events.prototype = {
              process: processEventResponse,
              extend: {
                addNewGetValue: function(functionName, fn) {
                  Events.prototype.eventGetValues[functionName] = fn;
                },
                addEventUtilityTypeCheck: function(functionName, fn) {
                  Events.prototype.eventUtilityTypeCheck[functionName] = fn;
                },
                addEventAction: function(functionName, fn) {
                  Events.prototype.eventAction[functionName] = fn;
                }
              },
              eventUtilityTypeCheck: {

                isPoint: function(eventParent, thisObj) {
                  var isPoint = false;

                  if (eventParent.toLowerCase() === "point") {
                    isPoint = true;
                  }
                  return isPoint;
                },
                isSeries: function(eventParent, thisObj) {
                  var isSeries = false;
                  if (eventParent.toLowerCase() === "series") {
                    isSeries = true;
                  }
                  return isSeries;
                },
                isChart: function(eventParent, thisObj) {
                  var isChart = false;
                  if (eventParent.toLowerCase() === "chart") {
                    isChart = true;
                  }
                  return isChart;
                }
              },
              eventGetValues: {

                seriesType: function(eventParent, thisObj) {
                  var currentSeriesType = null;

                  if (Events.prototype.eventUtilityTypeCheck.isPoint(eventParent, thisObj) === true) {
                    currentSeriesType = thisObj.series.type;
                  } else if (Events.prototype.eventUtilityTypeCheck.isSeries(eventParent, thisObj) === true) {
                    currentSeriesType = thisObj.type;
                  }
                  return currentSeriesType;
                },
                seriesName: function(eventParent, thisObj) {
                  var currentSeriesName = null;
                  if (Events.prototype.eventUtilityTypeCheck.isPoint(eventParent, thisObj) === true) {
                    currentSeriesName = thisObj.series.name;
                  } else if (Events.prototype.eventUtilityTypeCheck.isSeries(eventParent, thisObj) === true) {
                    currentSeriesName = thisObj.name;
                  }
                  return currentSeriesName;
                },
                categoryName: function(eventParent, thisObj) {
                  var currentCategoryName = null;
                  if (Events.prototype.eventUtilityTypeCheck.isPoint(eventParent, thisObj) === true && angular.isDefined(thisObj.category)) {
                    currentCategoryName = thisObj.category;
                  }
                  return currentCategoryName;
                },

                pointName: function(eventParent, thisObj) {
                  var pointName = null;
                  if (Events.prototype.eventUtilityTypeCheck.isPoint(eventParent, thisObj) === true && thisObj.name !== undefined) {
                    pointName = thisObj.name;
                  }
                  return pointName;
                },
                Y: function(eventParent, thisObj) {
                  var yVal = null;
                  if (Events.prototype.eventUtilityTypeCheck.isPoint(eventParent, thisObj) === true) {
                    yVal = thisObj.y;
                  }
                  return yVal;
                },
                X: function(eventParent, thisObj) {
                  var xVal = null;
                  if (Events.prototype.eventUtilityTypeCheck.isPoint(eventParent, thisObj) === true) {
                    xVal = thisObj.x;
                  }
                  return xVal;
                }
              },
              action: {
                popupWidget: function(loadWidgetFilterParams) {
                  $rootScope.$broadcast('popupEvent', loadWidgetFilterParams);
                },
                drilldown: function(loadWidgetFilterParams) {
                  $rootScope.$broadcast('drilldown', loadWidgetFilterParams);
                },
                loadWidget: function(loadWidgetFilterParams) {
                  $rootScope.$broadcast('loadWidget', loadWidgetFilterParams);
                },
                changePage: function(loadWidgetFilterParams) {
                  $rootScope.$broadcast('changePage', loadWidgetFilterParams);
                }
              }

            };
            return {
              "Events": Events.prototype
            };

          }]).service('EventAction', ['$rootScope', 'Widget', 'NotificationService', 'AppService', function($rootScope, Widget, notification, AppService) {

        function extendFilterWithCurrentFilter(widgetScope, source) {
          // better way
          /*
           * for ( var e in widgetScope.$parent.$parent.currentFilter) { if
           * (!source.hasOwnProperty(e)) { source[e] =
           * widgetScope.$parent.$parent.currentFilter[e]; } }
           */
        }

        function EventAction() {
        }

        EventAction.prototype = {
          broadCastMethods: [],
          drilldownEvent: function(widgetScope, obj, params) {
            params = angular.copy([params[0]]);// retrict drilldown to one
            params.forEach(function(p) {
              if ($rootScope.backupEventParams) {
                for ( var i in p.filterParams) {
                  $rootScope.backupEventParams[i] = p.filterParams[i];
                }
              } else {
                $rootScope.backupEventParams = p.filterParams;
              }

              if (p.eventParams.location) {
                // if location is provided
                if ((widgetScope.containerName === p.eventParams.location)) {
                  p.filterParams["filter"] = false;

                  Widget.post({
                    widget: p.eventParams.widgetName
                  }, p.filterParams, function(data) {
                    if (data.responseHeader.errorMessages.length > 0) {
                      notification.handelErrors(widgetScope.$parent.$parent, data.responseHeader.errorMessages);
                      widgetScope.showBackButton(false, widgetScope, params);
                    } else {
                      notification.handelErrors(widgetScope.$parent.$parent);
                      var showButton = false;
                      // && p.eventParams.widgetName !==
                      // widgetScope.widgetInfo.name
                      if (p.eventParams.location == widgetScope.containerName && widgetScope.widgetInfo) {
                        showButton = true;
                      }
                      widgetScope.show = true;
                      var prevWidgetInfo = widgetScope.widgetInfo;
                      widgetScope.widget.load(data.responseBody.designs, p.eventParams);
                      widgetScope.showBackButton(showButton, widgetScope, params, prevWidgetInfo);
                    }
                  });
                }
              } else {
                // EXCEPTION
              }
            });
          },
          popupEvent: function(widgetScope, obj, params) {
            // params = params[0];
            params = angular.copy(params);
            params.forEach(function(p) {
              if ($rootScope.backupEventParams) {
                for ( var i in p.filterParams) {
                  $rootScope.backupEventParams[i] = p.filterParams[i];
                }
              } else {
                $rootScope.backupEventParams = p.filterParams;
              }
            });

            if (widgetScope.widgetInfo && params && widgetScope.widgetInfo.name === params[0].eventParams.sourceWidget) {

              var filterParams = {
                widget: [],
                filter: {}
              };

              params.forEach(function(e) {
                filterParams.widget.push(e.eventParams.widgetName);
                for ( var j in e.filterParams) {
                  filterParams.filter[j] = e.filterParams[j];
                }

                // FIXME
                if (params && params.filterParams) {
                  params.filterParams['filter'] = false;
                }else{
                  params.filterParams = {
                      filter: false
                  };
                }
                Widget.post({
                  widget: e.eventParams.widgetName
                }, filterParams.filter, function(data) {
                  if (data.responseHeader.errorMessages.length > 0) {
                    widgetScope.widget.zoom(undefined, urlString, function(selfScope){
                      selfScope.ispopup = true;
                      notification.handelErrors(selfScope, data.responseHeader.errorMessages);
                    });
                    //notification.handelErrors(widgetScope.$parent.$parent, data.responseHeader.errorMessages);
                  } else {
                    notification.handelErrors(widgetScope.$parent.$parent);

                    var url = AppService.getProjectRoot(), urlString = "";
                    if (!params[0].eventParams.location) {
                      urlString = "app/partials/vsBase/popup.html";
                    } else {
                      urlString = url + "/partials/popup/" + params[0].eventParams.location;
                    }
                    widgetScope.widget.zoom(data.responseBody.designs, urlString, undefined, filterParams.filter.segment, filterParams.filter.MONTH_YEAR);
                  }
                });

              });
            }

          },
          changePageEvent: function(widgetScope, obj, params) {

            params = angular.copy(params[0]);
            var pageLocation = params.eventParams.location;
            var filterParams = params.filterParams;
            // extendFilterWithCurrentFilter(filterParams);
            var parsedUrl = parse_url(pageLocation);
            var newPageUrl = "";
            var qMarkAdded = false;

            if (parsedUrl.scheme) {
              newPageUrl += parsedUrl.scheme + "://";
            }
            if (parsedUrl.host) {
              newPageUrl += parsedUrl.host;
            }
            if (parsedUrl.port) {
              newPageUrl += ":" + parsedUrl.port;
            }
            if (parsedUrl.path) {
              newPageUrl += parsedUrl.path;
            }

            if (parsedUrl.fragment !== undefined) {
              newPageUrl += "#" + parsedUrl.fragment;
            }
            if (parsedUrl.query !== undefined) {
              newPageUrl += "?" + parsedUrl.query;
              qMarkAdded = true;
            }
            if (Object.keys(filterParams).length > 0) {
              if (qMarkAdded === true) {
                newPageUrl += http_build_query(filterParams);
              } else {
                newPageUrl += "?" + http_build_query(filterParams);
              }
            }
            if (newPageUrl.trim() !== "") {
              window.location.href = newPageUrl;
            }

          },
          loadWidgetEvent: function(widgetScope, obj, params) {
            params = angular.copy(params);
            // extendFilterWithCurrentFilter(filterParams.filter);
            params.filterParams['filter'] = false;
            Widget.post({
              widget: params.eventParams.widgetName
            }, params.filterParams, function(data) {
              if (data.responseHeader.errorMessages.length > 0) {
                notification.handelErrors(widgetScope.$parent.$parent, data.responseHeader.errorMessages);
              } else {
                notification.handelErrors(widgetScope.$parent.$parent);
                widgetScope.widget.load(data.responseBody.designs, undefined, false);
              }
            });
          },
          addNewAction: function(actionName, fn) {
            var params = {
              "action": actionName,
              "fn": fn
            };
            $rootScope.$broadcast("addedNewEventAction", params);
            EventAction.prototype[actionName] = fn;
          }
        };
        return {
          "action": EventAction.prototype
        };

      }]).service('EventBroadCast', ['$rootScope', 'DashboardService', function($rootScope, DashboardService) {
      }]);
});