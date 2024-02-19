
const goToTicket = document.getElementById('click-ticket');
goToTicket.addEventListener('click', function (event) {
    const ticket = document.getElementById("ticket");
    event.preventDefault();
    const y = ticket.offsetTop;
    window.scrollTo({
        top: y,
        behavior: "smooth"
    });
});



const phoneNumber = document.getElementById('phone-number');

phoneNumber.addEventListener('keyup', validationPhoneNumber);

function validationPhoneNumber() {
    const regex = /^\d+$/;
    const number = phoneNumber.value;
    const invalid = document.getElementById("invalid-phone-number");

    if (number === "") {
        addAttrById('form-submit', 'disabled');
        return false;
    }

    if (!regex.test(number)) {
        invalid.innerText = "Please enter valid Number";
        invalid.classList.remove("hidden")
        phoneNumber.classList.add('invalid-input');
        addAttrById('form-submit', 'disabled');
        return false;
    } else {
        phoneNumber.classList.remove('invalid-input');
        invalid.innerText = "";
        invalid.classList.add("hidden")

        if (selectedSeats.length > 0) {
            removeAttrById('form-submit', 'disabled');
        }else{
            addAttrById('form-submit', 'disabled');
        }

        return true;

    }

}



let selectedSeats = [];
let couponApplied;
document.getElementById('seats-container').addEventListener('click', function (event) {
    const seatnumber = event.target.id;
    if (seatnumber !== 'seats-container' && seatnumber !== '') {
        if (selectedSeats.length === 4 && !selectedSeats.includes(seatnumber)) {
            alert("You can select 4 seats at a time");
        }
        if (selectedSeats.length < 4 && !selectedSeats.includes(seatnumber)) {
            selectSeat(seatnumber);
        }else if(selectedSeats.length <= 4 && selectedSeats.includes(seatnumber)) {
            if (!couponApplied) {
                removeSeat(seatnumber);
            }else{
                alert(" After applying coupon you can't change seats. Please reload this page");
            }
        }

        // Increase the number of Selected Seats
        let selectedSeatNumber = selectedSeats.length;
        setTextById('seats-selected', selectedSeatNumber)

        if (selectedSeatNumber === 1) {
            removeClassNameById('coupon-container', '!bg-[#f2f2f2]');
            removeAttrById('coupon', 'disabled');
            removeAttrById('apply-coupon', 'disabled');
        }
        else if (selectedSeatNumber === 2) {
            removeClassNameById('coupon-container', '!bg-[#f2f2f2]');
            removeAttrById('coupon', 'disabled');
            removeAttrById('apply-coupon', 'disabled');
        }
        else if (selectedSeatNumber === 3) {
            removeClassNameById('coupon-container', '!bg-[#f2f2f2]');
            removeAttrById('coupon', 'disabled');
            removeAttrById('apply-coupon', 'disabled');
        }
        else if (selectedSeatNumber === 4) {
            removeClassNameById('coupon-container', '!bg-[#f2f2f2]');
            removeAttrById('coupon', 'disabled');
            removeAttrById('apply-coupon', 'disabled');
        }
        else{
            addClassNameById('coupon-container', '!bg-[#f2f2f2]');
            addAttrById('coupon', 'disabled');
            addAttrById('apply-coupon', 'disabled');
        }

        
        totalPrice();

        const isPhone = validatePhoneNumber();
        if (selectedSeats.length > 0 && isPhone === true) {
            removeAttrById('form-submit', 'disabled');
        }else{
            addAttrById('form-submit', 'disabled');
        }

    }
});


function selectSeat(id) {
    const seat = document.getElementById(id);
    addClassNameById(id, 'btn-success');
    addClassNameById(id, 'selected');
    selectedSeats.push(id);

    let availableSeat = getTextById('available-seat');
    availableSeat = parseInt(availableSeat);
    availableSeat--;
    setTextById('available-seat', availableSeat);

    
    addSeatToList(id);
}

function addSeatToList(id){
    const seatListContainer = document.getElementById('selected-seats-container');
    const seatContainer = document.createElement('div');
    seatContainer.className = "flex justify-between";
    
    createAndAppendElement('p', id, seatContainer);
    
    createAndAppendElement('p', 'Economoy', seatContainer);
    
    createAndAppendElement('p', '550', seatContainer);
    
    seatListContainer.appendChild(seatContainer);
}

function createAndAppendElement(el, text, parentChild) {
    const elemet = document.createElement(el);
    elemet.innerText = text;
    parentChild.appendChild(elemet);
}

function removeSeat(id) {

    const seat = document.getElementById(id);
    seat.classList.remove('btn-success', 'selected');
    let seatIndex = selectedSeats.indexOf(id);
    if (seatIndex !== -1) {
        selectedSeats.splice(seatIndex, 1);
    }


    let availableSeat = getTextById('available-seat');
    availableSeat = parseInt(availableSeat);
    availableSeat++;
    setTextById('available-seat', availableSeat);


    
    removeSeatFromList(id);

}

function removeSeatFromList(id){
    const seatListContainer = document.getElementById('selected-seats-container');
    let childDivs = seatListContainer.getElementsByClassName('flex justify-between');
    for (let i = 0; i < childDivs.length; i++) {
        let currentDiv = childDivs[i];
        let p = currentDiv.querySelector('p');

        if (p && p.innerText.trim() === id) {
            seatListContainer.removeChild(currentDiv);
            break;
        }
    }
}


function totalPrice() {
    const seatSelectedNumber = selectedSeats.length;
    const price = 550 * seatSelectedNumber;
    setTextById('total-price', price)
    setTextById('grand-total-price', price)
    return price;
}


document.getElementById('apply-coupon').addEventListener('click', function() {
    const coupon = getValueById('coupon');

    if (coupon !== "" ) {
        if(coupon === "NEW15" || coupon === "Couple 20"){
            removeClassNameById('discount', 'hidden');
            document.getElementById('coupon-container').remove();
            if (coupon === "NEW15") {
                var discount = 15;
            }else if(coupon === "Couple 20"){
                var discount = 20;
            }
            const price = totalPrice();
            const discountPrice = price * (discount/100);
            setTextById('discount-price', discountPrice);
            couponApplied = true;
            
            grandPrice(price, discountPrice);
        }else{
            alert('Invalid!!Please input valid coupon');
        }
    }else{
        alert('Please input coupon');
    }
});

function grandPrice(totalPrice, discountPrice){
    const price = totalPrice - discountPrice;
    setTextById('grand-total-price', price)
    return price;
}



function getTextById(id) {
    let text = document.getElementById(id);
    text = text.innerText;

    return text
}

function setTextById(id, value) {
    let text = document.getElementById(id);
    text.innerText = value;
}

function getValueById(id) {
    let text = document.getElementById(id);
    text = text.value;
    return text
}

function removeClassNameById(id, className) {
    const el = document.getElementById(id);
    el.classList.remove(className);
}

function addClassNameById(id, className) {
    const el = document.getElementById(id);
    el.classList.add(className);
}

function removeAttrById(id, attr) {
    const el = document.getElementById(id);
    el.removeAttribute(attr);
}

function addAttrById(id, attr) {
    const el = document.getElementById(id);
    el.setAttribute(attr, true);
}



