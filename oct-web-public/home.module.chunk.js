webpackJsonp(["home.module"],{

/***/ "./src/app/core/models/property.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Property; });
var Property = (function () {
    function Property(id, group, label, priority, required, type) {
        if (id === void 0) { id = null; }
        if (group === void 0) { group = null; }
        if (label === void 0) { label = null; }
        if (priority === void 0) { priority = null; }
        if (required === void 0) { required = null; }
        if (type === void 0) { type = null; }
        this.error = false;
        this.id = id;
        this.group = group;
        this.label = label;
        this.priority = priority;
        this.required = required;
        this.type = type;
    }
    Object.defineProperty(Property.prototype, "inputType", {
        get: function () {
            if (this.type === 'COUNTRY') {
                return 'country';
            }
            if (this.type === 'NATIONALITY') {
                return 'select';
            }
            if (this.type === 'DATE') {
                return 'date';
            }
            return 'text';
        },
        enumerable: true,
        configurable: true
    });
    Property.prototype.clearError = function () {
        this.error = false;
        this.errorMessage = null;
    };
    Property.prototype.setError = function (text) {
        this.error = true;
        this.errorMessage = text;
    };
    return Property;
}());



/***/ }),

/***/ "./src/app/core/models/supportForm.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportForm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_model__ = __webpack_require__("./src/app/core/models/property.model.ts");

var SupportForm = (function () {
    function SupportForm(countryCode) {
        this.personalFields = [];
        this.addressFields = [];
        this.documentFields = [];
        this.countryCode = countryCode;
        this.personalFields = [];
        this.addressFields = [];
        this.documentFields = [];
        this.documentTypes = [];
        this.documentType = null;
        this.issuingAuthority = null;
        this.issuingAuthorityField = false;
        this.certify = new __WEBPACK_IMPORTED_MODULE_0__property_model__["a" /* Property */]();
        this.privacy = new __WEBPACK_IMPORTED_MODULE_0__property_model__["a" /* Property */]();
        this.captcha = new __WEBPACK_IMPORTED_MODULE_0__property_model__["a" /* Property */]();
    }
    Object.defineProperty(SupportForm.prototype, "hasResident", {
        get: function () {
            return this.countryCode === 'ie' || this.countryCode === 'uk';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SupportForm.prototype, "labelResident", {
        get: function () {
            if (this.hasResident) {
                return 'form.property.' + this.countryCode + '.resident';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SupportForm.prototype, "hasPermanentResidence", {
        /**
         * Check if the current selected country need to show the label permanent residence
         */
        get: function () {
            if (this.countryCode === 'fi') {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    SupportForm.prototype.addPersonalField = function (property) {
        property.index = this.personalFields.length;
        this.personalFields.push(property);
    };
    SupportForm.prototype.addAddressField = function (property) {
        property.index = this.addressFields.length;
        this.addressFields.push(property);
    };
    SupportForm.prototype.addDocumentField = function (property) {
        if (property.id === 99) {
            this.issuingAuthorityField = true;
            this.issuingAuthority = property;
        }
        else if (this.documentType === null) {
            this.documentType = property;
            this.documentTypes.push(property.label);
        }
        else {
            this.documentTypes.push(property.label);
        }
    };
    SupportForm.prototype.updateProperty = function (property) {
        if (property.group === 1) {
            this.personalFields[property.index] = property;
        }
        else if (property.group === 2) {
            this.addressFields[property.index] = property;
        }
        else if (property.group === 3 && property.id === 99) {
            this.issuingAuthority = property;
        }
        else if (property.group === 3) {
            this.documentType = property;
        }
    };
    SupportForm.prototype.hasPersonalFields = function () {
        return this.personalFields.length > 0;
    };
    SupportForm.prototype.hasAddressFields = function () {
        return this.addressFields.length > 0;
    };
    SupportForm.prototype.hasDocumentsFields = function () {
        return this.documentType !== null;
    };
    SupportForm.prototype.clearErrors = function () {
        var _this = this;
        this.certify.clearError();
        this.privacy.clearError();
        this.captcha.clearError();
        this.personalFields.forEach(function (field, index) {
            _this.personalFields[index].clearError();
        });
        this.addressFields.forEach(function (field, index) {
            _this.addressFields[index].clearError();
        });
        this.documentFields.forEach(function (field, index) {
            _this.documentFields[index].clearError();
        });
        if (this.issuingAuthorityField) {
            this.issuingAuthority.clearError();
        }
    };
    return SupportForm;
}());



/***/ }),

/***/ "./src/app/core/services/captcha.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaptchaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_ocs_service__ = __webpack_require__("./src/app/core/services/api-ocs.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CaptchaService = (function () {
    function CaptchaService(api) {
        this.api = api;
    }
    CaptchaService.prototype.getAudioCaptcha = function () {
        return this.api.getAudioCaptcha();
    };
    CaptchaService.prototype.getImageCaptcha = function () {
        return this.api.getImageCaptcha();
    };
    CaptchaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__api_ocs_service__["a" /* ApiOcsService */]])
    ], CaptchaService);
    return CaptchaService;
}());



/***/ }),

/***/ "./src/app/features/home/components/allcountries/allcountries.component.html":
/***/ (function(module, exports) {

module.exports = "<app-title [hasInitiativeTitle]=\"true\"></app-title>\r\n<div class=\"row\">\r\n    <div class=\"col-md-5 padding-container ocs-container-left\">\r\n        <div class=\"ocs-panel-style\">\r\n            <app-initiative></app-initiative>\r\n        </div>\r\n        <app-signatories></app-signatories>\r\n        <app-carrousel></app-carrousel>\r\n        <app-recent></app-recent>\r\n    </div>\r\n    <div class=\"col-md-7 padding-container ocs-container-right\">\r\n        <div class=\"ocs-table-contries\">\r\n            <a class=\"ocs-arrow-back\" [routerLink]=\"['../']\" routerLinkActive=\"router-link-active\" title=\"{{'map.back-form' | translate }}\"><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> {{'map.back-form' | translate }}</a>\r\n            <div class=\"ocs-title-section mt-2 mb-2\">{{'map.statements-ocs' | translate }}</div>\r\n            <div #map class=\"ocs-map\" *ngIf=\"showMap\">\r\n            </div>\r\n\r\n            <div class=\"ux-u-font-bold mt-3 mb-1\">{{'map.total' | translate }}: <span>9.614</span></div>\r\n            <div>\r\n                <span class=\"ux-u-font-bold\">{{'map.threshold' | translate }}:</span> {{'map.threshold-definition' | translate }}\r\n            </div>\r\n            <div class=\"ocs-legend-map mt-2\" *ngIf=\"showLegend\">\r\n                <p>\r\n                    <span class=\"legend-1\"></span><span> {{'map.legend_reached' | translate }}</span>\r\n                </p>\r\n                <p>\r\n                    <span class=\"legend-2\"></span><span> {{'map.legend_bellow' | translate }}</span>\r\n                </p>\r\n                <p>\r\n                    <span class=\"legend-3\"></span><span> {{'map.legend_any' | translate }}</span>\r\n                </p>\r\n                <p>\r\n                    <span class=\"legend-4\"></span><span> {{'map.legend-no-eu' | translate }}</span>\r\n                </p>\r\n            </div>\r\n\r\n\r\n            <table class=\"table\" *ngIf=\"!isMobile\">\r\n                <caption class=\"ocs-hideAccessible\">{{'map.statements-ocs' | translate }}</caption>\r\n                <tr>\r\n                    <th id=\"countries\" scope=\"col\">{{'map.countries' | translate }}</th>\r\n                    <th id=\"support\" scope=\"col\">{{'map.statements-support' | translate }}</th>\r\n                    <th id=\"threshold\" cope=\"col\">{{'map.threshold' | translate }}</th>\r\n                    <th id=\"percentage\" scope=\"col\">{{'map.percentage' | translate }}</th>\r\n                </tr>\r\n                <tr *ngFor=\"let country of countryList\">\r\n                    <td headers=\"countries\">{{ country.label | translate }} <br /> <span class=\"ux-u-d-block mt-1\">{{ labelStatus(country)| translate }}</span></td>\r\n                    <td headers=\"support\" >{{ country.count | uxNumberFormat }}</td>\r\n                    <td headers=\"threshold\" >{{ country.treshold | uxNumberFormat }}</td>\r\n                    <td headers=\"percentage\" >{{ country.percentage }}%</td>\r\n                </tr>\r\n            </table>\r\n\r\n            <table class=\"table\" *ngIf=\"isMobile\">\r\n                <caption class=\"ocs-hideAccessible\">{{'map.statements-ocs' | translate }}</caption>\r\n                <tr>\r\n                    <th scope=\"col\" colspan=\"2\">{{'map.countries' | translate }}</th>\r\n                </tr>\r\n                <tr *ngFor=\"let country of countryList\">\r\n                    <td>{{ country.label | translate }} </td>\r\n                    <td>\r\n                        <div class=\"ux-u-d-block mt-2\">{{ labelStatus(country)| translate }}</div>\r\n                        <div class=\"ux-u-d-block mt-2\"><span class=\"ux-u-display-inline-block ux-u-width-14 ux-u-font-bold ux-u-text-align-right mr-3\">{{'map.statements-support' | translate }}</span><span class=\"ux-u-display-inline-block ux-u-width-4\"> {{ country.count | uxNumberFormat }}</span></div>\r\n                        <div class=\"ux-u-d-block mt-2\"><span class=\"ux-u-display-inline-block ux-u-width-14 ux-u-font-bold ux-u-text-align-right mr-3\">{{'map.threshold' | translate }}</span><span class=\"ux-u-display-inline-block ux-u-width-4\"> {{ country.treshold | uxNumberFormat }}</span></div>\r\n                        <div class=\"ux-u-d-block mt-2\"><span class=\"ux-u-display-inline-block ux-u-width-14 ux-u-font-bold ux-u-text-align-right mr-3\">{{'map.percentage' | translate }}</span><span class=\"ux-u-display-inline-block ux-u-width-4\"> {{ country.percentage }}%</span> </div>\r\n\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>\r\n<app-support></app-support>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/allcountries/allcountries.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllcountriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_models_countryMap_model__ = __webpack_require__("./src/app/core/models/countryMap.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__eui_core__ = __webpack_require__("./node_modules/@eui/core/dist/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AllcountriesComponent = (function () {
    function AllcountriesComponent(iniciativeService, translate, uxservice) {
        var _this = this;
        this.iniciativeService = iniciativeService;
        this.translate = translate;
        this.uxservice = uxservice;
        this.distributionMap = [];
        this.countryList = [];
        this.total = 0;
        this.loadingMap = true;
        this.isMobile = false;
        this.showMap = true;
        this.showLegend = true;
        this.europeMapCodes = [
            'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'ie',
            'it', 'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se', 'gb'
        ];
        // Mapping "country code in OCS" TO "country code in jVectorMap"
        this.mappingCode = {
            'ge': 'de',
            'uk': 'gb',
            'el': 'gr'
        };
        // Detected breakpoint
        this.uxservice.setActiveBreakpoint(window.innerWidth);
        this.uxservice.activeBreakpoint.subscribe(function (bkp) {
            _this.onBreakpointChange(bkp);
        });
    }
    AllcountriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getDistributionMap();
        this.translate.onLangChange.subscribe(function () {
            _this.orderCountryList();
        });
    };
    AllcountriesComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptionLanguage) {
            this.subscriptionLanguage.unsubscribe();
        }
    };
    AllcountriesComponent.prototype.onBreakpointChange = function (bkp) {
        if (bkp === 'sm' || bkp === 'sx') {
            this.isMobile = true;
            this.showMap = false;
            this.showLegend = false;
        }
    };
    AllcountriesComponent.prototype.labelStatus = function (country) {
        if (country.count === 0) {
            return 'map.status_any';
        }
        if (country.count < country.threshold) {
            return 'map.status_bellow';
        }
        if (country.count > country.threshold) {
            return 'map.status_reached';
        }
        return null;
    };
    AllcountriesComponent.prototype.getDistributionMap = function () {
        var _this = this;
        var mapCode, country, label;
        this.iniciativeService.getDistributionMap().subscribe(function (data) {
            _this.distributionMap = data;
            _this.orderCountryList();
            _this.initializeMap();
        });
    };
    AllcountriesComponent.prototype.orderCountryList = function () {
        var _this = this;
        this.distributionMap.forEach(function (item) {
            item.countryName = _this.translate.instant(item.label);
        });
        this.countryList = this.distributionMap.sort(this.sortBy('countryName'));
    };
    AllcountriesComponent.prototype.sortBy = function (property) {
        return function (a, b) {
            if (a[property] > b[property]) {
                return 1;
            }
            if (a[property] < b[property]) {
                return -1;
            }
            return 0;
        };
    };
    AllcountriesComponent.prototype.initializeMap = function () {
        var _this = this;
        jQuery(this.map.nativeElement).vectorMap({
            map: 'europe_en',
            backgroundColor: 'white',
            zoomOnScroll: false,
            zoomMin: 0,
            zoomMax: 8,
            regionStyle: {
                initial: {
                    fill: '#dddddd'
                },
                hover: {
                    fill: '#fdd0ce' // 253 208 206
                }
            },
            onRegionTipShow: function (event, label, code) {
                _this.tooltipSupporter(event, label, code);
            },
            series: {
                regions: [{
                        scale: {
                            '1': '#1e6a68',
                            '2': '#51a1d1',
                            '3': '#bd3530',
                            '4': '#dddddd',
                        },
                        attribute: 'fill',
                        values: this.getMapValues()
                    }]
            },
            regionsSelectable: false
        });
    };
    AllcountriesComponent.prototype.getMapValues = function () {
        var europe = {};
        // Default count 0 for all Europe countries
        this.europeMapCodes.forEach(function (code) {
            europe[code] = 3;
        });
        this.countryList.forEach(function (item) {
            if (item.count === 0) {
                europe[item.codeMap] = 3;
            }
            else if (item.count < item.treshold) {
                europe[item.codeMap] = 2;
            }
            else {
                europe[item.codeMap] = 1;
            }
        });
        return europe;
    };
    AllcountriesComponent.prototype.isEurope = function (mapCode) {
        if (this.europeMapCodes.indexOf(mapCode) === -1) {
            return false;
        }
        return true;
    };
    AllcountriesComponent.prototype.getCountryMap = function (codeMap) {
        var country = this.countryList.filter(function (item) { return item.codeMap === codeMap; });
        if (country.length > 0) {
            return country[0];
        }
        return null;
    };
    AllcountriesComponent.prototype.tooltipSupporter = function (event, label, code) {
        if (this.isEurope(code)) {
            var country = this.getCountryMap(code);
            if (!country) {
                country = new __WEBPACK_IMPORTED_MODULE_1__core_models_countryMap_model__["a" /* CountryMap */](code);
            }
            var countryName = this.translate.instant(country.label);
            var text1 = this.translate.instant('map.statements-ocs');
            var text2 = this.translate.instant('map.threshold');
            var text3 = this.translate.instant('map.percentage');
            label.html('<div class="ocs-maps-tip">' +
                '<span class="ocs-maps-tip--title">' + countryName + '</span>' +
                '<p><strong>' + text1 + '</strong>: <span>' + country.count.toLocaleString() + '</span></p>' +
                '<p><strong>' + text2 + '</strong>: <span>' + country.treshold.toLocaleString() + '</span></p>' +
                '<p><strong>' + text3 + '</strong>: <span>' + country.percentage + '</span>%</p>' +
                '</div>');
        }
        else {
            event.preventDefault();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], AllcountriesComponent.prototype, "map", void 0);
    AllcountriesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/features/home/components/allcountries/allcountries.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__core_services_initiative_service__["a" /* InitiativeService */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__eui_core__["g" /* UxService */]])
    ], AllcountriesComponent);
    return AllcountriesComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/already.component.html":
