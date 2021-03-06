'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

exports.default = ImageSliderHoc;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function ImageSliderHoc(Component) {
    var WrapperComponent = function (_React$Component) {
        _inherits(WrapperComponent, _React$Component);

        function WrapperComponent(props) {
            _classCallCheck(this, WrapperComponent);

            return _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).call(this, props));
        }

        _createClass(WrapperComponent, [{
            key: 'renameImages',
            value: function renameImages(images) {
                var imagesArray = Array.isArray(images) ? images : [];
                return imagesArray.map(function (image, count) {
                    return image + ('?rscver' + count);
                });
            }
        }, {
            key: 'positionCalculator',
            value: function positionCalculator(options) {
                var calculator = {
                    skipScrollIfNonInfinite: function skipScrollIfNonInfinite(visibleItems, currentPosition, nextPosition) {
                        if (!options.isInfinite && nextPosition < 0) {
                            return currentPosition;
                        }
                    },

                    scrollIfInfinite: function scrollIfInfinite(visibleItems, currentPosition, nextPosition) {
                        if (options.isInfinite && nextPosition < 0) {
                            return nextPosition + visibleItems;
                        }
                    },

                    scrollToBeginningIfEnd: function scrollToBeginningIfEnd(visibleItems, currentPosition, nextPosition) {
                        if (nextPosition + 1 > options.totalItems) {
                            return currentPosition;
                        }
                    },

                    skipScrollIfEnd: function skipScrollIfEnd(visibleItems, currentPosition, nextPosition) {
                        if (!options.isInfinite && nextPosition > options.totalItems) {
                            return currentPosition;
                        }
                        if (!options.isInfinite && nextPosition < 0) {
                            return currentPosition;
                        }
                    }
                };
                return calculator;
            }
        }, {
            key: 'render',
            value: function render() {
                var images = this.renameImages(this.props.children);
                var calculator = this.positionCalculator({
                    isInfinite: this.props.isInfinite,
                    totalItems: this.props.children.length
                });
                return _react2.default.createElement(Component, _extends({}, this.props, {
                    images: images,
                    calculator: calculator
                }));
            }
        }]);

        return WrapperComponent;
    }(_react2.default.Component);

    WrapperComponent.propTypes = _react2.default.PropTypes.shape({
        visibleItems: _react.PropTypes.number.isRequired,
        images: _react.PropTypes.array.isRequired,
        delay: _react.PropTypes.number.isRequired,
        isInfinite: _react.PropTypes.bool.isRequired
    }).isRequired;

    WrapperComponent.defaultProps = {
        isInfinite: true,
        delay: 5000,
        visibleItems: 4
    };

    return WrapperComponent;
}