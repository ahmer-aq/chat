webpackJsonp([0],{

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__friend_request_list__ = __webpack_require__(302);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FriendRequestListPageModule", function() { return FriendRequestListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FriendRequestListPageModule = (function () {
    function FriendRequestListPageModule() {
    }
    return FriendRequestListPageModule;
}());
FriendRequestListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__friend_request_list__["a" /* FriendRequestListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__friend_request_list__["a" /* FriendRequestListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__friend_request_list__["a" /* FriendRequestListPage */]
        ]
    })
], FriendRequestListPageModule);

//# sourceMappingURL=friend-request-list.module.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_data_service_app_data_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendRequestListPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the FriendRequestListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FriendRequestListPage = (function () {
    function FriendRequestListPage(navCtrl, navParams, DataService, storage) {
        //getParamID and check in local stroage: 
        //IF FOUND : GO LOCAL 
        //IF NOT FOUND : GHIT API
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.DataService = DataService;
        this.storage = storage;
        this.names = [];
        this.tempNames = [];
        this.id = [];
        this.images = [];
        this.user_id = this.navParams.get('user_id');
        if (this.user_id) {
            this.DataService.showFriendsRequest(this.user_id)
                .then(function (Responce) {
                console.log(Responce);
                _this.storage.get('friendRequestList').then(function (list) {
                    if (list) {
                        for (var i = 0; i < list.length; i++) {
                            _this.names[i] = list[i].name;
                            _this.tempNames[i] = list[i].name;
                            _this.images[i] = list[i].profile_picture;
                            _this.id[i] = list[i].request_friend_id;
                        }
                        _this.initializeItems();
                    }
                    else {
                        console.log('friendRequestList is empty');
                        _this.initializeItems();
                    }
                    // this.DataService.friendList(friendList.id);
                });
            });
        }
        else {
        }
    }
    FriendRequestListPage.prototype.initializeItems = function () {
        if (this.tempNames) {
            this.names = this.tempNames;
        }
    };
    FriendRequestListPage.prototype.sendRequest = function () { this.navCtrl.push('AddFriendPage'); };
    FriendRequestListPage.prototype.rejectFriendRequest = function (friend_id) {
        var _this = this;
        console.log(friend_id);
        this.storage.get('user').then(function (userData) {
            _this.DataService.rejectFriendRequest(userData.id, friend_id);
        });
    };
    FriendRequestListPage.prototype.acceptFriendRequest = function (friend_id) {
        var _this = this;
        console.log(friend_id);
        this.storage.get('user').then(function (userData) {
            _this.DataService.acceptFriendRequest(userData.id, friend_id);
        });
    };
    FriendRequestListPage.prototype.search = function (ev) {
        this.initializeItems();
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the names
        if (val && val.trim() != '') {
            this.names = this.names.filter(function (names) {
                return (names.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            return 'No request';
        }
    };
    return FriendRequestListPage;
}());
FriendRequestListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-friend-request-list',template:/*ion-inline-start:"D:\markr--\chat\src\pages\friend-request-list\friend-request-list.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Friend Request List</ion-title>\n\n      <ion-buttons end>\n    <button ion-button icon-only (click)="sendRequest()">\n     Send Request\n    </button>\n  </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content >\n<ion-searchbar (ionInput)="search($event)"></ion-searchbar>\n<ion-list *ngFor="let name of names; let i = index">\n  <ion-item-sliding>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{images[i]}}">\n      </ion-avatar>\n      <h2>{{name}}</h2>\n    </ion-item>\n   \n    <ion-item-options side="right">\n      <button ion-button color="secondary" (click)="acceptFriendRequest(id[i])">\n        <ion-icon name="md-checkmark"></ion-icon>\n        Accept\n      </button>\n       <button ion-button color="danger" (click)="rejectFriendRequest(id[i])">\n        <ion-icon name="md-close"></ion-icon>\n        Reject\n      </button>\n\n    </ion-item-options>\n    \n  </ion-item-sliding>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\markr--\chat\src\pages\friend-request-list\friend-request-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_app_data_service_app_data_service__["a" /* AppDataServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], FriendRequestListPage);

//# sourceMappingURL=friend-request-list.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map