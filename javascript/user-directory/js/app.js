
(() => { // initial user table build to the DOM
  var req = new XMLHttpRequest();
  req.open('GET', 'data/users.json', true);
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
        const cwrap = document.querySelector('#userList')
        const content = JSON.parse(req.responseText);
        var container = '<tbody>';
        var i = 0;
        for (let key in content) {
          i++;
          container += `<tr><td><input type="checkbox" name="${i}" value="${i}"></td>
                        <td><span data-last-name="${content[key].last_name}" class="last-name">${content[key].last_name}</span>,
                          <span data-first-name="${content[key].first_name}" class="first-name">${content[key].first_name}</span> 
                          <small><span data-email="${content[key].email_address}" class="email">${content[key].email_address}</span></small></td>
                        <td><span data-title="${content[key].title}" class="title">${content[key].title}</span></td></tr>`;
        }
        container += '</tbody>';
        cwrap.innerHTML += container;
    }
  }
  req.send();
})();

const addUser = () => {
  const fn = document.getElementById('fname');
  const ln = document.getElementById('lname');
  const email = document.getElementById('email');
  const title = document.getElementById('title');

  const plcontainer = document.getElementById('userList');

  const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emv = regx.test(email.value);

  const errcont = document.createElement('p');
  const errtxt = document.createTextNode('required');
  const valtxt = document.createTextNode('please enter a valid email address');
  errcont.classList.add('error');
  errcont.appendChild(errtxt);

  if (ln.value !== '' && fn.value !== '' && (email.value !== '' && emv === true)) {
      let nrow = plcontainer.insertRow(0);
      let rcell = nrow.insertCell(0);
      let ncellLeft = nrow.insertCell(1);
      let ncellRight = nrow.insertCell(2);

      rcell.innerHTML = '<td><input type="checkbox"/></td>';
      ncellLeft.innerHTML = '<span data-last-name="' + ln.value + '"  class="last-name"></span>' + ln.value 
      + ', <span data-first-name="' + fn.value + '" class="first-name">' + fn.value + '</span>' 
      + '<small><span data-email="' + email.value + '" class="email">' + email.value + '</span></small>';
      ncellRight.innerHTML = '<span data-title="' + title.value + '" class="title"></span>' + title.value + '</span>';

      ln.value = '';
      fn.value = '';
      email.value = '';
      title.value = '';
      return nrow;
  }
  else {
    if (fn.value === '') {
      if (fn.classList.contains('has-error')) {
        return null;
      }
      fn.classList.add('has-error');
      fn.after(errcont.cloneNode(true));
    }
    if (ln.value === '') {
      if (ln.classList.contains('has-error')) {
        return null;
      }
      ln.classList.add('has-error');
      ln.after(errcont.cloneNode(true));
    }
    if (email.value === '' || emv === false) {
      if (email.classList.contains('has-error')) {
        return null;
      }
      email.classList.add('has-error');
      if (email.value === '') {
        email.after(errcont.cloneNode(true));
      }
      else if (emv === false) {
        errcont.replaceChild(valtxt, errtxt);
        email.after(errcont.cloneNode(true));
      }
      
    }
    if (title.value === '') {
      if (title.classList.contains('has-error')) {
        return null;
      }
      title.classList.add('has-error');
      title.after(errcont.cloneNode(true));
    }
  }

  const remError = () => {
    fn.onblur = () => {
      if (fn.classList.contains('has-error') && fn.value !== '') {
        fn.classList.remove('has-error');
        fn.nextSibling.remove();
      }
    }
    ln.onblur = () => {
      if (ln.classList.contains('has-error') && ln.value !== '') {
        ln.classList.remove('has-error');
        ln.nextSibling.remove();
      }
    }
    email.onblur = () => {
      const emv = regx.test(email.value);
      if (emv === false) {
        email.nextSibling.replaceChild(valtxt, email.nextSibling.childNodes[0]);
      }
      if (email.classList.contains('has-error') && email.value !== '' && emv === true) {
        email.classList.remove('has-error');
        email.nextSibling.remove();
      }
    }
    title.onblur = () => {
      if (title.classList.contains('has-error') && title.value !== '') {
        title.classList.remove('has-error');
        title.nextSibling.remove();
      }
    }
  };
  return remError(regx, valtxt);
};
const auBtn = document.getElementById('addUserBtn');
auBtn.addEventListener('click', addUser);

const removeUser = () => {
  const chk = document.querySelectorAll('#userList input');

  for (let i = 0; i < chk.length; i++) {
    if (chk[i].type === "checkbox" && chk[i].checked === true) {
      chk[i].parentElement.parentElement.remove();
    }
  }
}
const remBtn = document.getElementById('remBtn');
remBtn.addEventListener('click', removeUser);

