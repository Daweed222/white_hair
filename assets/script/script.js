// Default Registration Form Container
const container = document.getElementById('registration-form-container');

// Function to return the Default Error Object
const defaultErrorObject = () => ({
    nameError: false,
    nameErrorMessage: [],
    emailError: false,
    emailErrorMessage: [],
    emailConfirmError: false,
    emailConfirmErrorMessage: [],
    gdprError: false,
    gdprErrorMessage: [],
});

// Function to return the Default User Data Object
const defaultUserData = () => ({
    name: '',
    email: '',
    emailConfirm: '',
    referal: '',
    gdpr: false,
});

// Validate the given User Data
const validate = (userData = {}) => {
    const errorObject = defaultErrorObject();

    // Validate Username
    if (userData?.name?.length === 0) {
        errorObject.nameError = true;
        errorObject.nameErrorMessage.push('Név nem lehet üres!');
    };

    // Validate Email
    if (userData?.email?.length === 0) {
        errorObject.emailError = true;
        errorObject.emailErrorMessage.push('Email nem lehet üres!');
    };

    // Validate Email Confirm
    if (userData?.emailConfirm?.length !== 0) {
        if (userData.email !== userData.emailConfirm) {
            errorObject.emailConfirmError = true;
            errorObject.emailConfirmErrorMessage.push('Nem egyezik az email cím!');
        }
    } else {
        errorObject.emailConfirmError = true;
        errorObject.emailConfirmErrorMessage.push('Erősítse meg email címét!');
    }

    // Validate GDPR
    if (!userData?.gdpr) {
        errorObject.gdprError = true;
        errorObject.gdprErrorMessage.push('Fogadja el a GDPR!');
    };

    // Evaluate data
    if (errorObject.nameError || errorObject.emailError || errorObject.emailConfirmError || errorObject.gdprError) {
        buildRegistrationForm(userData, errorObject);
    } else {
        successfullRegistration(userData);
    }
};