/***/ (function(module, exports) {

module.exports = "<app-title icon=\"check\" title=\"signed.title\" subtitle=\"signed.subtitle\" class=\"ocs-icon-subtitle\"></app-title>\r\n<div class=\"row\">\r\n    <div class=\"col-md-5  padding-container\">\r\n        <app-signatories></app-signatories>\r\n        <app-carrousel></app-carrousel>\r\n        <app-recent></app-recent>\r\n    </div>\r\n    <div class=\"col-md-7  padding-container\">\r\n            <app-initiative [hasTitle]=\"true\"></app-initiative>\r\n    </div>\r\n</div>\r\n\r\n<app-support></app-support>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/already.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlreadyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AlreadyComponent = (function () {
    function AlreadyComponent() {
    }
    AlreadyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/features/home/components/already.component.html")
        })
    ], AlreadyComponent);
    return AlreadyComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/carrousel/carrousel.component.html":
/***/ (function(module, exports) {

module.exports = "<section>\r\n    <div class=\"ocs-box-padd\">\r\n        <ux-carousel-items *ngIf=\"distributionMap\" [isShowSummaryIndicators]=\"false\">\r\n            <ux-carousel-item *ngFor=\"let country of distributionMap\">\r\n                <p class=\"ocs-title-carousel\">{{ country.label | translate }}</p>\r\n                <app-progress-circle\r\n                    [isLongLabel]=\"true\"\r\n                    [isLarge]=\"true\"\r\n                    [value]=\"country.percentage\"\r\n                    valueLabel=\"{{ 'map.progress_label'| translate: {\r\n                        percent: country.percentage,\r\n                        code: country.countryCode | uppercase,\r\n                        count: country.count,\r\n                        threshold: country.threshold\r\n                    } }} \">\r\n                </app-progress-circle>\r\n            </ux-carousel-item>\r\n        </ux-carousel-items>\r\n        <div class=\"ocs-carousel-line\">\r\n            <a [routerLink]=\"'/screen/home/allcountries'\">{{ 'header.view.allcountries'| translate }}</a>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/carrousel/carrousel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarrouselComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CarrouselComponent = (function () {
    function CarrouselComponent(iniciativeService) {
        this.iniciativeService = iniciativeService;
    }
    CarrouselComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.iniciativeService.getDistributionMap().subscribe(function (data) {
            _this.distributionMap = data;
        });
    };
    CarrouselComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-carrousel',
            template: __webpack_require__("./src/app/features/home/components/carrousel/carrousel.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_initiative_service__["a" /* InitiativeService */]])
    ], CarrouselComponent);
    return CarrouselComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/disabled.component.html":