const sortUser = () => {
  const plcontainer = document.getElementById('userList');
  const sortProv = document.getElementById('sort');

  const datarow = document.querySelectorAll('tr');
  const nln = document.getElementsByClassName('last-name');
  const nfn = document.getElementsByClassName('first-name');
  const nemail = document.getElementsByClassName('email');
  const ntitle = document.getElementsByClassName('title');

  extp = [];
  for (let i = 0; i < datarow.length; i++) { // using data- attribute values to sort users
    extp.push({"first_name": nfn[i].dataset.firstName, "last_name": nln[i].dataset.lastName, 
    "email_address": nemail[i].dataset.email, "title": ntitle[i].dataset.title});
  }

  let srow = (epd, i) => {
    return `<td><input type="checkbox"/></td><td><span data-last-name="${epd[i].last_name}" class="last-name">${epd[i].last_name}</span>, 
            <span data-first-name="${epd[i].first_name}" class="first-name">${epd[i].first_name}</span>
            <small><span data-email="${epd[i].email_address}" class="email">${epd[i].email_address}</span></small></td><td>
            <span data-title="${epd[i].title}" class="title">${epd[i].title}</span></td></tr>`;
  }

  // sort by first name ascending
  if (sortProv.value === "fname") {
      const comp = (a, b) => {
        if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
          return -1;
        }
        if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
          return 1;
        }
        return 0;
      }

    const epd = extp.sort(comp);

    const extpItems = () => {
      let row = '<tr>';
      for (let i = 0; i < epd.length; i++) {
          row += srow(epd, i);
      };
      return row;
    }
    return plcontainer.innerHTML = extpItems();
  }
  // sort by first name decending
  if (sortProv.value === "fnamed") {
    const comp = (a,b) => {
      if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
        return 1;
      }
      if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
        return -1;
      }
      return 0;
    }

    const epd = extp.sort(comp);

    const extpItems = () => {
      let row = '<tr>';
      for (let i = 0; i < epd.length; i++) {
          row += srow(epd, i);
      };
      return row;
    }
    return plcontainer.innerHTML = extpItems();
  }
  // sort by last name ascending
  if (sortProv.value === "lname") {

    const comp = (a,b) => {
      if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) {
        return -1;
      }
      if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) {
        return 1;
      }
      return 0;
    }

    const epd = extp.sort(comp);

    const extpItems = () => {
      let row = '<tr>';
      for (let i = 0; i < epd.length; i++) {
          row += srow(epd, i);
      };
      return row;
    }
    return plcontainer.innerHTML = extpItems();
  }
  // sort by last name decending
  if (sortProv.value === "lnamed") {
    const comp = (a,b) => {
      if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) {
        return 1;
      }
      if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) {
        return -1;
      }
      return 0;
    }

    const epd = extp.sort(comp);

    const extpItems = () => {
      let row = '<tr>';
      for (let i = 0; i < epd.length; i++) {
          row += srow(epd, i);
      };
      return row;
    }
    return plcontainer.innerHTML = extpItems();
  }
  // sort by email ascending
  if (sortProv.value === "email") {
    const comp = (a,b) => {
      if (a.email_address.toLowerCase() < b.email_address.toLowerCase()) {
        return -1;
      }
      if (a.email_address.toLowerCase() > b.email_address.toLowerCase()) {
        return 1;
      }
      return 0;
    }

    const epd = extp.sort(comp);

    const extpItems = () => {
      let row = '<tr>';
      for (let i = 0; i < epd.length; i++) {
          row += srow(epd, i);
      };
      return row;
    }
    return plcontainer.innerHTML = extpItems();
  }
  // sort by email decending
  if (sortProv.value === "emaild") {
    const comp = (a,b) => {
      if (a.email_address.toLowerCase() < b.email_address.toLowerCase()) {
        return 1;
      }
      if (a.email_address.toLowerCase() > b.email_address.toLowerCase()) {
        return -1;
      }
      return 0;
    }

    const epd = extp.sort(comp);

    const extpItems = () => {
      let row = '<tr>';
      for (let i = 0; i < epd.length; i++) {
          row += srow(epd, i);
      };
      return row;
    }
    return plcontainer.innerHTML = extpItems();
  }
  // sort by title ascending
  if (sortProv.value === "title") {
    const comp = (a,b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    }

    const epd = extp.sort(comp);

    const extpItems = () => {
      let row = '<tr>';
      for (let i = 0; i < epd.length; i++) {
          row += srow(epd, i);
      };
      return row;
    }
    return plcontainer.innerHTML = extpItems();
  }
  // sort by title decending
  if (sortProv.value === "titled") {
    const comp = (a,b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }
      return 0;
    }

    const epd = extp.sort(comp);

    const extpItems = () => {
      let row = '<tr>';
      for (let i = 0; i < epd.length; i++) {
          row += srow(epd, i);
      };
      return row;
    }
    return plcontainer.innerHTML = extpItems();
  }
}
const sortSel = document.getElementById('sort');
sortSel.addEventListener('change', sortUser);
