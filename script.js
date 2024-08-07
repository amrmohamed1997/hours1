document.addEventListener('DOMContentLoaded', (event) => {
    createTable();
});

function createTable() {
    const tbody = document.querySelector('#work-hours-table tbody');
    for (let i = 1; i <= 31; i++) {
        const row = document.createElement('tr');

        const dayCell = document.createElement('td');
        dayCell.textContent = `اليوم ${i}`;
        row.appendChild(dayCell);

        const checkInCell = document.createElement('td');
        const checkInInput = document.createElement('input');
        checkInInput.type = 'time';
        checkInCell.appendChild(checkInInput);
        row.appendChild(checkInCell);

        const checkOutCell = document.createElement('td');
        const checkOutInput = document.createElement('input');
        checkOutInput.type = 'time';
        checkOutCell.appendChild(checkOutInput);
        row.appendChild(checkOutCell);

        const hoursCell = document.createElement('td');
        hoursCell.textContent = '0';
        row.appendChild(hoursCell);

        tbody.appendChild(row);

        checkInInput.addEventListener('change', () => calculateDailyHours(checkInInput, checkOutInput, hoursCell));
        checkOutInput.addEventListener('change', () => calculateDailyHours(checkInInput, checkOutInput, hoursCell));
    }
}

function calculateDailyHours(checkInInput, checkOutInput, hoursCell) {
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    if (checkIn && checkOut) {
        const [checkInHours, checkInMinutes] = checkIn.split(':').map(Number);
        const [checkOutHours, checkOutMinutes] = checkOut.split(':').map(Number);

        let hoursWorked = checkOutHours - checkInHours;
        let minutesWorked = checkOutMinutes - checkInMinutes;

        if (minutesWorked < 0) {
            minutesWorked += 60;
            hoursWorked--;
        }

        if (hoursWorked < 0) {
            hoursWorked += 24;
        }

        hoursCell.textContent = (hoursWorked + minutesWorked / 60).toFixed(2);
    } else {
        hoursCell.textContent = '0';
    }
}

function calculateTotalHours() {
    const hoursCells = document.querySelectorAll('#work-hours-table tbody tr td:last-child');
    let totalHours = 0;
    hoursCells.forEach(cell => {
        totalHours += parseFloat(cell.textContent);
    });
    alert(`مجموع الساعات الكلي للشهر هو: ${totalHours.toFixed(2)}`);
}

function resetTable() {
    const inputs = document.querySelectorAll('#work-hours-table input');
    inputs.forEach(input => input.value = '');
    const hoursCells = document.querySelectorAll('#work-hours-table td:last-child');
    hoursCells.forEach(cell => cell.textContent = '0');
}
