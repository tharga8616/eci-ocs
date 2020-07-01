webpackJsonp(["submitted.module"],{

/***/ "./src/app/features/submitted/components/feedback/feedback.component.html":
/***/ (function(module, exports) {

module.exports = "<form *ngIf=\"!isSubmittedOK()\" [formGroup]=\"form\" class=\"dgtc-form\">\r\n    <fieldset class=\"ocs-feedback-option\">\r\n        <legend class=\"ocs-title-highlight\"> <span class=\"ux-u-font-bold ocs-font-22\">{{ 'feedback.how-experience' | translate }}</span>  {{ 'feedback.experience-initiative' | translate }}</legend>\r\n        <div class=\"ocs-box-badges\">\r\n            <div *ngFor=\"let option of options\" class=\"ocs-badge-radio\" role=\"radiogroup\">\r\n                <input type=\"radio\"\r\n                    id=\"satisfaction_{{option}}\"\r\n                    [disabled]=\"feedbackSubmitted\"\r\n                    formControlName=\"experience\"\r\n                    [value]=\"option\"\r\n                    class=\"ocs-badge-input\">\r\n                <label for=\"satisfaction_{{option}}\" class=\"ocs-badge-label\">{{('feedback.experience.' + option) | translate}}</label>\r\n            </div>\r\n        </div>\r\n    </fieldset>\r\n    <fieldset class=\"ocs-feedback-option\">\r\n        <legend> <span class=\"ux-u-font-bold\">{{ 'feedback.your-will-help-us' | translate }}</span></legend>\r\n        <div class=\"ocs-help\">\r\n            <ux-form-group label=\"{{ 'feedback.your-will-help-us-sub' | translate }}\" [isVertical]=\"true\">\r\n                <ux-form-control\r\n                    [isTextarea]=\"true\"\r\n                    formControlName=\"message\"\r\n                    styleClass=\"form-control mb-3 ocs-wd-100 ocs-normal-text\"\r\n                    [rows]=\"5\"\r\n                    [maxlength]=\"feedbackMaxLength\"\r\n                    placeholderLabel=\"{{ 'feedback.write-your-feedback' | translate}}\">\r\n                </ux-form-control>\r\n            </ux-form-group>\r\n            <div class=\"ocs-box-button mt-4\">\r\n                <ux-button (click)=\"onSubmitFeedback()\" styleClass=\"btn btn-primary btn-lg\">{{ 'feedback.send-feedback' | translate }}</ux-button>\r\n            </div>\r\n            <ux-alert *ngIf=\"isSubmittedError()\" typeClass=\"danger\" styleClass=\"mt-4\">{{'feedback.result-error' | translate}}</ux-alert>\r\n        </div>\r\n    </fieldset>\r\n</form>\r\n<ux-alert *ngIf=\"isSubmittedOK()\" typeClass=\"success\">{{'feedback.result-ok' | translate}}</ux-alert>\r\n\r\n"

/***/ }),

/***/ "./src/app/features/submitted/components/feedback/feedback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_api_ocs_service__ = __webpack_require__("./src/app/core/services/api-ocs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FeedbackComponent = (function () {
    function FeedbackComponent(service, fb) {
        this.service = service;
        this.fb = fb;
        this.options = ['bad', 'fair', 'fine', 'good'];
        this.feedbackMaxLength = 300;
        this.defaultExperience = 'good';
        this.error = false;
        this.feedbackSubmitted = false;
        this.form = this.fb.group({
            experience: [this.defaultExperience],
            message: [null]
        });
    }
    FeedbackComponent.prototype.ngOnInit = function () {
    };
    FeedbackComponent.prototype.onSubmitFeedback = function () {
        var _this = this;
        this.error = false;
        var message = this.form.value.message;
        var experience = this.form.value.experience;
        this.service.submitFeedback(message, experience).subscribe(function (res) {
            if (+res.code === 200 && res.status === 'SUCCESS') {
                _this.feedbackSubmitted = true;
            }
        }, function (error) {
            _this.feedbackSubmitted = true;
            _this.error = true;
        });
    };
    FeedbackComponent.prototype.isSubmittedOK = function () {
        return this.feedbackSubmitted && !this.error;
    };
    FeedbackComponent.prototype.isSubmittedError = function () {
        return this.feedbackSubmitted && this.error;
    };
    FeedbackComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-feedback',
            template: __webpack_require__("./src/app/features/submitted/components/feedback/feedback.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_api_ocs_service__["a" /* ApiOcsService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]])
    ], FeedbackComponent);
    return FeedbackComponent;
}());



/***/ }),