/***/ (function(module, exports) {

module.exports = "<app-title icon=\"close\" title=\"disabled.title\" subtitle=\"disabled.subtitle\" class=\"ocs-icon-subtitle\"></app-title>\r\n<div class=\"row\">\r\n    <div class=\"col-md-5 padding-container\">\r\n        <app-signatories></app-signatories>\r\n        <app-carrousel></app-carrousel>\r\n        <app-recent></app-recent>\r\n    </div>\r\n    <div class=\"col-md-7 padding-container\">\r\n        <app-initiative [hasTitle]=\"true\"></app-initiative>\r\n    </div>\r\n</div>\r\n\r\n<app-support></app-support>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/disabled.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisabledComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DisabledComponent = (function () {
    function DisabledComponent() {
    }
    DisabledComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/features/home/components/disabled.component.html")
        })
    ], DisabledComponent);
    return DisabledComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/form/form.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<div class=\"ocs-form-initiative\">\r\n    <div class=\"ocs-form-initiative-title\">{{ 'form.title' | translate }}</div>\r\n    <ux-alert typeClass=\"danger\" *ngIf=\"!isValidated()\">{{'form.generic.error' | translate}}</ux-alert>\r\n    <form>\r\n        <fieldset class=\"ocs-form-country\">\r\n            <legend class=\"hidden\">{{ 'common.select_language' | translate }}</legend>\r\n            <ux-form-group id=\"country\" label=\"{{ 'form.country.from' | translate }}\" [isVertical]=\"true\"  styleClass=\"mb-2 ocs-form-highlight\">\r\n                <select id=\"country\" class=\"form-control custom-select-1\" name=\"country\" (change)=\"onSelectCountry($event.target.value)\">\r\n                    <option value=\"#\">{{ 'common.select-country' | translate }}</option>\r\n                    <option *ngFor=\"let country of systemCountries\" [value]=\"country.id\">{{ country.name }}</option>\r\n                </select>\r\n            </ux-form-group>\r\n\r\n            <ng-container *ngIf=\"hasResident\">\r\n                <ux-form-group id=\"resident\" label=\"{{ supportForm.labelResident | translate }}\" [isVertical]=\"true\"  styleClass=\"mb-2 ocs-form-highlight\">\r\n                    <select id=\"resident\" class=\"form-control custom-select\" name=\"resident\" [(ngModel)]=\"residentValue\" (change)=\"onSelectResident($event.target.value)\">\r\n                        <option *ngFor=\"let option of getResidentOptions()\" [value]=\"option.id\">{{ option.value| translate }}</option>\r\n                    </select>\r\n                </ux-form-group>\r\n                <p class=\"ocs-message-info\" *ngIf=\"alertResident\">{{ warningResident| translate }}</p>\r\n            </ng-container>\r\n        </fieldset>\r\n        <p class=\"ocs-message-info\" *ngIf=\"showFields\" [innerHTML]=\"requirementsCountry\"><p>\r\n\r\n        <fieldset class=\"mb-4 ocs-form-document\" *ngIf=\"showFields && supportForm.hasDocumentsFields()\">\r\n            <legend>{{ 'form.group-document' | translate }}</legend>\r\n            <app-document-property\r\n                [property]=\"supportForm.documentType\"\r\n                [submitted]=\"submitted\"\r\n                (propertyChange)=\"onDocumentChange($event)\">\r\n            </app-document-property>\r\n            <app-property *ngIf=\"supportForm.issuingAuthorityField\"\r\n                [property]=\"supportForm.issuingAuthority\"\r\n                [submitted]=\"submitted\"\r\n                (propertyChange)=\"onPropertyChange($event)\">\r\n            </app-property>\r\n        </fieldset>\r\n\r\n        <fieldset class=\"mb-4 ocs-form-personal\" *ngIf=\"showFields && supportForm.hasPersonalFields()\">\r\n            <legend>{{ 'form.group-personal' | translate }}</legend>\r\n            <ng-container *ngFor=\"let property of supportForm.personalFields\">\r\n                <app-property\r\n                    [property]=\"property\"\r\n                    [submitted]=\"submitted\"\r\n                    (propertyChange)=\"onPropertyChange($event)\">\r\n                </app-property>\r\n            </ng-container>\r\n        </fieldset>\r\n\r\n        <fieldset class=\"mb-4 ocs-form-address\" *ngIf=\"showFields && supportForm.hasAddressFields()\">\r\n            <legend>{{ 'form.group-address' | translate }}</legend>\r\n            <ng-container *ngFor=\"let property of supportForm.addressFields\">\r\n                <app-property\r\n                    [property]=\"property\"\r\n                    [submitted]=\"submitted\"\r\n                    (propertyChange)=\"onPropertyChange($event)\">\r\n                </app-property>\r\n            </ng-container>\r\n        </fieldset>\r\n\r\n        <fieldset class=\"mb-4\" *ngIf=\"showFields\">\r\n            <legend class=\"hidden\">Captcha Information</legend>\r\n            <app-captcha-property\r\n                [property]=\"supportForm.captcha\"\r\n                [submitted]=\"submitted\"\r\n                (propertyChange)=\"onCaptchaChange($event)\">\r\n            </app-captcha-property>\r\n        </fieldset>\r\n\r\n        <fieldset class=\"mb-4 ocs-form-legal\" *ngIf=\"showFields\">\r\n            <legend class=\"hidden\">Privacidad</legend>\r\n            <div class=\"form-group\" [ngClass]=\"{'has-danger': supportForm.certify.error}\">\r\n                <input id=\"certify\" name=\"certify\" type=\"checkbox\" class=\"form-control\"\r\n                    [(ngModel)]=\"supportForm.certify.value\" (change)=\"OnChangeCertify($event)\">\r\n                <label for=\"certify\">{{ 'form.certify-info'| translate }}</label>\r\n                <ux-control-feedback *ngIf=\"supportForm.certify.error\">{{ ('form.error.' + supportForm.certify.errorMessage) | translate }}</ux-control-feedback>\r\n            </div>\r\n\r\n            <div class=\"form-group\" [ngClass]=\"{'has-danger': supportForm.privacy.error}\">\r\n                <input id=\"privacy\" name=\"privacy\" type=\"checkbox\" class=\"form-control\"\r\n                    [(ngModel)]=\"supportForm.privacy.value\"\r\n                    (change)=\"onChangePrivacy($event)\">\r\n                <label for=\"privacy\" [innerHTML]=\"'form.privacy-statement'| translate:{url: urlPrivacy(), urlRegister : getUrlRegister() }\"></label>\r\n                <ux-control-feedback *ngIf=\"supportForm.privacy.error\">{{ ('form.error.' + supportForm.privacy.errorMessage) | translate }}</ux-control-feedback>\r\n            </div>\r\n\r\n            <div *ngIf=\"showOptionalValidation()\" class=\"form-group has-danger-code\" aria-live=\"polite\">\r\n                <input id=\"optionalValidation\" name=\"optionalValidation\" type=\"checkbox\" class=\"form-control\"\r\n                    [(ngModel)]=\"optionalValidationSelected\">\r\n                <label class=\"form-control-label\" for=\"optionalValidation\">{{ 'form.optional-validacion-desc' | translate }}</label>\r\n                <ux-control-feedback>{{ 'form.optional-validacion-text' | translate }}</ux-control-feedback>\r\n            </div>\r\n        </fieldset>\r\n        <div class=\"mb-5\">\r\n            <ux-button [isLarge]=\"true\" [isDisabled]=\"!showFields\" styleClass=\"ocs-button-blue\" (click)=\"onSubmit($event)\">{{ 'form.support' | translate }}</ux-button>\r\n        </div>\r\n    </form>\r\n    <div class=\"ocs-form-support-legend mt-2\">\r\n        {{ 'form.support-footer1' | translate }}<br />\r\n        {{ 'form.support-footer2' | translate }} <a [routerLink]=\"['http://ec.europa.eu/citizens-initiative']\" target=\"_blank\">http://ec.europa.eu/citizens-initiative</a>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/form/form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_language_service__ = __webpack_require__("./src/app/core/services/language.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__support_form_service__ = __webpack_require__("./src/app/features/home/components/form/support-form.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_services_application_service__ = __webpack_require__("./src/app/core/services/application.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FormComponent = (function () {
    function FormComponent(applicationService, initiativeService, translateService, languageService, supportFormService, router) {
        this.applicationService = applicationService;
        this.initiativeService = initiativeService;
        this.translateService = translateService;
        this.languageService = languageService;
        this.supportFormService = supportFormService;
        this.router = router;
        this.systemCountries = [];
        this.countries = []; // residence country selector
        this.selectedCountry = '#';
        this.residentValue = '#';
        this.alertResident = false;
        this.optionalValidation = false;
        this.optionalValidationSelected = false;
        // To check
        this.showFields = false;
        this.submitted = false;
        this.valid = false;
        this.issuingAuthorityField = false;
        this.nationalities = [];
    }
    Object.defineProperty(FormComponent.prototype, "hasResident", {
        get: function () {
            return this.supportForm && this.supportForm.hasResident;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "warningResident", {
        get: function () {
            return 'form.in-' + this.supportForm.countryCode + '-allowed';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "hasDocuments", {
        get: function () {
            return this.supportForm && this.supportForm.documentType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "requirementsCountry", {
        get: function () {
            var countryCode = this.supportForm.countryCode;
            var text = this.translateService.instant('common.requirements.' + countryCode);
            var url = 'http://eur-lex.europa.eu/legal-content/' + this.languageService.selectedLanguage
                + '/TXT/PDF/?uri=OJ:JOL_2015_178_R_0001';
            var link = this.translateService.instant('common.requirements.link', { url: url });
            return text.replace('{0}', link);
        },
        enumerable: true,
        configurable: true
    });
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initiativeService.getSystemCountries().subscribe(function (data) {
            _this.systemCountries = data;
        });
        this.initiativeService.getCustomisations().subscribe(function (data) {
            _this.optionalValidation = data.optionalValidation;
        });
    };
    FormComponent.prototype.onSelectCountry = function (countryCode) {
        if (countryCode === null || countryCode === '#') {
            this.supportForm = null;
            this.showFields = null;
        }
        else {
            this.loadCountryProperties(countryCode);
        }
        // this.clearErrors();
    };
    FormComponent.prototype.onSelectResident = function (value) {
        this.residentValue = value;
        if (this.residentValue === '#') {
            this.alertResident = false;
            this.showFields = false;
        }
        else if (value === '0') {
            this.alertResident = true;
            this.showFields = false;
        }
        else {
            this.alertResident = false;
            this.showFields = true;
        }
    };
    FormComponent.prototype.onDocumentChange = function (property) {
        this.supportForm.documentType = property;
    };
    FormComponent.prototype.onPropertyChange = function (property) {
        this.supportForm.updateProperty(property);
    };
    FormComponent.prototype.onCaptchaChange = function (property) {
        this.supportForm.captcha = property;
    };
    FormComponent.prototype.onChangePrivacy = function (event) {
        this.supportForm.privacy.value = event.target.checked;
    };
    FormComponent.prototype.OnChangeCertify = function (event) {
        this.supportForm.certify.value = event.target.checked;
    };
    FormComponent.prototype.loadCountryProperties = function (countryCode) {
        var _this = this;
        this.initiativeService.getCountryProperties(countryCode)
            .subscribe(function (data) { return _this.setCountryForm(countryCode, data); });
    };
    FormComponent.prototype.getResidentOptions = function () {
        var options = [
            { id: '#', value: 'common.select' },
            { id: '1', value: 'common.yes' },
            { id: '0', value: 'common.no' }
        ];
        return options;
    };
    FormComponent.prototype.setCountryForm = function (countryCode, properties) {
        this.supportForm = this.supportFormService.loadProperties(countryCode, properties);
        if (this.supportForm.hasResident) {
            this.showFields = false;
        }
        else {
            this.showFields = true;
        }
    };
    FormComponent.prototype.urlPrivacy = function () {
        return '#/privacy?lang=' + this.languageService.selectedLanguage;
    };
    FormComponent.prototype.getUrlRegister = function () {
        return this.urlRegister;
    };
    FormComponent.prototype.getCountryOptions = function () {
        var first = [{ id: '#', text: this.translateService.instant('common.select-country') }];
        var options = this.countries;
        return first.concat(options);
    };
    FormComponent.prototype.getCountriesOptionsForCountry = function (country) {
        if (country === void 0) { country = null; }
        var options = this.getCountryOptions();
        if (options.length) {
            if (country === 'uk' || country === 'ie') {
                options = options.filter(function (item) { return item.id === country || item.id === '#'; });
            }
            else if (country && country !== '#') {
                options.push({ id: 'other', text: this.translateService.instant('common.other-country') });
            }
        }
        return options;
    };
    FormComponent.prototype.getNationalityOptions = function () {
        var first = [{ id: '#', text: this.translateService.instant('common.select-nationality') }];
        var options = this.nationalities;
        return first.concat(options);
    };
    FormComponent.prototype.showPersonalFields = function () {
        return this.showFields && this.supportForm.hasPersonalFields();
    };
    FormComponent.prototype.showAddressFields = function () {
        return this.showFields && this.supportForm.hasAddressFields();
    };
    FormComponent.prototype.showDocumentFields = function () {
        return this.showFields && this.supportForm.hasDocumentsFields();
    };
    FormComponent.prototype.showCertifyInfo = function () {
        return this.showPersonalFields() || this.showAddressFields();
    };
    // check if the current selected country need to show the label permanent residence
    // Show checkbox for ignore some errors and continue
    // If user has ckecked the input, continue showing the checkbox and checked
    FormComponent.prototype.showOptionalValidation = function () {
        return this.showFields && this.hasErrorsIgnore() && this.optionalValidation;
    };
    FormComponent.prototype.showCaptcha = function () {
        return this.showFields;
    };
    FormComponent.prototype.isValidated = function () {
        return this.submitted ? this.valid : true;
    };
    FormComponent.prototype.onSubmit = function (event) {
        var fields;
        var field;
        var error = false;
        this.submitted = true;
        if (this.validate() === false) {
            this.valid = false;
            this.supportFormService.refreshCaptcha();
            this.scrollToErrors();
            return false;
        }
        this.valid = true;
        this.insertSignature();
    };
    FormComponent.prototype.insertSignature = function () {
        var _this = this;
        var fields = this.getPropertiesForApi();
        var language = this.initiativeService.initiative.description.languageCode;
        this.initiativeService.insertSignature('en', this.supportForm.countryCode, fields, this.supportForm.captcha, this.optionalValidationSelected)
            .subscribe(function (res) {
            // status = 200
            _this.initiativeService.initiative.signatureIdentifier = res.signatureIdentifier;
            _this.applicationService.signatureIdentifier = res.signatureIdentifier;
            _this.router.navigateByUrl('/screen/submitted');
        }, function (errorRes) {
            // status != 200
            try {
                _this.supportFormService.processErrorResponse(errorRes.error);
            }
            catch (e) {
                // err json parse
            }
            _this.supportFormService.refreshCaptcha();
            _this.valid = false;
            _this.scrollToErrors();
        });
    };
    FormComponent.prototype.hasErrorsIgnore = function () {
        return this.supportFormService.hasErrorsIgnore;
    };
    FormComponent.prototype.clearErrors = function () {
        this.valid = true;
        this.submitted = false;
        this.supportForm.clearErrors();
    };
    FormComponent.prototype.validate = function () {
        return this.supportFormService.validate();
    };
    FormComponent.prototype.scrollToErrors = function () {
        var el = document.querySelector('form h2');
        try {
            el.scrollIntoView(true);
        }
        catch (e) {
            window.scrollTo(0, 0);
        }
    };
    FormComponent.prototype.setErrorFromLabel = function (fieldkey, errorMessage) {
        this.supportFormService.setErrorFromLabel(fieldkey, errorMessage);
    };
    FormComponent.prototype.getPropertiesForApi = function () {
        return this.supportFormService.getPropertiesForApi();
    };
    FormComponent.prototype.prioritySorting = function (a, b) {
        if (a.priority > b.priority) {
            return -1;
        }
        if (a.priority < b.priority) {
            return 1;
        }
        return 0;
    };
    FormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-form',
            template: __webpack_require__("./src/app/features/home/components/form/form.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__core_services_application_service__["a" /* ApplicationService */],
            __WEBPACK_IMPORTED_MODULE_3__core_services_initiative_service__["a" /* InitiativeService */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_4__core_services_language_service__["a" /* LanguageService */],
            __WEBPACK_IMPORTED_MODULE_5__support_form_service__["a" /* SupportFormService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]])
    ], FormComponent);
    return FormComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/form/property/base-property.component.ts.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasePropertyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_models_property_model__ = __webpack_require__("./src/app/core/models/property.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BasePropertyComponent = (function () {
    function BasePropertyComponent() {
        this.propertyChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(BasePropertyComponent.prototype, "label", {
        get: function () {
            return 'form.property.' + this.property.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePropertyComponent.prototype, "isError", {
        get: function () {
            return this.submitted && this.property.error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePropertyComponent.prototype, "feedbackClass", {
        get: function () {
            return this.isError ? 'danger' : null;
        },
        enumerable: true,
        configurable: true
    });
    BasePropertyComponent.prototype.onChange = function () {
        this.propertyChange.emit(this.property);
    };
    BasePropertyComponent.prototype.validate = function () {
        if (this.submitted && this.property.required && this.property.value.trim() === '') {
            this.property.setError('oct.empty.property');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__core_models_property_model__["a" /* Property */])
    ], BasePropertyComponent.prototype, "property", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], BasePropertyComponent.prototype, "submitted", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], BasePropertyComponent.prototype, "propertyChange", void 0);
    return BasePropertyComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/form/property/captcha-property.component.html":
/***/ (function(module, exports) {

module.exports = "<ux-form-group id=\"captcha\" [label]=\"label | translate\" [isVertical]=\"true\" [feedbackTypeClass]=\"feedbackClass\" [isValid]=\"!isError\">\r\n    <div class=\"captcha-box\">\r\n        <figure class=\"captcha-img\" *ngIf=\"isImage\"><img [attr.src]=\"imageData\" title=\"captcha\"/></figure>\r\n        <div class=\"captcha-sound\" *ngIf=\"isAudio\">\r\n            <p class=\"captcha-sound-text\">\r\n                <i class=\"fa fa-volume-up\" aria-hidden=\"true\"></i>\r\n                <a  #audiofocus href=\"javascript:void(0)\" title=\"{{'form.captcha-audio-download' | translate}}\" [attr.href]=\"audioData\" download=\"audio\">{{'form.captcha-audio-download' | translate}}</a>\r\n            </p>\r\n        </div>\r\n\r\n        <ux-button *ngIf=\"isAudio\" [isFlat]=\"true\"  iconClass=\"fa fa-picture-o\" (click)=\"selectImage()\" ></ux-button>\r\n        <ux-button #imagefocus *ngIf=\"isImage\" [isFlat]=\"true\" iconClass=\"fa fa-volume-up\" (click)=\"selectAudio()\"></ux-button>\r\n        <ux-button [isFlat]=\"true\" iconClass=\"fa fa-refresh\" (click)=\"refresh()\"></ux-button>\r\n    </div>\r\n    <ux-form-control id=\"captcha\" [isInputText]=\"true\" [(ngModel)]=\"property.value\" (modelChange)=\"onChange()\"></ux-form-control>\r\n    <ux-control-feedback typeClass=\"danger\" *ngIf=\"isError\">{{ ('form.error.' + property.errorMessage) | translate }}</ux-control-feedback>\r\n</ux-form-group>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/form/property/captcha-property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaptchaPropertyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_property_component_ts__ = __webpack_require__("./src/app/features/home/components/form/property/base-property.component.ts.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_captcha_service__ = __webpack_require__("./src/app/core/services/captcha.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CaptchaPropertyComponent = (function (_super) {
    __extends(CaptchaPropertyComponent, _super);
    function CaptchaPropertyComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        _this.setFocusCaptcha = false;
        return _this;
    }
    Object.defineProperty(CaptchaPropertyComponent.prototype, "isImage", {
        get: function () {
            return this.property.type === 'image';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CaptchaPropertyComponent.prototype, "isAudio", {
        get: function () {
            return this.property.type === 'audio';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CaptchaPropertyComponent.prototype, "label", {
        get: function () {
            if (this.isImage) {
                return 'form.captcha-audio-download';
            }
            return 'form.captcha-image-title';
        },
        enumerable: true,
        configurable: true
    });
    CaptchaPropertyComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('property')) {
            this.refresh();
        }
    };
    CaptchaPropertyComponent.prototype.ngAfterViewChecked = function () {
        if (this.isImage && this.imageFocus && this.imageFocus.nativeElement && this.setFocusCaptcha) {
            this.imageFocus.nativeElement.focus();
            this.setFocusCaptcha = false;
        }
        if (this.isAudio && this.audioFocus && this.audioFocus.nativeElement && this.setFocusCaptcha) {
            this.audioFocus.nativeElement.focus();
            this.setFocusCaptcha = false;
        }
    };
    CaptchaPropertyComponent.prototype.selectImage = function () {
        var _this = this;
        this.property.type = 'image';
        this.property.value = '';
        this.service.getImageCaptcha().subscribe(function (res) {
            _this.property.id = res.id;
            _this.imageData = 'data:image/png;base64,' + res.data;
            _this.audioData = null;
            _this.setFocusCaptcha = true;
        });
        if (this.isImage && this.imageFocus && this.imageFocus.nativeElement && this.setFocusCaptcha) {
            this.imageFocus.nativeElement.focus();
            this.setFocusCaptcha = false;
        }
    };
    CaptchaPropertyComponent.prototype.selectAudio = function () {
        var _this = this;
        this.property.type = 'audio';
        this.property.value = '';
        this.service.getAudioCaptcha().subscribe(function (res) {
            _this.property.id = res.id;
            _this.audioData = 'data:audio/mp3;base64,' + res.data;
            _this.imageData = null;
            _this.setFocusCaptcha = true;
        });
    };
    CaptchaPropertyComponent.prototype.refresh = function () {
        if (this.property.type === 'audio') {
            this.selectAudio();
        }
        else {
            this.selectImage();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('audiofocus'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], CaptchaPropertyComponent.prototype, "audioFocus", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('imagefocus'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], CaptchaPropertyComponent.prototype, "imageFocus", void 0);
    CaptchaPropertyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-captcha-property',
            template: __webpack_require__("./src/app/features/home/components/form/property/captcha-property.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_services_captcha_service__["a" /* CaptchaService */]])
    ], CaptchaPropertyComponent);
    return CaptchaPropertyComponent;
}(__WEBPACK_IMPORTED_MODULE_1__base_property_component_ts__["a" /* BasePropertyComponent */]));



/***/ }),

/***/ "./src/app/features/home/components/form/property/document-property.component.html":
/***/ (function(module, exports) {

module.exports = "<ux-form-group id=\"documentType\" label=\"Document type\" [isVertical]=\"true\" [feedbackTypeClass]=\"feedbackClass\" [isValid]=\"!isError\">\r\n    <ux-form-control\r\n        [isSelect]=\"true\"\r\n        [(ngModel)]=\"documentType\"\r\n        (modelChange)=\"onSelectDocumentType($event)\">\r\n        <option *ngFor=\"let option of property.options\" [value]=\"option.id\">{{ option.value }}</option>\r\n    </ux-form-control>\r\n</ux-form-group>\r\n<ux-form-group id=\"document\" label=\"Document\" [isVertical]=\"true\" [feedbackTypeClass]=\"feedbackClass\" [isValid]=\"!isError\">\r\n    <ux-form-control id=\"document\" [isInputText]=\"true\" [(ngModel)]=\"property.value\" (modelChange)=\"onChange()\"></ux-form-control>\r\n    <ux-control-feedback *ngIf=\"property.error\">{{ ('form.error.' + property.errorMessage) | translate }}</ux-control-feedback>\r\n</ux-form-group>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/form/property/document-property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentPropertyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_models_property_model__ = __webpack_require__("./src/app/core/models/property.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DocumentPropertyComponent = (function () {
    function DocumentPropertyComponent() {
        this.submitted = false;
        this.propertyChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.documentType = null;
    }
    Object.defineProperty(DocumentPropertyComponent.prototype, "isError", {
        get: function () {
            return this.submitted && this.property.error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentPropertyComponent.prototype, "feedbackClass", {
        get: function () {
            return this.isError ? 'danger' : null;
        },
        enumerable: true,
        configurable: true
    });
    DocumentPropertyComponent.prototype.ngOnInit = function () {
        if (this.property.options) {
            this.documentType = this.property.options[0].id;
        }
    };
    DocumentPropertyComponent.prototype.onSelectDocumentType = function (id) {
        this.property.label = id;
        this.property.value = '';
        this.onChange();
    };
    DocumentPropertyComponent.prototype.onChange = function () {
        this.validate();
        this.propertyChange.emit(this.property);
    };
    DocumentPropertyComponent.prototype.validate = function () {
        if (this.submitted === true && this.property.value.trim() === '') {
            this.property.setError('oct.empty.property');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__core_models_property_model__["a" /* Property */])
    ], DocumentPropertyComponent.prototype, "property", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], DocumentPropertyComponent.prototype, "submitted", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], DocumentPropertyComponent.prototype, "propertyChange", void 0);
    DocumentPropertyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-document-property',
            template: __webpack_require__("./src/app/features/home/components/form/property/document-property.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], DocumentPropertyComponent);
    return DocumentPropertyComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/form/property/property.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<ux-form-group [label]=\"label| translate\" [isVertical]=\"true\" [feedbackTypeClass]=\"feedbackClass\" [isValid]=\"!isError\">\r\n    <ng-container *ngIf=\"isInputText\">\r\n        <ux-form-control [id]=\"property.label\"\r\n            [isInputText]=\"true\"\r\n            [(ngModel)]=\"property.value\"\r\n            (modelChange)=\"onChange($event)\">\r\n        </ux-form-control>\r\n    </ng-container>\r\n    <ng-container *ngIf=\"isSelect || isCountry\">\r\n        <ux-form-control [id]=\"property.label\"\r\n            [isSelect]=\"true\"\r\n            [(ngModel)]=\"property.value\"\r\n            (modelChange)=\"onChange($event)\">\r\n            <option *ngFor=\"let option of property.options\" [value]=\"option.id\">{{ option.value }}</option>\r\n        </ux-form-control>\r\n    </ng-container>\r\n    <ng-container *ngIf=\"isDate\">\r\n        <ux-form-control [id]=\"property.label\"\r\n            [isDatepicker]=\"true\"\r\n            [(ngModel)]=\"property.value\"\r\n            (modelChange)=\"onChange($event)\">\r\n        </ux-form-control>\r\n    </ng-container>\r\n    <ux-control-feedback *ngIf=\"property.error\">{{ ('form.error.' + property.errorMessage) | translate }}</ux-control-feedback>\r\n</ux-form-group>\r\n\r\n<ux-form-group *ngIf=\"showOther\"\r\n    label=\"{{ 'form.other-country'| translate }}\"\r\n    [isVertical]=\"true\"\r\n    [feedbackTypeClass]=\"feedbackClassOther\"\r\n    [isValid]=\"!isErrorOther\">\r\n    <ux-form-control [id]=\"other.label\"\r\n        [isInputText]=\"true\"\r\n        [(ngModel)]=\"other.value\"\r\n        (modelChange)=\"onChangeOther($event)\">\r\n    </ux-form-control>\r\n    <ux-control-feedback *ngIf=\"other.error\">{{ ('form.error.' + other.errorMessage) | translate }}</ux-control-feedback>\r\n</ux-form-group>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/form/property/property.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_models_property_model__ = __webpack_require__("./src/app/core/models/property.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_property_component_ts__ = __webpack_require__("./src/app/features/home/components/form/property/base-property.component.ts.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PropertyComponent = (function (_super) {
    __extends(PropertyComponent, _super);
    function PropertyComponent() {
        var _this = _super.call(this) || this;
        _this.propertyChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.hasOther = false;
        _this.showOther = false;
        _this.other = new __WEBPACK_IMPORTED_MODULE_1__core_models_property_model__["a" /* Property */]();
        return _this;
    }
    Object.defineProperty(PropertyComponent.prototype, "isCountry", {
        get: function () {
            return this.property.inputType === 'country';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyComponent.prototype, "isSelect", {
        get: function () {
            return this.property.inputType === 'select';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyComponent.prototype, "isInputText", {
        get: function () {
            return this.property.inputType === 'text';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyComponent.prototype, "isDate", {
        get: function () {
            return this.property.inputType === 'date';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyComponent.prototype, "isErrorOther", {
        get: function () {
            return this.showOther && this.submitted && this.other.error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyComponent.prototype, "feedbackClassOther", {
        get: function () {
            return this.showOther && this.isErrorOther ? 'danger' : null;
        },
        enumerable: true,
        configurable: true
    });
    PropertyComponent.prototype.ngOnInit = function () {
        if (this.isCountry) {
            this.hasOther = true;
            this.showOther = false;
            this.checkErrorInOther();
        }
    };
    PropertyComponent.prototype.ngOnChanges = function () {
        if (this.hasOther && this.submitted) {
            this.checkErrorInOther();
        }
    };
    PropertyComponent.prototype.onChange = function () {
        if (this.hasOther && this.property.value === 'other') {
            this.showOther = true;
            this.checkErrorInOther();
        }
        else {
            this.showOther = false;
            this.other.value = null;
            this.property.other = null;
        }
        this.propertyChange.emit(this.property);
    };
    PropertyComponent.prototype.onChangeOther = function (value) {
        this.property.other = this.other.value;
        this.propertyChange.emit(this.property);
    };
    PropertyComponent.prototype.checkErrorInOther = function () {
        if (!this.submitted || !this.hasOther) {
            this.other.error = false;
            return false;
        }
        if (this.property.value === 'other' && this.getOtherValue().length === 0) {
            this.other.setError('oct.empty.property');
        }
    };
    PropertyComponent.prototype.getOtherValue = function () {
        if (this.other.value) {
            return this.other.value.trim();
        }
        return '';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__core_models_property_model__["a" /* Property */])
    ], PropertyComponent.prototype, "property", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], PropertyComponent.prototype, "submitted", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PropertyComponent.prototype, "propertyChange", void 0);
    PropertyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-property',
            template: __webpack_require__("./src/app/features/home/components/form/property/property.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], PropertyComponent);
    return PropertyComponent;
}(__WEBPACK_IMPORTED_MODULE_2__base_property_component_ts__["a" /* BasePropertyComponent */]));



/***/ }),

/***/ "./src/app/features/home/components/form/support-form.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportFormService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__eui_ux_core__ = __webpack_require__("./node_modules/@eui/ux-core/dist/ux-core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_models_property_model__ = __webpack_require__("./src/app/core/models/property.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_models_supportForm_model__ = __webpack_require__("./src/app/core/models/supportForm.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_services_application_service__ = __webpack_require__("./src/app/core/services/application.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var SupportFormService = (function () {
    function SupportFormService(config, applicationService, initiativeService, translateService, router) {
        var _this = this;
        this.config = config;
        this.applicationService = applicationService;
        this.initiativeService = initiativeService;
        this.translateService = translateService;
        this.router = router;
        this.systemCountries = [];
        this.nationalities = [];
        this.valid = false;
        this.optionalValidation = false;
        this.optionalValidationSelected = false;
        this.hasErrorsIgnore = false;
        this.issuingAuthorityField = false;
        this.countries = [];
        this.validProperties = [
            'address', 'citizens.card', 'city', 'country', 'date.of.birth',
            'date.of.birth.at', 'driving.license', 'fathers.name', 'firstname',
            'id.card', 'issuing.authority', 'lastname', 'name.at.birth',
            'national.id.number', 'nationality', 'passport', 'permanent.residence',
            'personal.id', 'personal.no.in.id.card', 'personal.no.in.passport',
            'personal.number', 'place.of.birth', 'postal.code', 'registration.certificate',
            'residence.permit', 'social.security.id', 'state', 'uk.resident', 'ie.resident'
        ];
        this.initiativeService.getSystemCountries().subscribe(function (data) {
            _this.systemCountries = data;
            _this.nationalities = _this.initiativeService.getNationalities();
        });
    }
    SupportFormService.prototype.loadProperties = function (countryCode, data) {
        var _this = this;
        this.selectedCountry = countryCode;
        this.supportForm = new __WEBPACK_IMPORTED_MODULE_3__core_models_supportForm_model__["a" /* SupportForm */](countryCode);
        data.forEach(function (property) {
            if (_this.isValidProperty(property)) {
                _this.addPropertyField(property);
            }
        });
        if (this.supportForm.documentType) {
            this.supportForm.documentType.options = this.getDocumentOptions();
        }
        return this.supportForm;
    };
    SupportFormService.prototype.clearErrors = function () {
        this.supportForm.clearErrors();
    };
    SupportFormService.prototype.validate = function () {
        var _this = this;
        var valid = true;
        this.clearErrors();
        if (!this.supportForm.certify.value) {
            this.supportForm.certify.setError('oct.empty.property');
            valid = false;
        }
        if (!this.supportForm.privacy.value) {
            this.supportForm.privacy.setError('oct.empty.property');
            valid = false;
        }
        if (!this.supportForm.captcha.value) {
            this.supportForm.captcha.setError('oct.empty.property');
            valid = false;
        }
        if (this.supportForm.hasDocumentsFields() && !this.supportForm.documentType.value) {
            this.supportForm.documentType.setError('oct.empty.property');
            valid = false;
        }
        this.supportForm.personalFields.forEach(function (field, index) {
            var value = _this.getValue(field);
            if (field.required) {
                if (value.trim() === '') {
                    _this.supportForm.personalFields[index].setError('oct.empty.property');
                    valid = false;
                }
                else if (value === '#' && field.options) {
                    _this.supportForm.personalFields[index].setError('oct.empty.property');
                    valid = false;
                }
            }
        });
        this.supportForm.addressFields.forEach(function (field, index) {
            var value = _this.getValue(field);
            if (field.required) {
                if (value.trim() === '') {
                    _this.supportForm.addressFields[index].setError('oct.empty.property');
                    valid = false;
                }
                else if (value === '#' && (field.type === 'COUNTRY' || field.type === 'NATIONALITY')) {
                    _this.supportForm.addressFields[index].setError('oct.empty.property');
                    valid = false;
                }
            }
        });
        return valid;
    };
    SupportFormService.prototype.setErrorFromLabel = function (fieldkey, errorMessage) {
        var field;
        if (fieldkey === 'postal.code') {
            this.hasErrorsIgnore = true;
        }
        field = this.supportForm.personalFields.filter(function (item) { return item.label === fieldkey; });
        if (field.length) {
            if (fieldkey === 'nationality') {
                errorMessage = errorMessage.concat('.').concat(fieldkey);
            }
            this.supportForm.personalFields[field[0].index].setError(errorMessage);
        }
        field = this.supportForm.addressFields.filter(function (item) { return item.label === fieldkey; });
        if (field.length) {
            this.supportForm.addressFields[field[0].index].setError(errorMessage);
        }
        field = this.supportForm.documentFields.filter(function (item) { return item.label === fieldkey; });
        if (field.length) {
            this.documentType.setError(errorMessage);
            this.hasErrorsIgnore = true;
        }
    };
    SupportFormService.prototype.getPropertiesForApi = function () {
        var _this = this;
        var data;
        var fields;
        fields = this.supportForm.personalFields.concat(this.supportForm.addressFields);
        if (this.supportForm.documentType) {
            fields.push(this.supportForm.documentType);
        }
        if (this.supportForm.issuingAuthorityField) {
            fields.push(this.supportForm.issuingAuthority);
        }
        data = fields.map(function (item) {
            return {
                group: item.group,
                id: item.id,
                label: item.label,
                markedAsDeleted: item.markedAsDeleted,
                priority: item.priority,
                required: item.required,
                type: item.type,
                value: _this.getValue(item)
            };
        });
        return data;
    };
    SupportFormService.prototype.refreshCaptcha = function () {
        var captcha = new __WEBPACK_IMPORTED_MODULE_2__core_models_property_model__["a" /* Property */]();
        captcha.type = this.supportForm.captcha.type;
        captcha.value = this.supportForm.captcha.value;
        captcha.error = this.supportForm.captcha.error;
        captcha.errorMessage = this.supportForm.captcha.errorMessage;
        this.supportForm.captcha = captcha;
    };
    SupportFormService.prototype.processErrorResponse = function (res) {
        // Recheck if they are error for ignore and continue
        // But don't reset the current value for optionalValidation
        var _this = this;
        this.hasErrorsIgnore = false;
        if (res.code === 409) {
            this.applicationService.alreadySupported = true;
            this.router.navigateByUrl('/screen/home/already');
        }
        else {
            try {
                if (res.errorFields.length > 0) {
                    res.errorFields.forEach(function (errField) {
                        _this.setErrorFromLabel(errField.fieldKey, errField.errorMessage);
                    });
                }
                if (res.captchaValidation === false) {
                    this.supportForm.captcha.error = true;
                    this.supportForm.captcha.errorMessage = 'oct.captcha.invalid';
                }
            }
            catch (e) { }
        }
    };
    SupportFormService.prototype.getValue = function (property) {
        if (property.inputType === 'date') {
            return __WEBPACK_IMPORTED_MODULE_6_moment__(property.value).format('DD/MM/YYYY');
        }
        return property.value;
    };
    SupportFormService.prototype.isValidProperty = function (property) {
        return this.validProperties.indexOf(property.label) !== -1;
    };
    SupportFormService.prototype.addPropertyField = function (item) {
        var property = new __WEBPACK_IMPORTED_MODULE_2__core_models_property_model__["a" /* Property */](item.id, item.group, item.label, item.priority, item.required, item.type);
        property.value = '';
        property.error = false;
        if (property.type === 'NATIONALITY') {
            property.value = '#';
            property.options = this.getNationalityOptions();
        }
        if (property.type === 'COUNTRY') {
            property.value = '#';
            property.options = this.getCountriesOptionsForCountry();
        }
        if (property.group === 1) {
            this.supportForm.addPersonalField(property);
        }
        else if (property.group === 2) {
            this.supportForm.addAddressField(property);
        }
        else if (property.group === 3) {
            this.supportForm.addDocumentField(property);
        }
    };
    SupportFormService.prototype.getCountriesOptionsForCountry = function () {
        var options = this.getCountryOptions();
        var country = this.supportForm.countryCode;
        if (options.length) {
            if (country === 'uk' || country === 'ie') {
                options = options.filter(function (item) { return item.id === country || item.id === '#'; });
            }
            else if (country && country !== '#') {
                options.push({
                    id: 'other',
                    value: this.translateService.instant('common.other-country')
                });
            }
        }
        return options;
    };
    SupportFormService.prototype.getCountryOptions = function () {
        var first = [{
                id: '#',
                value: this.translateService.instant('common.select-country')
            }];
        var options = this.systemCountries.map(function (country) { return ({ id: country.id, value: country.name }); });
        return first.concat(options);
    };
    SupportFormService.prototype.getNationalityOptions = function () {
        var first = [{
                id: '#',
                value: this.translateService.instant('common.select-nationality')
            }];
        return first.concat(this.nationalities);
    };
    SupportFormService.prototype.getDocumentOptions = function () {
        var _this = this;
        var options = this.supportForm.documentTypes.map(function (label, index) {
            var key = _this.supportForm.countryCode + '.' + label;
            return { id: label, value: _this.config.global.documents[key] };
        });
        return options;
    };
    SupportFormService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__eui_ux_core__["a" /* CONFIG_TOKEN */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_8__core_services_application_service__["a" /* ApplicationService */],
            __WEBPACK_IMPORTED_MODULE_4__core_services_initiative_service__["a" /* InitiativeService */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__angular_router__["d" /* Router */]])
    ], SupportFormService);
    return SupportFormService;
}());



/***/ }),

/***/ "./src/app/features/home/components/home.component.html":
/***/ (function(module, exports) {

module.exports = "<app-title [hasInitiativeTitle]=\"true\"></app-title>\r\n<div class=\"row\" id=\"skipLinkPath\">\r\n    <div class=\"col-md-5 padding-container ocs-container-left\">\r\n        <div class=\"ocs-panel-style\">\r\n            <app-initiative [hasTitle]=\"false\"></app-initiative>\r\n        </div>\r\n        <app-signatories></app-signatories>\r\n        <app-carrousel></app-carrousel>\r\n        <app-recent></app-recent>\r\n    </div>\r\n    <div class=\"col-md-7 padding-container ocs-container-right\">\r\n        <app-form></app-form>\r\n    </div>\r\n</div>\r\n<app-support></app-support>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/features/home/components/home.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/initiative/initiative.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ocs-initiative\" #main tabindex=\"-1\">\r\n    <img src=\"https://webgate.acceptance.ec.europa.eu/ECI-OCT-3/public/api/customfiles/download/logo?v=1539595751433\" alt=\"\">\r\n    <div class=\"ocs-title-section\" *ngIf=\"hasTitle\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>\r\n    <ux-form-group label=\"{{ 'header.inititative.language' | translate }}\"\r\n        [isVertical]=\"true\"\r\n        styleClass=\"mt-2 ocs-select-languages\">\r\n        <ux-form-control [isSelect]=\"true\" [(ngModel)]=\"selectedLanguage\" (modelChange)=\"onChangeLanguage($event)\">\r\n            <option *ngFor=\"let language of languages\" [value]=\"language.id\" [selected]=\"language.id === selectedLanguage\">\r\n                {{ language.text }}\r\n            </option>\r\n        </ux-form-control>\r\n    </ux-form-group>\r\n    <div class=\"ocs-block-content\">\r\n        <div class=\"ocs-label-content\">\r\n            {{ 'initiative.subject.matters' | translate }}\r\n        </div>\r\n        <div class=\"ocs-summary-content\">\r\n            {{ description?.subject }}\r\n        </div>\r\n    </div>\r\n    <div class=\"ocs-block-content\">\r\n        <div class=\"ocs-label-content\">\r\n            {{ 'initiative.objectives' | translate }}\r\n        </div>\r\n        <div class=\"ocs-summary-content\">\r\n            {{ description?.objectives }}\r\n        </div>\r\n    </div>\r\n    <div class=\"ocs-block-content\">\r\n        <div class=\"ocs-label-content\">\r\n            {{ 'initiative.register.webpage' | translate }}\r\n        </div>\r\n        <div class=\"ocs-summary-content\">\r\n        <a href=\"{{ initiative?.webpage }}\" title=\" Go to {{ initiative?.webpage }}\" #main tabindex=\"-1\">{{ initiative?.webpage }}</a>\r\n        </div>\r\n    </div>\r\n    <div *ngIf=\"isShow\" id=\"showedinfo\" aria-live=\"polite\">\r\n        <div class=\"ocs-block-content\" >\r\n            <div class=\"ocs-label-content\">\r\n                {{ 'initiative.public.webpage' | translate }}\r\n            </div>\r\n            <div class=\"ocs-summary-content\">\r\n                <a #descUrl href=\"{{ description.url }}\" title=\"{{ description.url }}\">{{ description.url }}</a>\r\n            </div>\r\n        </div>\r\n        <div *ngIf=\"contacts\" class=\"ocs-block-content\">\r\n            <div class=\"ocs-label mb-1\">\r\n            {{ 'initiative.organisers.members' | translate }}\r\n            </div>\r\n            <div class=\"ocs-label-content mb-3\">\r\n                {{ 'initiative.representative' | translate }}\r\n            </div>\r\n            <div class=\"ocs-summary-content mb-3\">\r\n                <p>{{ contacts.representative.name }}</p>\r\n                <a href=\"{{ contacts.representative.email }}\" title=\"\">{{ contacts.representative.email }}</a>\r\n            </div>\r\n            <div class=\"ocs-summary-content mb-3\">\r\n                <p>{{ contacts.substitute.name }}</p>\r\n                <a href=\"{{ contacts.substitute.name }}\" title=\"\">{{ contacts.substitute.name }}</a>\r\n            </div>\r\n            <div class=\"ocs-label-content mt-4\">\r\n                {{ 'initiative.other.members' | translate }}\r\n            </div>\r\n            <div class=\"ocs-summary-content\">\r\n                <p *ngFor=\"let member of contacts.members\" class=\"mt-1\">{{member.name}}</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n        <div class=\"ocs-block-show  mt-2\">\r\n            <ux-button\r\n            attr.aria-expanded=\"{{ isShow }}\"\r\n            attr.aria-controls=\"showedinfo\"\r\n            (click)=\"toggleMore()\"><span aria-hidden=\"true\">{{(isShow ? '-' : '+')}}</span>{{ (isShow ? 'common.hide.info' : 'common.more.info') | translate}}</ux-button>\r\n       </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/features/home/components/initiative/initiative.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitiativeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_language_service__ = __webpack_require__("./src/app/core/services/language.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InitiativeComponent = (function () {
    function InitiativeComponent(service, translateService, languageService) {
        var _this = this;
        this.service = service;
        this.translateService = translateService;
        this.languageService = languageService;
        this.hasTitle = false;
        this.isShow = false;
        this.setFocus = false;
        this.subscriptionLanguage = this.translateService.onLangChange.subscribe(function (params) {
            _this.selectLanguage(params.lang);
        });
    }
    InitiativeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getInitiative().subscribe(function (data) {
            _this.initiative = data;
        });
        this.service.getCachedInitiativeLanguages().subscribe(function (data) {
            _this.languages = data;
        });
        this.service.getContacts().subscribe(function (data) {
            _this.contacts = data;
        });
        this.service.getInitiativeDescriptions().subscribe(function (data) {
            _this.descriptions = data;
            _this.selectLanguage(_this.languageService.selectedLanguage);
        });
    };
    InitiativeComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptionLanguage) {
            this.subscriptionLanguage.unsubscribe();
        }
    };
    InitiativeComponent.prototype.onChangeLanguage = function (languageCode) {
        this.selectLanguage(languageCode);
    };
    InitiativeComponent.prototype.onChangeInitiativeLanguage = function (languageCode) {
        this.selectLanguage(languageCode);
    };
    InitiativeComponent.prototype.ngAfterViewChecked = function () {
        if (this.setFocus) {
            this.descriptionUrl.nativeElement.focus();
            this.setFocus = false;
        }
    };
    InitiativeComponent.prototype.toggleMore = function () {
        this.isShow = !this.isShow;
        if (this.isShow) {
            this.setFocus = true;
        }
    };
    InitiativeComponent.prototype.selectLanguage = function (languageCode) {
        this.selectedLanguage = languageCode;
        this.description = this.descriptions.find(function (item) { return item.languageCode === languageCode; });
        this.service.initiative.description = this.description;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('descUrl'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], InitiativeComponent.prototype, "descriptionUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], InitiativeComponent.prototype, "hasTitle", void 0);
    InitiativeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-initiative',
            template: __webpack_require__("./src/app/features/home/components/initiative/initiative.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_initiative_service__["a" /* InitiativeService */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_3__core_services_language_service__["a" /* LanguageService */]])
    ], InitiativeComponent);
    return InitiativeComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/recent/recent.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ocs-panel-style padd0\">\r\n    <div class=\"ocs-recents-signatories\">\r\n        <table class=\"table\">\r\n            <caption class=\"ocs-title-label ux-u-text-align-center\">{{ 'header.recent.supporters'| translate }}</caption>\r\n            <thead>\r\n            <tr class=\"ocs-hideme\">\r\n               <td id=\"1\"></td>\r\n                <th scope=\"col\" class=\"ocs-noborder\" id=\"2\"><span class=\"ocs-element-hidden\">User</span></th>\r\n                <th scope=\"col\" class=\"ocs-noborder\" id=\"3\"><span class=\"ocs-element-hidden\">From</span></th>\r\n                <th scope=\"col\" class=\"ocs-noborder\" id=\"4\"><span class=\"ocs-element-hidden\">Country</span></th>\r\n                <th scope=\"col\" class=\"ocs-noborder\" id=\"5\"><span class=\"ocs-element-hidden\">Date</span></th>\r\n                <td id=\"6\"></td>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let supporter of supporters\">\r\n                    <td headers=\"1\"></td>\r\n                    <td headers=\"2\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i><span aria-hidden=\"true\" class=\"people-signature\"> +1</span><span aria-label=\"One signature\"></span> </td>\r\n                    <td headers=\"3\">{{ 'common.from' | translate }}</td>\r\n                    <td headers=\"4\"><span attr.aria-label=\"Signature of {{ supporter?.label | translate | uppercase }}\"> {{ supporter?.label | translate | uppercase }} </span></td>\r\n                    <td headers=\"5\"><span attr.aria-label=\"Date signature {{ supporter?.date }}\"> {{ supporter?.date }}</span></td>\r\n                    <td headers=\"6\"></td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/recent/recent.component.scss":
/***/ (function(module, exports) {

module.exports = "/* variables */\n/* ----------------------------------- recent -------------------------------- */\n.ocs-recents-signatories {\n  padding: 0.75em 0 0; }\n.ocs-recents-signatories caption {\n    border-bottom: 0.071428em solid #d2d2d2;\n    caption-side: top; }\n.ocs-recents-signatories tbody td {\n    padding: 1em; }\n.ocs-recents-signatories tbody td span.people-signature {\n      color: #414141;\n      font-size: 0.875em; }\n.ocs-recents-signatories tbody td:nth-child(2) {\n      padding: 0; }\napp-recent .ux-panel-content {\n  padding: 1.25em 0; }\n/* ----------------------------------- end recent -------------------------------- */\n"

/***/ }),

/***/ "./src/app/features/home/components/recent/recent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RecentComponent = (function () {
    function RecentComponent(initiativeService) {
        this.initiativeService = initiativeService;
    }
    RecentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initiativeService.getRecentSignatures()
            .map(function (data) { return _this.parseLatestSignatures(data); })
            .subscribe(function (data) { return _this.supporters = data; });
    };
    RecentComponent.prototype.parseLatestSignatures = function (data) {
        var items = data.map(function (item) {
            item.label = 'common.country.' + item.country;
            return item;
        });
        return items;
    };
    RecentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-recent',
            template: __webpack_require__("./src/app/features/home/components/recent/recent.component.html"),
            styles: [__webpack_require__("./src/app/features/home/components/recent/recent.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_initiative_service__["a" /* InitiativeService */]])
    ], RecentComponent);
    return RecentComponent;
}());



/***/ }),

/***/ "./src/app/features/home/components/signatories/signatories.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"ocs-box-padd\">\r\n    <div *ngIf=\"progress\" class=\"ocs-signature\">\r\n        <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\r\n        <span class=\"ocs-title-label\"> {{ 'header.supporters' | translate }} </span>\r\n        <div class=\"ocs-progress-bar\">\r\n            <div class=\"progress mb-2\">\r\n                <div class=\"progress-bar\" aria-live=\"polite\" role=\"progressbar\" attr.aria-valuenow=\"{{ progress.getPercent() }}\"\r\n                aria-valuemin=\"0\" aria-valuemax=\"100\" [ngStyle]=\"{'width':  progress.getPercent()  + '%'}\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"ocs-progress-bar-data\">\r\n            <div attr.aria-label=\"{{ 'header.current.supportes'| translate }} {{ progress?.signatureCount | number }}\">{{ progress?.signatureCount | number }} </div> /\r\n            <div attr.aria-label=\"{{ 'header.total-supporters'| translate }} {{ progress?.goal | number }}\"> {{ progress?.goal | number }} </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"ocs-signature\">\r\n        <i class=\"fa fa-calendar\" aria-hidden=\"true\"></i><span class=\"ocs-label\"> {{ 'header.registration.date' | translate }}:</span><span> {{ initiative?.registrationDate}}</span>\r\n    </div>\r\n    <div class=\"ocs-signature\">\r\n        <i class=\"fa fa-list-alt\" aria-hidden=\"true\"></i><span class=\"ocs-label\"> {{ 'header.registration.number' | translate }}:</span><span> {{ initiative?.registrationNumber }}</span>\r\n    </div>\r\n    <div class=\"ocs-signature\">\r\n        <i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i><span class=\"ocs-label\"> {{ 'header.closing.date' | translate }}:</span><span> {{ initiative?.closingDate }}</span>\r\n    </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/features/home/components/signatories/signatories.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignatoriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SignatoriesComponent = (function () {
    function SignatoriesComponent(service) {
        this.service = service;
    }
    SignatoriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getInitiative().subscribe(function (data) { return _this.initiative = data; });
        this.service.getProgessStatus().subscribe(function (data) { return _this.progress = data; });
    };
    SignatoriesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signatories',
            template: __webpack_require__("./src/app/features/home/components/signatories/signatories.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_initiative_service__["a" /* InitiativeService */]])
    ], SignatoriesComponent);
    return SignatoriesComponent;
}());



/***/ }),

