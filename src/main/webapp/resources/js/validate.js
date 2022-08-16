
function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function validate(inputElement, rule) {
        var groupElement = getParent(inputElement, options.formGroupSelector);
        var errElement = groupElement.querySelector(options.errSelector);
        var errMsg;

        // Lấy các rules của selector
        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errMsg = rules[i](
                            formElement.querySelector(rule.selector + ':checked')
                            );
                    break
                default:
                    errMsg = rules[i](inputElement.value);
            }
            if (errMsg) {
                break
            }
        }

        if (errMsg) {
            errElement.innerText = errMsg;
            groupElement.classList.add('invalid');
        } else {
            errElement.innerText = '';
            groupElement.classList.remove('invalid');
        }

        return !errMsg;
    }

    // Form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {

        formElement.onsubmit = (e) => {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);

                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Submit với Javascript
                if (typeof options.onSubmit === 'function') {
                    // NodeList thông tin đã nhập
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');

                    // Trả về Array thừ NodeList
                    var formValues = Array.from(enableInputs).reduce((acc, input) => {

                        switch (input.type) {
                            case 'radio':
                                var rdoChecked = formElement.querySelector('input[name="' + input.name + '"]:checked');
                                if (rdoChecked) {
                                    acc[input.name] = rdoChecked.value;
                                }
                                break
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    acc[input.name] = '';
                                    return acc;
                                }

                                if (!Array.isArray(acc[input.name])) {
                                    acc[input.name] = [];
                                }
                                acc[input.name].push(input.value);
                                break
                            case 'file':
                                acc[input.name] = input.files;
                                break
                            default:
                                acc[input.name] = input.value;
                        }

                        return acc;
                    }, {});

                    options.onSubmit(formValues);
                }
                // Submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            } else {
                console.log('Error');
            }
        };

        // Lặp qua mỗi rule và xử lí
        options.rules.forEach(rule => {

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(inputElement => {
                if (inputElement) {

                    // Trường hợp blur khỏi input
                    inputElement.onblur = () => {
                        validate(inputElement, rule);
                    };

                    // Trường hợp khi đang nhập vào input (bor thông báo error)
                    inputElement.oninput = () => {
                        var groupElement = getParent(inputElement, options.formGroupSelector);
                        var errElement = groupElement.querySelector(options.errSelector);

                        errElement.innerText = '';
                        groupElement.classList.remove('invalid');
                    };
                }
            });
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Định dạng email không đúng';
        }
    };
};

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || `Giá trị nhập vào không chính xác`;
        }
    };
};

Validator.isDate = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let isValidDate = Date.parse(value);
            return !isNaN(isValidDate) ? undefined : message || `Ngày sinh bắt buộc nhập`;
        }
    };
};

Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
            return regex.test(value) ? undefined : message || 'Số điện thoại không đúng';
        }
    };
};