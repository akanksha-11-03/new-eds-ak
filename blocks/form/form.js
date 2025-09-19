import createField from './form-fields.js';

async function createForm(formHref, submitHref) {
  const { pathname } = new URL(formHref);
  const resp = await fetch(pathname);
  const json = await resp.json();

  const form = document.createElement('form');
  form.dataset.action = submitHref;

  const fields = await Promise.all(
    json.data.map((fd) => createField(fd, form)),
  );
  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  // group fields into fieldsets
  const fieldsets = form.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    form
      .querySelectorAll(`[data-fieldset="${fieldset.name}"`)
      .forEach((field) => {
        fieldset.append(field);
      });
  });

  return form;
}

function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && field.type !== 'submit' && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) payload[field.name] = field.value;
      } else if (field.type === 'checkbox') {
        if (field.checked) {
          payload[field.name] = payload[field.name]
            ? `${payload[field.name]},${field.value}`
            : field.value;
        }
      } else {
        payload[field.name] = field.value;
      }
    }
  });
  return payload;
}

async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') === 'true') return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;

    // create payload
    const payload = generatePayload(form);
    const response = await fetch(form.dataset.action, {
      method: 'POST',
      body: JSON.stringify({ data: payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (form.dataset.confirmation) {
        window.location.href = form.dataset.confirmation;
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    form.setAttribute('data-submitting', 'false');
    submit.disabled = false;
  }
}

export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')].map((a) => a.href);
  const formLink = links.find(
    (link) => link.startsWith(window.location.origin) && link.endsWith('.json'),
  );
  const submitLink = links.find((link) => link !== formLink);
  // if (!formLink || !submitLink) return;

  const form = await createForm(formLink, '');
  block.replaceChildren(form);
  //  var amountdis = parseFloat(document.getElementById("amount"));
  //  amountdis.addEventListener("change", calculateSIP)

  amount.addEventListener('input', () => {
    calculateSIP();
  });
  years.addEventListener('change', () => {
    calculateSIP();
  });
  returnRate.addEventListener('change', () => {
    calculateSIP();
  });
  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   const valid = form.checkValidity();
  //   if (valid) {
  //     handleSubmit(form);
  //   } else {
  //     const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
  //     if (firstInvalidEl) {
  //       firstInvalidEl.focus();
  //       firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // });
}

function calculateSIP() {
  const amount = parseFloat(document.getElementById('amount').value);
  const years = parseInt(document.getElementById('years').value);
  const returnRate = parseFloat(document.getElementById('returnRate').value);

  if (!document.querySelector('.errormsg')) {
    const spandiv = document.createElement('span');
    document.querySelector('.monthlyamt').append(spandiv);
    spandiv.classList.add('errormsg');
    document.querySelector('.monthlyamt span').innerHTML = 'Amount must be between 500 and 500000.';
  }
  if (!document.getElementById('amount').value) return;
  if (amount < 500 || amount > 500000) {
    document.querySelector('.errormsg').style.display = 'block';
    return;
  }
  document.querySelector('.errormsg').style.display = 'none';

  // if (isNaN(amount) || isNaN(years) || isNaN(returnRate)) {
  //   document.getElementById("result").innerHTML = "Please enter valid values.";
  //   return;
  // }

  const months = years * 12;
  const monthlyRate = returnRate / 12 / 100;

  const futureValue = amount
    * ((((1 + monthlyRate) ** months - 1) / monthlyRate)
      * (1 + monthlyRate));
  const invested = amount * months;
  // var gainPercent = ((futureValue - invested) / invested) * 100;
  document.getElementById('resulatinvestamut').value = invested.toFixed();
  document.getElementById('displayestimateamt').value = futureValue.toFixed();
}