/***/ "./src/app/features/home/home-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_home_component__ = __webpack_require__("./src/app/features/home/components/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_disabled_component__ = __webpack_require__("./src/app/features/home/components/disabled.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_already_component__ = __webpack_require__("./src/app/features/home/components/already.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_allcountries_allcountries_component__ = __webpack_require__("./src/app/features/home/components/allcountries/allcountries.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_guard_service__ = __webpack_require__("./src/app/features/home/home-guard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_home_component__["a" /* HomeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__home_guard_service__["a" /* HomeGuardService */]],
    },
    {
        path: 'disabled',
        component: __WEBPACK_IMPORTED_MODULE_3__components_disabled_component__["a" /* DisabledComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__home_guard_service__["a" /* HomeGuardService */]],
    },
    {
        path: 'already',
        component: __WEBPACK_IMPORTED_MODULE_4__components_already_component__["a" /* AlreadyComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__home_guard_service__["a" /* HomeGuardService */]],
    },
    {
        path: 'allcountries',
        component: __WEBPACK_IMPORTED_MODULE_5__components_allcountries_allcountries_component__["a" /* AllcountriesComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__home_guard_service__["a" /* HomeGuardService */]],
    },
];
var HomeRoutingModule = (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */]],
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());



/***/ }),