/***/ "./src/app/features/submitted/components/shared-social/shared-social.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ocs-share\">\r\n    <div class=\"ocs-title-section mt-2 mb-5\"> \"{{ 'feedback.title' | translate }}\" </div>\r\n    <div class=\"ocs-title-highlight\"> <span class=\"ux-u-font-bold\">{{ 'congratulations.share-this-initiative' | translate }}</span>  {{ 'congratulations.and-make-change' | translate }}</div>\r\n    <div class=\"ocs-share-social\">\r\n        <div>\r\n            <a class=\"social-facebook\"\r\n                href=\"https://www.facebook.com/sharer/sharer.php?u={{ locationURL }}\"\r\n                onclick=\"javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'); return false;\"\r\n                target=\"_blank\"><span>{{ 'feedback.share-on-facebook' | translate }}</span>\r\n            </a>\r\n        </div>\r\n        <div>\r\n            <a class=\"social-twitter\"\r\n                href=\"https://twitter.com/intent/tweet?text={{ twitterEncodedMessage }}\"\r\n                target=\"_blank\"><span>{{ 'feedback.tweet-it' | translate }}</span>\r\n            </a>\r\n        </div>\r\n        <div>\r\n            <a class=\"social-googleplus\"\r\n                href=\"https://plus.google.com/share?url={{ locationURL }}\"\r\n                onclick=\"javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'); return false;\"\r\n                target=\"_blank\"><span>{{ 'feedback.share-google' | translate }}</span>\r\n            </a>\r\n        </div>\r\n        <div *ngIf=\"callbackUrl\">\r\n            <a class=\"social-share\"\r\n                href=\"{{ callbackUrl }}\"\r\n                target=\"_blank\"><span>{{ callbackUrl }}</span>\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/features/submitted/components/shared-social/shared-social.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedSocialComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SharedSocialComponent = (function () {
    function SharedSocialComponent(service, translateService) {
        var _this = this;
        this.service = service;
        this.translateService = translateService;
        this.langChangeSubscription = translateService.onLangChange.subscribe(function () { return _this.loadData(); });
    }
    Object.defineProperty(SharedSocialComponent.prototype, "callbackUrl", {
        get: function () {
            return this.service.cachedCustomisations.callbackUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedSocialComponent.prototype, "twitterEncodedMessage", {
        get: function () {
            return this.encode(this.twitterMessage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedSocialComponent.prototype, "locationURL", {
        get: function () {
            return encodeURIComponent(location.href);
        },
        enumerable: true,
        configurable: true
    });
    SharedSocialComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    SharedSocialComponent.prototype.ngOnDestroy = function () {
        if (this.langChangeSubscription) {
            this.langChangeSubscription.unsubscribe();
        }
    };
    SharedSocialComponent.prototype.encode = function (message) {
        return encodeURIComponent(message);
    };
    SharedSocialComponent.prototype.loadData = function () {
        var _this = this;
        this.service.getCallForActionMessage().subscribe(function (data) {
            _this.callForActionMessage = data['message'];
        });
        this.service.getTwitterMessage().subscribe(function (data) {
            _this.twitterMessage = data['message'];
        });
    };
    SharedSocialComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-shared-social',
            template: __webpack_require__("./src/app/features/submitted/components/shared-social/shared-social.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_services_initiative_service__["a" /* InitiativeService */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], SharedSocialComponent);
    return SharedSocialComponent;
}());



/***/ }),

/***/ "./src/app/features/submitted/components/signature-identifier/signature-identifier.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ocs-panel-style\">\r\n    <!-- /* stylelint-disable-next-line unit-whitelist */ -->\r\n    <svg style=\"width:20px; height:20px; top: -2px; position: relative;\" viewBox=\"0 0 24 24\">\r\n        <path fill=\"#414141\" d=\"M12,13C9.33,13 4,14.33 4,17V20H20V17C20,14.33 14.67,13 12,13M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4M12,14.9C14.97,14.9 18.1,16.36 18.1,17V18.1H5.9V17C5.9,16.36 9,14.9 12,14.9M12,5.9A2.1,2.1 0 0,1 14.1,8A2.1,2.1 0 0,1 12,10.1A2.1,2.1 0 0,1 9.9,8A2.1,2.1 0 0,1 12,5.9Z\" />\r\n    </svg>\r\n    <h3 class=\"ocs-label\"> {{ 'congratulations.signature-identifier' | translate }} </h3>\r\n    <div class=\"ocs-sg-identifier-date\">{{ signatureIdentifier }}</div>\r\n    <svg style=\"width: 20px; height:20px; top: -2px; position: relative;\" viewBox=\"0 0 24 24\">\r\n        <path fill=\"#414141\" d=\"M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z\" />\r\n    </svg>\r\n    <h3 class=\"ocs-label\"> {{ 'congratulations.date-signature' | translate }} </h3>\r\n    <div class=\"ocs-sg-identifier-date\"> {{ today | date:'dd/MM/yyyy'}} </div>\r\n    <div class=\"ocs-sg-info ux-u-text-align-center\">{{ 'congratulations.Keep-your-signature' | translate }} </div>\r\n    <a href=\"{{ urlDownloadSignature }}\"\r\n        role=\"button\"\r\n        attr.aria-label=\"{{ 'congratulations.download-signature-identifier'| translate }}\"\r\n        aria-pressed=\"false\"\r\n        download=\"signature\"\r\n        class=\"btn ux-button btn-outline-primary ocs-sg-button ocs-without-shadow\">{{ 'congratulations.download-signature-identifier'| translate }}</a>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/features/submitted/components/signature-identifier/signature-identifier.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignatureIdentifierComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_application_service__ = __webpack_require__("./src/app/core/services/application.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_initiative_service__ = __webpack_require__("./src/app/core/services/initiative.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignatureIdentifierComponent = (function () {
    function SignatureIdentifierComponent(applicationService, service) {
        this.applicationService = applicationService;
        this.service = service;
        this.today = Date.now();
    }
    Object.defineProperty(SignatureIdentifierComponent.prototype, "signatureIdentifier", {
        get: function () {
            return this.applicationService.signatureIdentifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignatureIdentifierComponent.prototype, "urlDownloadSignature", {
        get: function () {
            return this.service.getUrlDownloadSignature(this.signatureIdentifier);
        },
        enumerable: true,
        configurable: true
    });
    SignatureIdentifierComponent.prototype.OnDownloadSignature = function () {
        document.location.href = this.urlDownloadSignature;
    };
    SignatureIdentifierComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-signature-identifier',
            template: __webpack_require__("./src/app/features/submitted/components/signature-identifier/signature-identifier.component.html"),
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_services_application_service__["a" /* ApplicationService */],
            __WEBPACK_IMPORTED_MODULE_2__core_services_initiative_service__["a" /* InitiativeService */]])
    ], SignatureIdentifierComponent);
    return SignatureIdentifierComponent;
}());



