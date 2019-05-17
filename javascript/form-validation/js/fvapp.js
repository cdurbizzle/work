
const form = document.forms.valid;
form.elements.fname.placeholder = 'First Name';
form.elements.lname.placeholder = 'Last Name';
form.elements.email.placeholder = 'Email Address';

const fn = form.elements.fname;
const ln = form.elements.lname;
const em = form.elements.email;
const regxemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fsop = form.elements.options;
const op = form.elements.opt;
const sel = form.elements.select;

const valemail = 'please enter a valid email';
const ermes = (mes = 'required') => {
    const econt = document.createElement('p');
    econt.classList.add('error');
    econt.innerHTML = mes; 
    return econt.cloneNode(true);
}

const remError = () => {
    fn.onkeyup = () => {
        if (fn.classList.contains('has-error') && fn.value !== '') {
            fn.classList.remove('has-error');
            fn.nextSibling.remove();
        }
    };
    ln.onkeyup = () => {
        if (ln.classList.contains('has-error') && ln.value !== '') {
            ln.classList.remove('has-error');
            ln.nextSibling.remove();
        }
    };
    em.onkeyup = () => {
        const emv = regxemail.test(em.value);
        if (emv === false) {
            em.nextSibling.innerHTML = valemail;
        }
        else if (em.classList.contains('has-error') && em.value !== '' && emv === true) {
            em.classList.remove('has-error');
            em.nextSibling.remove();
        }
    };
    sel.onchange = () => {
        if (sel.classList.contains('has-error') && sel.value !== '') {
            sel.classList.remove('has-error');
            sel.nextSibling.remove();
        }
    };
    for (let i = 0; i < op.length; i++) {
        op[i].addEventListener('change', () => {
            if (op[i].checked) {
                fsop.classList.remove('has-error');
                fsop.nextSibling.remove();
            }
        });
    }
}

const validateF = () => {
    const addError = (el, mes) => {
        el.classList.add('has-error');
        el.after(ermes(mes));
    };
    const emv = regxemail.test(em.value);
    var chv = '';
    for (let i = 0; i < op.length; i++) {
        if (op[i].checked) {
            chv = op[i].value;
            break;
        }
    }
    remError();

    if (fn.value == '' && !fn.classList.contains('has-error')) {
        addError(fn);
    }
    if (ln.value == '' && !ln.classList.contains('has-error')) {
        addError(ln);
    }
    if ((em.value == '' && !em.classList.contains('has-error')) || (emv === false && !em.classList.contains('has-error'))) {
        if (em.value == '') {
            addError(em);
        }
        else {
            addError(em, valemail);
        }
    }
    if (chv == '' && !fsop.classList.contains('has-error')) {
        addError(fsop);
    }
    if (sel.value == '' && !sel.classList.contains('has-error')) {
        addError(sel);
    }
    for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].value == '') {
                return false;
            }
    }
    if (chv == '' || emv === false) {
        return false;
    }
}