// Build Registration Form
const buildRegistrationForm = (userData = {}, errorObject = {}) => {
    let isGdprChecked = userData.gdpr;

    // Function that builds the error message container
    const buildErrorMessageContainer = (errorMessage) => {
        const errorMessageContainer = document.createElement('div');
        errorMessageContainer.classList.add('error');
        errorMessageContainer.innerHTML = errorMessage;

        return errorMessageContainer;
    };

    const handleInputFocusIn = (wrapper) => {
        if (wrapper) {
            if (!wrapper.classList.contains('active')) {
                wrapper.classList.add('active');
            }
        }
    };

    const handleInputFocusOut = (e, wrapper) => {
        if (wrapper) {
            if (e.target.value.length === 0) {
                wrapper.classList.remove('active');
            }
        }
    };

    // Container RESET to Default
    container.innerHTML = '';

    // Registration Form
    const registrationForm = document.createElement('form');
    registrationForm.classList.add('registration-form');
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validate({
            name: nameInput.value,
            email: emailInput.value,
            emailConfirm: emailConfirmInput.value,
            referal: dropDownSelectedValue.innerHTML,
            gdpr: isGdprChecked,
        });
    });

    // Username Wrapper
    const nameWrapper = document.createElement('div');
    userData.name ? nameWrapper.classList.add('active') : false;

    // Username Label
    const nameLabel = document.createElement('label');
    nameLabel.innerHTML = "Név"
    nameLabel.setAttribute('for', 'user_name');
    nameLabel.addEventListener('click', () => handleInputFocusIn(nameWrapper));
    nameWrapper.appendChild(nameLabel);

    // Username Input
    const nameInput = document.createElement('input');
    nameInput.id = 'user_name';
    nameInput.setAttribute('title', 'Név');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', '');
    userData.name ? nameInput.value = userData.name : false;
    nameInput.addEventListener('focus', () => handleInputFocusIn(nameWrapper));
    nameInput.addEventListener('focusout', (e) => handleInputFocusOut(e, nameWrapper));
    nameWrapper.appendChild(nameInput);

    // Username Error
    if (errorObject.nameError) {
        errorObject.nameErrorMessage.forEach(errorMessage => {
            nameWrapper.appendChild(buildErrorMessageContainer(errorMessage));
        });
    };

    // Append Username Wrapper to the Registration Form
    registrationForm.appendChild(nameWrapper);

    /* Email Wrapper */
    const emailWrapper = document.createElement('div');
    userData.email ? emailWrapper.classList.add('active') : false;

    // Email Label
    const emailLabel = document.createElement('label');
    emailLabel.innerHTML = "Email"
    emailLabel.setAttribute('for', 'email');
    emailLabel.addEventListener('click', () => handleInputFocusIn(emailWrapper));
    emailWrapper.appendChild(emailLabel);

    // Email Input
    const emailInput = document.createElement('input');
    emailInput.id = 'email';
    emailInput.setAttribute('title', 'Email');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('placeholder', '');
    userData.email ? emailInput.value = userData.email : false;
    emailInput.addEventListener('focus', () => handleInputFocusIn(emailWrapper));
    emailInput.addEventListener('focusout', (e) => handleInputFocusOut(e, emailWrapper));
    emailWrapper.appendChild(emailInput);

    // Email Error
    if (errorObject.emailError) {
        errorObject.emailErrorMessage.forEach(errorMessage => {
            emailWrapper.appendChild(buildErrorMessageContainer(errorMessage));
        });
    };

    // Append Email Wrapper to Registration Form
    registrationForm.appendChild(emailWrapper);

    /* Email Confirm Wrapper */
    const emailConfirmWrapper = document.createElement('div');
    userData.emailConfirm ? emailConfirmWrapper.classList.add('active') : false;

    // Email Confirm Label
    const emailConfirmLabel = document.createElement('label');
    emailConfirmLabel.innerHTML = "Email megerősítés"
    emailConfirmLabel.setAttribute('for', 'email-confirm');
    emailConfirmLabel.addEventListener('click', () => handleInputFocusIn(emailConfirmWrapper));
    emailConfirmWrapper.appendChild(emailConfirmLabel);

    // Email Confirm Input
    const emailConfirmInput = document.createElement('input');
    emailConfirmInput.id = 'email-confirm';
    emailConfirmInput.setAttribute('title', 'Email megerősítés');
    emailConfirmInput.setAttribute('type', 'text');
    emailConfirmInput.setAttribute('placeholder', '');
    userData.emailConfirm ? emailConfirmInput.value = userData.emailConfirm : false;
    emailConfirmInput.addEventListener('focus', () => handleInputFocusIn(emailConfirmWrapper));
    emailConfirmInput.addEventListener('focusout', (e) => handleInputFocusOut(e, emailConfirmWrapper));
    emailConfirmWrapper.appendChild(emailConfirmInput);

    // Email Confirm Errors
    if (errorObject.emailConfirmError) {
        errorObject.emailConfirmErrorMessage.forEach(errorMessage => {
            emailConfirmWrapper.appendChild(buildErrorMessageContainer(errorMessage));
        });
    };

    // Append Email Confirm Wrapper to Registration Form
    registrationForm.appendChild(emailConfirmWrapper);

    /* Referal Wrapper */
    const referalWrapper = document.createElement('div');
    referalWrapper.classList.add('referal-wrapper');

    // Referal Label
    const referalLabel = document.createElement('label');
    referalLabel.innerHTML = "Honnan hallott rólunk?"
    referalLabel.setAttribute('for', 'referal');
    referalLabel.addEventListener('click', () => false);
    referalWrapper.appendChild(referalLabel);

    // Dropdown Values
    const dropDownValues = ['Internetről', 'Televízióból', 'Egyéb helyről']

    // Dropdown Container
    const dropDownContainer = document.createElement('div');
    dropDownContainer.classList.add('drop-down-container');

    // Dropdown Selected Value
    const dropDownSelectedValue = document.createElement('div');
    dropDownSelectedValue.classList.add('drop-down-selected-value');
    dropDownSelectedValue.innerHTML = dropDownValues[0];
    dropDownSelectedValue.addEventListener('click', () => {
        if (!dropDownContainer.classList.contains('active')) {
            dropDownContainer.classList.add('active');
        } else {
            dropDownContainer.classList.remove('active');
        }
    });
    dropDownContainer.appendChild(dropDownSelectedValue);

    // Dropdown Value Container
    const dropDownValueContainer = document.createElement('div');
    dropDownValueContainer.classList.add('drop-down-value-container');

    // Drop Down Values
    dropDownValues.forEach(value => {
        let div = document.createElement('div');
        div.innerHTML = value;
        div.addEventListener('click', (e) => {
            dropDownSelectedValue.innerHTML = e.target.innerHTML;

            if (dropDownContainer.classList.contains('active')) {
                dropDownContainer.classList.remove('active');
            }
        });

        dropDownValueContainer.appendChild(div);
    });

    // Append Dropdown Value Container to Drop Down Container
    dropDownContainer.appendChild(dropDownValueContainer);

    // Drop Down Container Wrapper to Append Referal Wrapper
    referalWrapper.appendChild(dropDownContainer);

    // Append Referal Wrapper to Registration Form
    registrationForm.appendChild(referalWrapper);

    /* GDPR Wrapper */
    const gdprWrapper = document.createElement('div');
    gdprWrapper.classList.add('gdpr-wrapper');

    // GDPR Text
    const gdprText = document.createElement('label');
    gdprText.innerHTML = 'Elfogadom a GDPR-t';
    gdprWrapper.appendChild(gdprText);

    // GDPR Checkbox
    const gdprCheckboxContainer = document.createElement('div');
    gdprCheckboxContainer.style.position = 'relative';
    gdprCheckboxContainer.style.display = 'inline';

    const gdprCheckbox = document.createElement('div');
    gdprCheckbox.classList.add('checkbox');
    isGdprChecked ? gdprCheckbox.classList.add('active') : false;
    gdprCheckboxContainer.appendChild(gdprCheckbox);

    gdprWrapper.appendChild(gdprCheckboxContainer);
    gdprWrapper.addEventListener('click', () => {
        if (gdprCheckbox.classList.contains('active')) {
            gdprCheckbox.classList.remove('active');
            isGdprChecked = false;
        } else {
            gdprCheckbox.classList.add('active');
            isGdprChecked = true;
        }
    });

    // Username Error
    if (errorObject.gdprError) {
        errorObject.gdprErrorMessage.forEach(errorMessage => {
            gdprWrapper.appendChild(buildErrorMessageContainer(errorMessage));
        });
    };

    // Append GDPR Wrapper to Registration Form
    registrationForm.appendChild(gdprWrapper);

    // Submit Button
    const submitButton = document.createElement('input');
    submitButton.value = "Regisztráció";
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('btn', 'primary');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        validate({
            name: nameInput.value,
            email: emailInput.value,
            emailConfirm: emailConfirmInput.value,
            referal: dropDownSelectedValue.innerHTML,
            gdpr: isGdprChecked,
        });
    });

    // Append Submit Button to the Registration Container
    registrationForm.appendChild(submitButton);

    // Append Registration Form to it's Container
    container.appendChild(registrationForm);
};

// Successfull Registration Message Render
const successfullRegistration = (userData = {}) => {
    // Container RESET to Default
    container.innerHTML = '';

    // Message Container
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('registration-message');

    // Message Header
    const messageHeader = document.createElement('h1');
    messageHeader.innerHTML = 'Sikeres Regisztráció!';
    messageContainer.appendChild(messageHeader);

    // Message Sub Header
    const messageSubHeader = document.createElement('h2');
    messageSubHeader.innerHTML = userData.name;
    messageContainer.appendChild(messageSubHeader);

    // New User Registration Button
    const registerNewUser = document.createElement('div');
    registerNewUser.innerHTML = 'Új felhasználó regisztrálása';
    registerNewUser.classList.add('btn', 'primary');
    registerNewUser.addEventListener('click', buildRegistrationForm);
    messageContainer.appendChild(registerNewUser);

    // Append Message Container to it's Container
    container.appendChild(messageContainer);
};

buildRegistrationForm(defaultUserData(), defaultErrorObject());