/***/ }),

/***/ "./src/app/features/submitted/components/submitted.component.html":
/***/ (function(module, exports) {

module.exports = "<app-title\r\n    icon=\"hand\"\r\n    title=\"congratulations.title\"\r\n    subtitle=\"congratulations.successfully-title\"\r\n    class=\"ocs-icon-subtitle\">\r\n</app-title>\r\n<div class=\"row\">\r\n    <div class=\"col-md-5 padding-container\">\r\n       <app-signature-identifier></app-signature-identifier>\r\n    </div>\r\n    <div class=\"col-md-7 padding-container\">\r\n       <app-shared-social></app-shared-social>\r\n       <app-feedback></app-feedback>\r\n    </div>\r\n</div>\r\n<app-support></app-support>\r\n"

/***/ }),

/***/ "./src/app/features/submitted/components/submitted.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmittedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SubmittedComponent = (function () {
    function SubmittedComponent() {
    }
    SubmittedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("./src/app/features/submitted/components/submitted.component.html")
        })
    ], SubmittedComponent);
    return SubmittedComponent;
}());



/***/ }),

/***/ "./src/app/features/submitted/submitted-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmittedRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_submitted_component__ = __webpack_require__("./src/app/features/submitted/components/submitted.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_submitted_component__["a" /* SubmittedComponent */],
    }
];
var SubmittedRoutingModule = (function () {
    function SubmittedRoutingModule() {
    }
    SubmittedRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* RouterModule */]],
        })
    ], SubmittedRoutingModule);
    return SubmittedRoutingModule;
}());



/***/ }),

/***/ "./src/app/features/submitted/submitted.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmittedModule", function() { return SubmittedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__("./src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__submitted_routing_module__ = __webpack_require__("./src/app/features/submitted/submitted-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_submitted_component__ = __webpack_require__("./src/app/features/submitted/components/submitted.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_signature_identifier_signature_identifier_component__ = __webpack_require__("./src/app/features/submitted/components/signature-identifier/signature-identifier.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_shared_social_shared_social_component__ = __webpack_require__("./src/app/features/submitted/components/shared-social/shared-social.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_feedback_feedback_component__ = __webpack_require__("./src/app/features/submitted/components/feedback/feedback.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SubmittedModule = (function () {
    function SubmittedModule() {
    }
    SubmittedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_2__submitted_routing_module__["a" /* SubmittedRoutingModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__components_submitted_component__["a" /* SubmittedComponent */],
                __WEBPACK_IMPORTED_MODULE_4__components_signature_identifier_signature_identifier_component__["a" /* SignatureIdentifierComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_shared_social_shared_social_component__["a" /* SharedSocialComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_feedback_feedback_component__["a" /* FeedbackComponent */]
            ],
            providers: [],
        })
    ], SubmittedModule);
    return SubmittedModule;
}());



/***/ })

});
//# sourceMappingURL=submitted.module.chunk.js.map