/***/ "./src/app/features/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_routing_module__ = __webpack_require__("./src/app/features/home/home-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_form_support_form_service__ = __webpack_require__("./src/app/features/home/components/form/support-form.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_captcha_service__ = __webpack_require__("./src/app/core/services/captcha.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_home_component__ = __webpack_require__("./src/app/features/home/components/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_signatories_signatories_component__ = __webpack_require__("./src/app/features/home/components/signatories/signatories.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_recent_recent_component__ = __webpack_require__("./src/app/features/home/components/recent/recent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_form_form_component__ = __webpack_require__("./src/app/features/home/components/form/form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_carrousel_carrousel_component__ = __webpack_require__("./src/app/features/home/components/carrousel/carrousel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_initiative_initiative_component__ = __webpack_require__("./src/app/features/home/components/initiative/initiative.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_disabled_component__ = __webpack_require__("./src/app/features/home/components/disabled.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_already_component__ = __webpack_require__("./src/app/features/home/components/already.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_allcountries_allcountries_component__ = __webpack_require__("./src/app/features/home/components/allcountries/allcountries.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_form_property_document_property_component__ = __webpack_require__("./src/app/features/home/components/form/property/document-property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_form_property_property_component__ = __webpack_require__("./src/app/features/home/components/form/property/property.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_form_property_captcha_property_component__ = __webpack_require__("./src/app/features/home/components/form/property/captcha-property.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2__home_routing_module__["a" /* HomeRoutingModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__components_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_signatories_signatories_component__["a" /* SignatoriesComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_recent_recent_component__["a" /* RecentComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_form_form_component__["a" /* FormComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_carrousel_carrousel_component__["a" /* CarrouselComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_initiative_initiative_component__["a" /* InitiativeComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_disabled_component__["a" /* DisabledComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_already_component__["a" /* AlreadyComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_allcountries_allcountries_component__["a" /* AllcountriesComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_form_property_document_property_component__["a" /* DocumentPropertyComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_form_property_property_component__["a" /* PropertyComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_form_property_captcha_property_component__["a" /* CaptchaPropertyComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__components_form_support_form_service__["a" /* SupportFormService */],
                __WEBPACK_IMPORTED_MODULE_4__core_services_captcha_service__["a" /* CaptchaService */]
            ],
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ })

});
//# sourceMappingURL=home.module.chunk.js.map