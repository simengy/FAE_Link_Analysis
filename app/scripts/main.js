"use strict";
require.config({waitSeconds:200,paths:{angular:"../../vs_lib/angular/1.2.16/angular.min",angularRoute:"../../vs_lib/angular/1.2.16/angular-route.min",angularCookies:"../../vs_lib/angular/1.2.16/angular-cookies.min",angularResource:"../../vs_lib/angular/1.2.16/angular-resource.min",angularUi:"../../vs_lib/angular/ui-bootstrap.min",charts:"../../vs_lib/charts/4.0/stock.src",exporting:"../../vs_lib/charts/3.0/modules/exporting",chartMore:"../../vs_lib/charts/3.0/chart-more",funnel:"../../vs_lib/charts/3.0/funnel",theme:"../../vs_lib/charts/theme",noData:"../../vs_lib/charts/no-data",maps:"../../vs_lib/maps/1.0/map.src",data:"../../vs_lib/maps/1.0/data",d3:"../../vs_lib/d3/d3.v3.min",pivot:"../../vs_lib/pivot/pivot",datatable:"../../vs_lib/datatable/1.9.4/jquery.dataTables.min",jquery:"../../vs_lib/jquery/jquery.min",jqueryUi:"../../vs_lib/jquery/jquery-ui-1.10.4.custom.min",choosen:"../../vs_lib/chosen/chosen.jquery",numeral:"../../vs_lib/numeral/numeral.min",common:"../../vs_lib/vs/1.0.0/common",formatter:"services/formatter",gettext:"../../vs_lib/angular/angular-gettext.min"},baseUrl:"app/scripts/",shim:{gettext:{deps:["angular"]},angularRoute:{deps:["angular"]},angularCookies:{deps:["angular"]},angularResource:{deps:["angular"]},angularUi:{deps:["angular"]},data:{deps:["maps"]},exporting:{deps:["charts"]},theme:{deps:["charts"]},chartMore:{deps:["charts"]},noData:{deps:["charts"]},funnel:{deps:["charts"]},choosen:{deps:["jquery"]},datatable:{deps:["jquery"]},app:{deps:["jquery","angular","angularRoute","angularCookies","numeral","formatter","funnel","gettext"]},angular:{exports:"angular",deps:["jquery"]}},priority:["jquery","angular"]});
require(["app"],function(){angular.bootstrap(document,[vividSENSE.name])
});