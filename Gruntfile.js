module.exports=function(a){a.loadNpmTasks("grunt-angular-templates");
a.loadNpmTasks("grunt-contrib-htmlmin");
a.initConfig({htmlmin:{dist:{options:{collapseBooleanAttributes:true,collapseWhitespace:true,removeAttributeQuotes:true,removeComments:true,removeEmptyAttributes:true,removeRedundantAttributes:true,removeScriptTypeAttributes:true,removeStyleLinkTypeAttributes:true},files:{"app/partials/analysis.html":"app/partials/analysis.html","app/partials/blank.html":"app/partials/blank.html","app/partials/impression.html":"app/partials/impression.html","app/partials/index.html":"app/partials/index.html","app/partials/maps.html":"app/partials/maps.html","app/partials/navbar.html":"app/partials/navbar.html","app/partials/navbar.html":"app/partials/navbar.html","app/partials/reports.html":"app/partials/reports.html","app/partials/what-if.html":"app/partials/what-if.html"}}},ngtemplates1:{app:{src:["custom_project/partials/base/**.html","custom_project/partials/chart/**.html","custom_project/partials/filters/**.html","custom_project/partials/html/**.html","custom_project/partials/infographics/**.html","custom_project/partials/map/**.html","custom_project/partials/popup/**.html","custom_project/partials/table/**.html"],dest:"app.custom_project.templates.js",options:{htmlmin:{collapseBooleanAttributes:true,collapseWhitespace:true,removeAttributeQuotes:true,removeComments:true,removeEmptyAttributes:true,removeRedundantAttributes:true,removeScriptTypeAttributes:true,removeStyleLinkTypeAttributes:true}}}},ngtemplates:{app:{src:["app/partials/vsBase/**.html","app/partials/base/**.html","app/partials/chart/**.html","app/partials/filters/**.html","app/partials/html/**.html","app/partials/infographics/**.html","app/partials/map/**.html","app/partials/popup/**.html","app/partials/table/**.html","custom_project/partials/base/**.html","custom_project/partials/chart/**.html","custom_project/partials/filters/**.html","custom_project/partials/html/**.html","custom_project/partials/infographics/**.html","custom_project/partials/map/**.html","custom_project/partials/popup/**.html","custom_project/partials/table/**.html"],dest:"app.templates.js",options:{htmlmin:{collapseBooleanAttributes:true,collapseWhitespace:true,removeAttributeQuotes:true,removeComments:true,removeEmptyAttributes:true,removeRedundantAttributes:true,removeScriptTypeAttributes:true,removeStyleLinkTypeAttributes:true}}}}})
};