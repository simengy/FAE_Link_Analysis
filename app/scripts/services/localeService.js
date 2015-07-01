define(["app"],function(){var a=angular.module("vividSENSE.LocaleService",["gettext"]);
a.service("LocaleService",["$http","$cacheFactory","$cookies","AppService","gettextCatalog",function(h,f,d,g,e){var c=f("localeService");
var b={storageKey:"LOCALE",locale:d.lang,load:function(){if(c.get(b.storageKey)){b.locale=c.get(b.storageKey)
}b.useLocale(b.locale)
},getLocale:function(){return b.locale
},useLocale:function(j){c.put(b.storageKey,j);
var i=h({url:g.getApiBase()+"i18n?lang="+j,cache:c,method:"POST"}).then(function(k){e.currentLanguage=j;
if(k.data&&k.data.responseBody){d.lang=j;
e.setStrings(j,k.data.responseBody.messages)
}});
return i
}};
return b
}])
});