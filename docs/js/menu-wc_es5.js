'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">Web4 Documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-AppModule-c9b1356266efba1a5e87e8e80447d390"' : 'data-target="#xs-components-links-module-AppModule-c9b1356266efba1a5e87e8e80447d390"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-c9b1356266efba1a5e87e8e80447d390"' : 'id="xs-components-links-module-AppModule-c9b1356266efba1a5e87e8e80447d390"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-AppModule-c9b1356266efba1a5e87e8e80447d390"' : 'data-target="#xs-injectables-links-module-AppModule-c9b1356266efba1a5e87e8e80447d390"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppModule-c9b1356266efba1a5e87e8e80447d390"' : 'id="xs-injectables-links-module-AppModule-c9b1356266efba1a5e87e8e80447d390"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ProjectService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProjectService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/StorageService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >StorageService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/TaskService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TaskService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/TeamService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TeamService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UserService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AuthModule.html\" data-type=\"entity-link\" >AuthModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AuthRoutingModule.html\" data-type=\"entity-link\" >AuthRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/HomePageModule.html\" data-type=\"entity-link\" >HomePageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-HomePageModule-db4ad3435124fe944e2696af01be9436"' : 'data-target="#xs-components-links-module-HomePageModule-db4ad3435124fe944e2696af01be9436"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-HomePageModule-db4ad3435124fe944e2696af01be9436"' : 'id="xs-components-links-module-HomePageModule-db4ad3435124fe944e2696af01be9436"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/HomePage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HomePage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/HomePageRoutingModule.html\" data-type=\"entity-link\" >HomePageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/LoginPageModule.html\" data-type=\"entity-link\" >LoginPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-LoginPageModule-e58bf0913fe855608ba1b7e1a27fb56b"' : 'data-target="#xs-components-links-module-LoginPageModule-e58bf0913fe855608ba1b7e1a27fb56b"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-LoginPageModule-e58bf0913fe855608ba1b7e1a27fb56b"' : 'id="xs-components-links-module-LoginPageModule-e58bf0913fe855608ba1b7e1a27fb56b"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/LoginPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LoginPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/LoginPageRoutingModule.html\" data-type=\"entity-link\" >LoginPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProfilePageModule.html\" data-type=\"entity-link\" >ProfilePageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-ProfilePageModule-8b0df0089081c3712b3c100324d91dca"' : 'data-target="#xs-components-links-module-ProfilePageModule-8b0df0089081c3712b3c100324d91dca"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-ProfilePageModule-8b0df0089081c3712b3c100324d91dca"' : 'id="xs-components-links-module-ProfilePageModule-8b0df0089081c3712b3c100324d91dca"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/ProfilePage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProfilePage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProfilePageRoutingModule.html\" data-type=\"entity-link\" >ProfilePageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProjectReadPageModule.html\" data-type=\"entity-link\" >ProjectReadPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-ProjectReadPageModule-3c156a185013ae9dfed79b707e6c9104"' : 'data-target="#xs-components-links-module-ProjectReadPageModule-3c156a185013ae9dfed79b707e6c9104"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-ProjectReadPageModule-3c156a185013ae9dfed79b707e6c9104"' : 'id="xs-components-links-module-ProjectReadPageModule-3c156a185013ae9dfed79b707e6c9104"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/ProjectReadPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProjectReadPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProjectReadPageRoutingModule.html\" data-type=\"entity-link\" >ProjectReadPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProjectsPageModule.html\" data-type=\"entity-link\" >ProjectsPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-ProjectsPageModule-dd78e62d744fabde2c946442461b9bbd"' : 'data-target="#xs-components-links-module-ProjectsPageModule-dd78e62d744fabde2c946442461b9bbd"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-ProjectsPageModule-dd78e62d744fabde2c946442461b9bbd"' : 'id="xs-components-links-module-ProjectsPageModule-dd78e62d744fabde2c946442461b9bbd"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/ProjectsPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProjectsPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProjectsPageRoutingModule.html\" data-type=\"entity-link\" >ProjectsPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ReadPageRoutingModule.html\" data-type=\"entity-link\" >ReadPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/RegisterPageModule.html\" data-type=\"entity-link\" >RegisterPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-RegisterPageModule-dbbac312ef3c4a5a231d0ef3aef19dc8"' : 'data-target="#xs-components-links-module-RegisterPageModule-dbbac312ef3c4a5a231d0ef3aef19dc8"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-RegisterPageModule-dbbac312ef3c4a5a231d0ef3aef19dc8"' : 'id="xs-components-links-module-RegisterPageModule-dbbac312ef3c4a5a231d0ef3aef19dc8"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/RegisterPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >RegisterPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/RegisterPageRoutingModule.html\" data-type=\"entity-link\" >RegisterPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SharedModule.html\" data-type=\"entity-link\" >SharedModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-SharedModule-75b3871af906ce5a01a53fb85664c61e"' : 'data-target="#xs-components-links-module-SharedModule-75b3871af906ce5a01a53fb85664c61e"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-SharedModule-75b3871af906ce5a01a53fb85664c61e"' : 'id="xs-components-links-module-SharedModule-75b3871af906ce5a01a53fb85664c61e"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/PasswordInputComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PasswordInputComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/TeamReadPageModule.html\" data-type=\"entity-link\" >TeamReadPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-TeamReadPageModule-11e26fa3fe91b86dc2f2d91d3a4146ea"' : 'data-target="#xs-components-links-module-TeamReadPageModule-11e26fa3fe91b86dc2f2d91d3a4146ea"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-TeamReadPageModule-11e26fa3fe91b86dc2f2d91d3a4146ea"' : 'id="xs-components-links-module-TeamReadPageModule-11e26fa3fe91b86dc2f2d91d3a4146ea"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/TeamReadPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TeamReadPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/TeamReadRoutingModule.html\" data-type=\"entity-link\" >TeamReadRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/TeamsPageModule.html\" data-type=\"entity-link\" >TeamsPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-TeamsPageModule-f1dc09394c11ccb269eedd9716fffa35"' : 'data-target="#xs-components-links-module-TeamsPageModule-f1dc09394c11ccb269eedd9716fffa35"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-TeamsPageModule-f1dc09394c11ccb269eedd9716fffa35"' : 'id="xs-components-links-module-TeamsPageModule-f1dc09394c11ccb269eedd9716fffa35"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/TeamsPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TeamsPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/TeamsPageRoutingModule.html\" data-type=\"entity-link\" >TeamsPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UserReadPageModule.html\" data-type=\"entity-link\" >UserReadPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-UserReadPageModule-f9c41a7c251c75ba8eaf60a1355e34eb"' : 'data-target="#xs-components-links-module-UserReadPageModule-f9c41a7c251c75ba8eaf60a1355e34eb"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-UserReadPageModule-f9c41a7c251c75ba8eaf60a1355e34eb"' : 'id="xs-components-links-module-UserReadPageModule-f9c41a7c251c75ba8eaf60a1355e34eb"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/UserReadPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserReadPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UsersPageModule.html\" data-type=\"entity-link\" >UsersPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-UsersPageModule-c0412e63911a39d25a537647b0614a78"' : 'data-target="#xs-components-links-module-UsersPageModule-c0412e63911a39d25a537647b0614a78"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-UsersPageModule-c0412e63911a39d25a537647b0614a78"' : 'id="xs-components-links-module-UsersPageModule-c0412e63911a39d25a537647b0614a78"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/UsersPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UsersPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UsersPageRoutingModule.html\" data-type=\"entity-link\" >UsersPageRoutingModule</a>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/JsonWebTokenEntity.html\" data-type=\"entity-link\" >JsonWebTokenEntity</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Project.html\" data-type=\"entity-link\" >Project</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Task.html\" data-type=\"entity-link\" >Task</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Team.html\" data-type=\"entity-link\" >Team</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/CrudService.html\" data-type=\"entity-link\" >CrudService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RestService.html\" data-type=\"entity-link\" >RestService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"', ">\n                            <span class=\"icon ion-ios-swap\"></span>\n                            <span>Interceptors</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interceptors/AuthInterceptor.html\" data-type=\"entity-link\" >AuthInterceptor</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"', ">\n                            <span class=\"icon ion-ios-lock\"></span>\n                            <span>Guards</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"', ">\n                            <li class=\"link\">\n                                <a href=\"guards/GuestGuard.html\" data-type=\"entity-link\" >GuestGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/ICrud.html\" data-type=\"entity-link\" >ICrud</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IProject.html\" data-type=\"entity-link\" >IProject</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IResponse.html\" data-type=\"entity-link\" >IResponse</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ITask.html\" data-type=\"entity-link\" >ITask</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ITeam.html\" data-type=\"entity-link\" >ITeam</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ITimestamp.html\" data-type=\"entity-link\" >ITimestamp</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IToken.html\" data-type=\"entity-link\" >IToken</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IUser.html\" data-type=\"entity-link\" >IUser</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <a data-type=\"chapter-link\" href=\"routes.html\"><span class=\"icon ion-ios-git-branch\"></span>Routes</a>\n                        </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));