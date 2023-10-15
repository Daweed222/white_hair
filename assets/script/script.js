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
});

// Function to return the Default User Data Object
const defaultUserData = () => ({
    name: '',
    email: '',
    emailConfirm: '',
    referal: '',
    gdpr: '',
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

    // Evaluate data
    buildRegistrationForm(userData, errorObject);
};

// Build Registration Form
const buildRegistrationForm = (userData = defaultUserData(), errorObject = defaultErrorObject()) => {
    console.log([errorObject, userData]);

    // Container RESET to Default
    container.innerHTML = '';

    // Registration Form
    const registrationForm = document.createElement('form');

    // Username Wrapper
    let wrapper = document.createElement('div');

    // Username Label
    const nameLabel = document.createElement('label');
    nameLabel.innerHTML = "Név"
    nameLabel.setAttribute('for', 'user_name');
    wrapper.appendChild(nameLabel);

    // Username Input
    const nameInput = document.createElement('input');
    nameInput.id = 'user_name';
    nameInput.setAttribute('title', 'Név');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', '');
    userData.name ? nameInput.value = userData.name : false;
    wrapper.appendChild(nameInput);

    // Username Error
    if (errorObject.nameError) {
        errorObject.nameErrorMessage.forEach(errorMessage => {
            const errorMessageContainer = document.createElement('div');
            errorMessageContainer.classList.add('error');
            errorMessageContainer.innerHTML = errorMessage;
            wrapper.appendChild(errorMessageContainer);
        });
    };

    // Append Username Wrapper to the Registration Form
    registrationForm.appendChild(wrapper);

    /* Email Wrapper */
    wrapper = document.createElement('div');

    // Email Label
    const emailLabel = document.createElement('label');
    emailLabel.innerHTML = "Email"
    emailLabel.setAttribute('for', 'email');
    wrapper.appendChild(emailLabel);

    // Email Input
    const emailInput = document.createElement('input');
    emailInput.id = 'email';
    emailInput.setAttribute('title', 'Email');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('placeholder', '');
    userData.email ? emailInput.value = userData.email : false;
    wrapper.appendChild(emailInput);

    // Email Error
    if (errorObject.emailError) {
        errorObject.emailErrorMessage.forEach(errorMessage => {
            const errorMessageContainer = document.createElement('div');
            errorMessageContainer.classList.add('error');
            errorMessageContainer.innerHTML = errorMessage;
            wrapper.appendChild(errorMessageContainer);
        });
    };

    // Append Email Wrapper to Registration Form
    registrationForm.appendChild(wrapper);

    /* Email Confirm Wrapper */
    wrapper = document.createElement('div');

    // Email Confirm Label
    const emailConfirmLabel = document.createElement('label');
    emailConfirmLabel.innerHTML = "Email megerősítés"
    emailConfirmLabel.setAttribute('for', 'email-confirm');
    wrapper.appendChild(emailConfirmLabel);

    // Email Confirm Input
    const emailConfirmInput = document.createElement('input');
    emailConfirmInput.id = 'email-confrim';
    emailConfirmInput.setAttribute('title', 'Email megerősítés');
    emailConfirmInput.setAttribute('type', 'text');
    emailConfirmInput.setAttribute('placeholder', '');
    userData.emailConfirm ? emailConfirmInput.value = userData.emailConfirm : false;
    wrapper.appendChild(emailConfirmInput);

    // Email Confirm Errors
    if (errorObject.emailConfirmError) {
        errorObject.emailConfirmErrorMessage.forEach(errorMessage => {
            const errorMessageContainer = document.createElement('div');
            errorMessageContainer.classList.add('error');
            errorMessageContainer.innerHTML = errorMessage;
            wrapper.appendChild(errorMessageContainer);
        });
    };

    // Append Email Confirm Wrapper to Registration Form
    registrationForm.appendChild(wrapper);

    // Submit Button
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            emailConfirm: emailConfirmInput.value,
        }

        validate(userData);
    });

    // Append Submit Button to the Registration Container
    registrationForm.appendChild(submitButton);

    // Append Registration Form to it's Container
    container.appendChild(registrationForm);
};

buildRegistrationForm();