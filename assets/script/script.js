const container = document.getElementById('registration-form-container');

const defaultErrorObject = () => ({
    nameError: false,
    nameErrorMessage: [],
    emailError: false,
    emailErrorMessage: [],
    emailConfirmError: false,
    emailConfirmErrorMessage: [],
});

const defaultUserData = () => ({
    name: '',
    email: '',
    emailConfirm: '',
    referal: '',
    gdpr: '',
});

const validate = (userData = {}) => {
    const errorObject = defaultErrorObject();

    if (userData?.name?.length === 0) {
        errorObject.nameError = true;
        errorObject.nameErrorMessage.push('Név nem lehet üres!');
    };

    if (userData?.email?.length === 0) {
        errorObject.emailError = true;
        errorObject.emailErrorMessage.push('Email nem lehet üres!');
    };

    if (userData?.emailConfirm?.length !== 0) {
        if (userData.email !== userData.emailConfirm) {
            errorObject.emailConfirmError = true;
            errorObject.emailConfirmErrorMessage.push('Nem egyezik az email cím!');
        }
    } else {
        errorObject.emailConfirmError = true;
        errorObject.emailConfirmErrorMessage.push('Erősítse meg email címét!');
    }

    registrationForm(userData, errorObject);
};

const registrationForm = (userData = defaultUserData(), errorObject = defaultErrorObject()) => {
    console.log([errorObject, userData]);
    container.innerHTML = '';
    const registrationForm = document.createElement('form');

    // Username Label and Input
    let wrapper = document.createElement('div');

    const nameLabel = document.createElement('label');
    nameLabel.innerHTML = "Név"
    nameLabel.setAttribute('for', 'user_name');
    wrapper.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.id = 'user_name';
    nameInput.setAttribute('title', 'Név');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', '');
    userData.name ? nameInput.value = userData.name : false;
    wrapper.appendChild(nameInput);

    if (errorObject.nameError) {
        errorObject.nameErrorMessage.forEach(errorMessage => {
            const errorMessageContainer = document.createElement('div');
            errorMessageContainer.classList.add('error');
            errorMessageContainer.innerHTML = errorMessage;
            wrapper.appendChild(errorMessageContainer);
        });
    };

    registrationForm.appendChild(wrapper);

    // Email Label and Input
    wrapper = document.createElement('div');

    const emailLabel = document.createElement('label');
    emailLabel.innerHTML = "Email"
    emailLabel.setAttribute('for', 'email');
    wrapper.appendChild(emailLabel);

    const emailInput = document.createElement('input');
    emailInput.id = 'email';
    emailInput.setAttribute('title', 'Email');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('placeholder', '');
    userData.email ? emailInput.value = userData.email : false;
    wrapper.appendChild(emailInput);

    if (errorObject.emailError) {
        errorObject.emailErrorMessage.forEach(errorMessage => {
            const errorMessageContainer = document.createElement('div');
            errorMessageContainer.classList.add('error');
            errorMessageContainer.innerHTML = errorMessage;
            wrapper.appendChild(errorMessageContainer);
        });
    };

    registrationForm.appendChild(wrapper);

    // Email Confirm Label and Input
    wrapper = document.createElement('div');

    const emailConfirmLabel = document.createElement('label');
    emailConfirmLabel.innerHTML = "Email megerősítés"
    emailConfirmLabel.setAttribute('for', 'email-confirm');
    wrapper.appendChild(emailConfirmLabel);

    const emailConfirmInput = document.createElement('input');
    emailConfirmInput.id = 'email-confrim';
    emailConfirmInput.setAttribute('title', 'Email megerősítés');
    emailConfirmInput.setAttribute('type', 'text');
    emailConfirmInput.setAttribute('placeholder', '');
    userData.emailConfirm ? emailConfirmInput.value = userData.emailConfirm : false;
    wrapper.appendChild(emailConfirmInput);

    if (errorObject.emailConfirmError) {
        errorObject.emailConfirmErrorMessage.forEach(errorMessage => {
            const errorMessageContainer = document.createElement('div');
            errorMessageContainer.classList.add('error');
            errorMessageContainer.innerHTML = errorMessage;
            wrapper.appendChild(errorMessageContainer);
        });
    };

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

    registrationForm.appendChild(submitButton);

    // Append Registration Form to it's Container
    container.appendChild(registrationForm);
};



registrationForm();