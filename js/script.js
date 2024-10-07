let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

// get total
function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = ' ';
        total.style.background = '#a00d02';
    }
}

// create product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (mood === 'create') {
        if (newpro.count > 1) { // count
            for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro);
            }
        } else {
            datapro.push(newpro);
        }
    } else {
        datapro[tmp] = newpro;
        mood = 'create';
        submit.innerHTML = 'إنشاء';
        count.style.display = 'block';
    }
    localStorage.setItem('product', JSON.stringify(datapro));
    console.log(datapro);
    cleardata();
    showdata();
}

// clear inputs
function cleardata() {
    title.value = " ";
    price.value = " ";
    taxes.value = " ";
    ads.value = " ";
    discount.value = " ";
    total.innerHTML = " ";
    count.value = " ";
    category.value = " ";
}

// read
function showdata() {
    gettotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td data-label="ID">${i}</td>
            <td data-label="Title">${datapro[i].title}</td>
            <td data-label="Price">${datapro[i].price}</td>
            <td data-label="Taxes">${datapro[i].taxes}</td>
            <td data-label="Ads">${datapro[i].ads}</td>
            <td data-label="Discount">${datapro[i].discount}</td>
            <td data-label="Total">${datapro[i].total}</td>
            <td data-label="Category">${datapro[i].category}</td>
            <td><button onclick="updatadata(${i})" id="update">تحديث</button></td>
            <td><button onclick="deletedata(${i})" id="delete">حذف</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall');
    if (datapro.length > 0) {
        btndelete.innerHTML = `
        <button onclick="deleteall()">حذف الكل (${datapro.length})</button>`;
    } else {
        btndelete.innerHTML = '';
    }
}
showdata();

// delete
function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}

function deleteall() {
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

// update
function updatadata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'تحديث';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// search
function getsearchmood(id) {
    let search = document.getElementById('search');
    if (id === 'searchtitle') {
        search.placeholder = 'بحث بالعنوان';
    } else {
        search.placeholder = 'بحث بالفئة';
    }
    search.focus();
    search.value = '';
    showdata();
}

function searchdata(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i].title.includes(value.toLowerCase()) || datapro[i].category.includes(value.toLowerCase())) {
            table += `
            <tr>
                <td data-label="ID">${i}</td>
                <td data-label="Title">${datapro[i].title}</td>
                <td data-label="Price">${datapro[i].price}</td>
                <td data-label="Taxes">${datapro[i].taxes}</td>
                <td data-label="Ads">${datapro[i].ads}</td>
                <td data-label="Discount">${datapro[i].discount}</td>
                <td data-label="Total">${datapro[i].total}</td>
                <td data-label="Category">${datapro[i].category}</td>
                <td><button onclick="updatadata(${i})" id="update">تحديث</button></td>
                <td><button onclick="deletedata(${i})" id="delete">حذف</button></td>
            </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// Events
title.addEventListener('keyup', gettotal);
price.addEventListener('keyup', gettotal);
taxes.addEventListener('keyup', gettotal);
ads.addEventListener('keyup', gettotal);
discount.addEventListener('keyup', gettotal);
